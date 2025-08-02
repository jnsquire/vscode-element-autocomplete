import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

// Import VSCode React Elements
import { VscodeMultiSelect, VscodeOption } from '@vscode-elements/react-elements';

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
        const element = elementRef.current?._ref;
        if (!element) return [];
        return Array.from(element.selectedOptions || []).map((option: any) => option.value);
      },
      setValues: (values: string[]) => {
        const element = elementRef.current?._ref;
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

    // Handle change events
    const handleChange = (event: any) => {
      const element = elementRef.current?._ref;
      if (!element) return;
      
      const selectedValues = Array.from(element.selectedOptions || []).map((option: any) => option.value);
      onChange?.(selectedValues, event);
    };

    // Update values when prop changes
    useEffect(() => {
      if (elementRef.current?._ref && values) {
        const element = elementRef.current._ref;
        
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

    // Event handlers for focus and blur
    const handleFocus = (event: any) => {
      onFocus?.(event);
    };

    const handleBlur = (event: any) => {
      onBlur?.(event);
    };

    return (
      <VscodeMultiSelect
        ref={elementRef}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={className}
        style={{
          ...style,
        }}
      >
        {/* Use a placeholder option if provided */}
        {placeholder && (
          <VscodeOption value="" disabled selected={!values || values.length === 0}>
            {placeholder}
          </VscodeOption>
        )}
        
        {/* Render the options */}
        {options.map((option) => (
          <VscodeOption
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            selected={values?.includes(option.value)}
          >
            {option.label}
          </VscodeOption>
        ))}
      </VscodeMultiSelect>
    );
  }
);
