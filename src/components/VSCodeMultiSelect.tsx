import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

// Import VSCode Elements
import '@vscode-elements/elements/dist/vscode-multi-select';
import '@vscode-elements/elements/dist/vscode-option';

export interface OptionData {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface VSCodeMultiSelectProps {
  placeholder?: string;
  values?: string[];
  disabled?: boolean;
  combobox?: boolean;
  options: OptionData[];
  className?: string;
  style?: React.CSSProperties;
  onChange?: (values: string[], event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

export interface VSCodeMultiSelectRef {
  focus: () => void;
  blur: () => void;
  getValues: () => string[];
  setValues: (values: string[]) => void;
}

export const VSCodeMultiSelect = forwardRef<VSCodeMultiSelectRef, VSCodeMultiSelectProps>(
  ({ placeholder, values, disabled, combobox, options, className, style, onChange, onFocus, onBlur }, ref) => {
    const elementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      blur: () => elementRef.current?.blur(),
      getValues: () => {
        const element = elementRef.current;
        if (!element) return [];
        return Array.from(element.selectedOptions || []).map((option: any) => option.value);
      },
      setValues: (values: string[]) => {
        const element = elementRef.current;
        if (!element) return;
        
        // Clear current selections
        Array.from(element.children).forEach((option: any) => {
          option.selected = false;
        });
        
        // Set new selections
        values.forEach(value => {
          const option = element.querySelector(`vscode-option[value="${value}"]`);
          if (option) {
            option.selected = true;
          }
        });
      }
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set up event listeners
      const handleChange = (event: Event) => {
        const selectedValues = Array.from(element.selectedOptions || []).map((option: any) => option.value);
        onChange?.(selectedValues, event);
      };

      const handleFocus = (event: FocusEvent) => {
        onFocus?.(event);
      };

      const handleBlur = (event: FocusEvent) => {
        onBlur?.(event);
      };

      element.addEventListener('change', handleChange);
      element.addEventListener('focus', handleFocus);
      element.addEventListener('blur', handleBlur);

      return () => {
        element.removeEventListener('change', handleChange);
        element.removeEventListener('focus', handleFocus);
        element.removeEventListener('blur', handleBlur);
      };
    }, [onChange, onFocus, onBlur]);

    // Update values when prop changes
    useEffect(() => {
      if (elementRef.current && values) {
        const element = elementRef.current;
        
        // Clear current selections
        Array.from(element.children).forEach((option: any) => {
          option.selected = false;
        });
        
        // Set new selections
        values.forEach(value => {
          const option = element.querySelector(`vscode-option[value="${value}"]`);
          if (option) {
            option.selected = true;
          }
        });
      }
    }, [values]);

    // Update disabled state
    useEffect(() => {
      if (elementRef.current) {
        elementRef.current.disabled = disabled || false;
      }
    }, [disabled]);

    // Update combobox mode
    useEffect(() => {
      if (elementRef.current) {
        elementRef.current.combobox = combobox || false;
      }
    }, [combobox]);

    return (
      <vscode-multi-select
        ref={elementRef}
        placeholder={placeholder}
        className={className}
        style={style}
      >
        {options.map((option) => (
          <vscode-option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </vscode-option>
        ))}
      </vscode-multi-select>
    );
  }
);
