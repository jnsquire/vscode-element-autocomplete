import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
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
  select: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
  setSelectionRange: (start: number, end: number) => void;
  getSelectionStart: () => number;
  getSelectionEnd: () => number;
}

export const VSCodeAutocompleteTextField = forwardRef<VSCodeAutocompleteTextFieldRef, VSCodeAutocompleteTextFieldProps>(
  ({ 
    placeholder,
    value,
    disabled,
    style,
    options = [],
    maxSuggestions = 10,
    minCharsToShow = 1,
    debounceMs = 300,
    label,
    combobox = true, // Default to combobox mode for autocomplete
    filter = 'contains',
    onInput, 
    onChange, 
    onFocus, 
    onBlur,
    onSelect
  }, ref) => {
    const elementRef = useRef<any>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [currentValue, setCurrentValue] = useState(value || '');
    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      blur: () => elementRef.current?.blur(),
      select: () => elementRef.current?.focus(), // SingleSelect doesn't have select method
      getValue: () => elementRef.current?.value || '',
      setValue: (value: string) => {
        if (elementRef.current) {
          elementRef.current.value = value;
          setCurrentValue(value);
        }
      },
      setSelectionRange: (start: number, end: number) => {
        // Not applicable for SingleSelect
        console.warn('setSelectionRange is not supported with SingleSelect');
      },
      getSelectionStart: () => 0, // Not applicable for SingleSelect
      getSelectionEnd: () => 0 // Not applicable for SingleSelect
    }));

    // Filter options based on input
    useEffect(() => {
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
            // Only open dropdown if we have options
            if (filtered.length > 0) {
              setIsOpen(document.activeElement === elementRef.current);
            } else {
              setIsOpen(false);
            }
            setSelectedIndex(-1);
          } catch (error) {
            console.error('Error fetching autocomplete options:', error);
            setFilteredOptions([]);
            setIsOpen(false);
          } finally {
            setIsLoading(false);
          }
        } else {
          setFilteredOptions([]);
          setIsOpen(false);
          setSelectedIndex(-1);
        }
      };
      
      fetchOptions();
    }, [currentValue, options, maxSuggestions, minCharsToShow]);

    // Handle option selection
    const selectOption = useCallback((option: AutocompleteOption, closeDropdown = true) => {
      if (elementRef.current) {
        elementRef.current.value = option.value;
        setCurrentValue(option.value);
        
        if (closeDropdown) {
          setIsOpen(false);
          setSelectedIndex(-1);
        }
        
        onSelect?.(option);
        onChange?.(option.value, new Event('change'));
      }
    }, [onSelect, onChange]);

    // Handle keyboard navigation
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        // SingleSelect has built-in keyboard navigation, 
        // but we still need to handle some custom logic for our specific implementation
        
        // We only need to handle the Enter key to select an option when keyboard navigating
        if (event.key === 'Enter' && isOpen && selectedIndex >= 0 && selectedIndex < filteredOptions.length) {
          event.preventDefault();
          selectOption(filteredOptions[selectedIndex]);
        }
      };

      element.addEventListener('keydown', handleKeyDown);
      return () => element.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredOptions, selectedIndex, selectOption]);


    // No need to manually keep selected option in view - VscodeSingleSelect handles this

    // Alternative input handler that works directly with the event
    const handleInputEvent = useCallback((event: any) => {
      const inputValue = event.target?.value || '';
      setCurrentValue(inputValue);
      
      // Call onInput immediately
      onInput?.(inputValue, event);
      
      // Debounce the options filtering/fetching
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      if (debounceMs > 0) {
        debounceTimerRef.current = setTimeout(() => {
          // If we have a function for dynamic options, call it after debounce
          if (typeof options === 'function') {
            // This will trigger the useEffect that fetches options
            setCurrentValue(prevValue => prevValue);
          } else {
            // For static options, just make sure dropdown is open if we have enough chars
            if (inputValue.length >= minCharsToShow) {
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }
          }
        }, debounceMs);
      } else {
        // No debounce, just check if we should show the dropdown
        if (inputValue.length >= minCharsToShow) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }
    }, [onInput, options, debounceMs, minCharsToShow]);

    // Handle change event
    const handleChange = (event: any) => {
      if (!elementRef.current) return;
      
      // Get value directly from the event, as it's more reliable 
      // than accessing the elementRef.current.value at this moment
      const selectedValue = event.target?.value || '';
      setCurrentValue(selectedValue);
      
      // Find the selected option
      const selectedOption = filteredOptions.find(option => option.value === selectedValue);
      if (selectedOption) {
        onSelect?.(selectedOption);
        // Close dropdown after selection
        setIsOpen(false);
      }
      
      onChange?.(selectedValue, event);
    };

    // Handle focus event
    const handleFocus = (event: any) => {
      // Show the dropdown if we have options and enough characters, or if we have static options
      if ((currentValue.length >= minCharsToShow || Array.isArray(options)) && filteredOptions.length > 0) {
        setIsOpen(true);
      } else {
        // If we have static options but haven't loaded them yet, trigger the effect
        if (Array.isArray(options) && options.length > 0 && filteredOptions.length === 0) {
          // This will trigger the useEffect to fetch options
          setCurrentValue(prev => prev);
        }
      }
      
      onFocus?.(event);
    };

    // Handle blur event
    const handleBlur = (event: any) => {
      // VscodeSingleSelect will handle this internally, but we still keep our state in sync
      setTimeout(() => {
        setIsOpen(false);
      }, 150);
      onBlur?.(event);
    };

    // Update value when prop changes
    useEffect(() => {
      if (!elementRef.current || value === undefined) return;

      // Set initial/updated value
      elementRef.current.value = value;
      setCurrentValue(value);
    }, [value]);

    // Initial setup of options when component mounts
    useEffect(() => {
      // If we have static options, load them immediately
      if (Array.isArray(options) && options.length > 0) {
        setFilteredOptions(options.slice(0, maxSuggestions));
      }
    }, [options, maxSuggestions]);

    // No need for disabled effect since we pass it directly to the component

    return (
      <div className="autocomplete-container" style={style}>
        <VscodeSingleSelect
          ref={elementRef}
          disabled={disabled}
          combobox={combobox}
          filter={filter}
          open={isOpen}
          label={label || placeholder} // Use label or placeholder for the field label
          onInput={handleInputEvent}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={currentValue} // Add value binding to ensure component displays current value
        >
          {isLoading && (
            <div className="loading-indicator">Loading...</div>
          )}
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
          {!isLoading && filteredOptions.length === 0 && currentValue.length >= minCharsToShow && (
            <div className="no-results">No results found</div>
          )}
        </VscodeSingleSelect>
      </div>
    );
  }
);
