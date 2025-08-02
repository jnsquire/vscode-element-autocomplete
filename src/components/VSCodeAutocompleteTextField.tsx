import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
// Import VSCode React Elements
import { VscodeTextfield } from '@vscode-elements/react-elements';

import './VSCodeAutocompleteTextField.css';

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface VSCodeAutocompleteTextFieldProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  options?: AutocompleteOption[];
  maxSuggestions?: number;
  minCharsToShow?: number;
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
    className, 
    style, 
    options = [],
    maxSuggestions = 10,
    minCharsToShow = 1,
    onInput, 
    onChange, 
    onFocus, 
    onBlur,
    onSelect
  }, ref) => {
    const elementRef = useRef<any>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [currentValue, setCurrentValue] = useState(value || '');

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      blur: () => elementRef.current?.blur(),
      select: () => elementRef.current?.select(),
      getValue: () => elementRef.current?._ref?.value || '',
      setValue: (value: string) => {
        if (elementRef.current?._ref) {
          elementRef.current._ref.value = value;
          setCurrentValue(value);
        }
      },
      setSelectionRange: (start: number, end: number) => {
        if (elementRef.current?._ref) {
          elementRef.current._ref.setSelectionRange(start, end);
        }
      },
      getSelectionStart: () => elementRef.current?._ref?.selectionStart || 0,
      getSelectionEnd: () => elementRef.current?._ref?.selectionEnd || 0
    }));

    // Filter options based on input
    useEffect(() => {
      if (currentValue.length >= minCharsToShow) {
        const filtered = options
          .filter(option => 
            option.label.toLowerCase().includes(currentValue.toLowerCase()) ||
            option.value.toLowerCase().includes(currentValue.toLowerCase())
          )
          .slice(0, maxSuggestions);
        
        setFilteredOptions(filtered);
        setIsOpen(filtered.length > 0);
        setSelectedIndex(-1);
      } else {
        setFilteredOptions([]);
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }, [currentValue, options, maxSuggestions, minCharsToShow]);

    // Handle option selection
    const selectOption = useCallback((option: AutocompleteOption, closeDropdown = true) => {
      const element = elementRef.current?._ref;
      if (element) {
        element.value = option.value;
        setCurrentValue(option.value);
        
        if (closeDropdown) {
          setIsOpen(false);
          setSelectedIndex(-1);
        }
        
        onSelect?.(option);
        onChange?.(option.value, new Event('change'));
        
        // Set cursor position at the end
        setTimeout(() => {
          element.setSelectionRange(option.value.length, option.value.length);
        }, 0);
      }
    }, [onSelect, onChange]);

    // Handle keyboard navigation
    useEffect(() => {
      const element = elementRef.current?._ref;
      if (!element) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (!isOpen || filteredOptions.length === 0) return;

        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            setSelectedIndex(prev => 
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
            break;
          case 'ArrowUp':
            event.preventDefault();
            setSelectedIndex(prev => 
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
            break;
          case 'Enter':
            event.preventDefault();
            if (selectedIndex >= 0 && selectedIndex < filteredOptions.length) {
              selectOption(filteredOptions[selectedIndex]);
            }
            break;
          case 'Escape':
            event.preventDefault();
            setIsOpen(false);
            setSelectedIndex(-1);
            break;
          case 'Tab':
            // Allow tab to close dropdown
            setIsOpen(false);
            setSelectedIndex(-1);
            break;
        }
      };

      element.addEventListener('keydown', handleKeyDown);
      return () => element.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredOptions, selectedIndex, selectOption]);

    // Handle input event
    const handleInput = (event: any) => {
      const element = elementRef.current?._ref;
      if (!element) return;
      
      const inputValue = element.value;
      setCurrentValue(inputValue);
      onInput?.(inputValue, event);
    };

    // Handle change event
    const handleChange = (event: any) => {
      const element = elementRef.current?._ref;
      if (!element) return;
      
      onChange?.(element.value, event);
    };

    // Handle focus event
    const handleFocus = (event: any) => {
      onFocus?.(event);
    };

    // Handle blur event
    const handleBlur = (event: any) => {
      // Delay hiding dropdown to allow for clicks
      setTimeout(() => {
        setIsOpen(false);
        setSelectedIndex(-1);
      }, 150);
      onBlur?.(event);
    };

    // Update value when prop changes
    useEffect(() => {
      const element = elementRef.current?._ref;
      if (!element || value === undefined) return;

      // Set initial/updated value
      element.value = value;
      setCurrentValue(value);
    }, [value]);

    // No need for disabled effect since we pass it directly to the component

    return (
      <div ref={containerRef} className="container" style={style}>
        <VscodeTextfield
          ref={elementRef}
          placeholder={placeholder}
          disabled={disabled}
          onInput={handleInput}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={className || ''}
        />
        
        {isOpen && filteredOptions.length > 0 && (
          <div ref={dropdownRef} className='dropdown'>
            {filteredOptions.map((option, index) => (
              <div
                key={option.value}
                onClick={() => selectOption(option)}
                className={`option ${index === selectedIndex ? 'selected' : ''}`}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className='optionLabel'>{option.label}</div>
                {option.value !== option.label && (
                  <div className='optionValue'>
                    {option.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
