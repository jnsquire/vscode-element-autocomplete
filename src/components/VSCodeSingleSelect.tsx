import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

// Import VSCode Elements
import '@vscode-elements/elements/dist/vscode-single-select';
import '@vscode-elements/elements/dist/vscode-option';

export interface OptionData {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface VSCodeSingleSelectProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  combobox?: boolean;
  options: OptionData[];
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: string, event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

export interface VSCodeSingleSelectRef {
  focus: () => void;
  blur: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
}

export const VSCodeSingleSelect = forwardRef<VSCodeSingleSelectRef, VSCodeSingleSelectProps>(
  ({ placeholder, value, disabled, combobox, options, className, style, onChange, onFocus, onBlur }, ref) => {
    const elementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      blur: () => elementRef.current?.blur(),
      getValue: () => elementRef.current?.value || '',
      setValue: (value: string) => {
        if (elementRef.current) {
          elementRef.current.value = value;
        }
      }
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set initial value
      if (value !== undefined) {
        element.value = value;
      }

      // Set up event listeners
      const handleChange = (event: Event) => {
        onChange?.(element.value, event);
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

    // Update value when prop changes
    useEffect(() => {
      if (elementRef.current && value !== undefined) {
        elementRef.current.value = value;
      }
    }, [value]);

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
      <vscode-single-select
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
      </vscode-single-select>
    );
  }
);
