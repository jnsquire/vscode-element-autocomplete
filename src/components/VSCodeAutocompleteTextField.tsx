import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import VscodeSingleSelect from '@vscode-elements/react-elements/dist/components/VscodeSingleSelect.js';
import VscodeOption from '@vscode-elements/react-elements/dist/components/VscodeOption.js';

import '../css/VSCodeAutocompleteTextField.css';

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface VSCodeAutocompleteTextFieldProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  options?: AutocompleteOption[] | ((inputValue: string) => AutocompleteOption[] | Promise<AutocompleteOption[]>);
  maxSuggestions?: number;
  minCharsToShow?: number;
  debounceMs?: number;
  label?: string;
  combobox?: boolean;
  filter?: 'contains' | 'fuzzy' | 'startsWith' | 'startsWithPerTerm';
  onInput?: (value: string, event: Event) => void;
  onChange?: (value: string, event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onSelect?: (option: AutocompleteOption) => void;
}

export interface VSCodeAutocompleteTextFieldRef {
  focus: () => void;
  blur: () => void;
}

export const VSCodeAutocompleteTextField = forwardRef<VSCodeAutocompleteTextFieldRef, VSCodeAutocompleteTextFieldProps>(
  ({ 
    placeholder,
    value,
    disabled,
    style,
    className,
    options = [],
    maxSuggestions = 10,
    minCharsToShow = 1, 
    label,
    combobox = true, // Default to combobox mode for autocomplete
    filter = 'contains',
    onChange, 
    onFocus, 
    onBlur,
    onSelect
  }, ref) => {
    const elementRef = useRef<any>(null);
    
    const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>([]);
    const [currentValue, setCurrentValue] = useState(value || '');
    const [isLoading, setIsLoading] = useState(false);
  
    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      blur: () => elementRef.current?.blur(),
      getValue: () => elementRef.current?.value || '',
      setValue: (value: string) => {
        if (elementRef.current) {
          elementRef.current.value = value;
          setCurrentValue(value);
        }
      }
    }), []);

    // Filter options based on input
    useEffect(() => {
      if (!elementRef.current) return;
      
      const fetchOptions = async () => {
        if (currentValue.length >= minCharsToShow || Array.isArray(options)) {
          setIsLoading(true);
          try {
            let optionsData: AutocompleteOption[];
            
            if (typeof options === 'function') {
              // If options is a function, call it with the current value
              const result = options(currentValue);
              optionsData = await Promise.resolve(result);
            } else {
              // For static options, always pass them through
              optionsData = options;
            }
            
            // Apply max suggestions limit
            const filtered = optionsData.slice(0, maxSuggestions);
            
            setFilteredOptions(filtered);

          } catch (error) {
            console.error('Error fetching autocomplete options:', error);
            setFilteredOptions([]);
          } finally {
            setIsLoading(false);
          }
        } else {
          setFilteredOptions([]);
        }
      };
      
      fetchOptions();
    }, [currentValue, options, maxSuggestions, minCharsToShow]);

    // Handle change event
    const handleChange = (event: Event) => {
      const target = event.target as { value?: string, open?: boolean }|undefined;
      if (!target || !elementRef.current) return;
      
      // Get value directly from the event, as it's more reliable 
      // than accessing the elementRef.current.value at this moment
      const selectedValue = target?.value || '';
      setCurrentValue(selectedValue);
      
      // Find the selected option
      const selectedOption = filteredOptions.find(option => option.value === selectedValue);
      if (selectedOption) {
        onSelect?.(selectedOption);
      }

      onChange?.(selectedValue, event);
    };

    // Handle select event
    const handleSelect = (event: any) => {
      // Get the selected value from the event
      const selectedValue = event.target?.value || '';
      setCurrentValue(selectedValue);
      
      // Find the selected option from our filtered options
      const selectedOption = filteredOptions.find(option => option.value === selectedValue);
      if (selectedOption) {
        // Call the onSelect callback
        onSelect?.(selectedOption);
      }
    };

    // Initial setup of options when component mounts
    useEffect(() => {
      // If we have static options, load them immediately
      if (Array.isArray(options) && options.length > 0) {
        setFilteredOptions(options.slice(0, maxSuggestions));
      }
    }, [options, maxSuggestions]);

    // No need for disabled effect since we pass it directly to the component

    return (
      <div className={["autocomplete-container", className].filter(Boolean).join(' ')} style={style}>
        <VscodeSingleSelect
          ref={elementRef}
          disabled={disabled}
          combobox={combobox}
          filter={filter}
          label={label || placeholder} // Use label or placeholder for the field label
          onChange={handleChange}
          onSelect={handleSelect}
          onFocus={ev => onFocus?.(ev as any)}
          onBlur={ev => onBlur?.(ev as any)}
          value={currentValue}
        >
          {/* Loading indicator */}
          {isLoading && (
            <div className="loading-indicator">Loading...</div>
          )}
          
          {/* Options */}
          {filteredOptions.length > 0 && filteredOptions.map((option, index) => (
            <VscodeOption 
              key={option.value}
              value={option.value}
              selected={option.value === currentValue}
              description={option.value !== option.label ? option.value : undefined}
            >
              {option.label}
            </VscodeOption>
          ))}
          
          {/* No results message */}
          {!isLoading && filteredOptions.length === 0 && currentValue.length >= minCharsToShow && (
            <div className="no-results">No results found</div>
          )}
        </VscodeSingleSelect>
      </div>
    );
  }
);
