import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

// Import VSCode Elements
import '@vscode-elements/elements/dist/vscode-textfield';

export interface VSCodeTextFieldProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onInput?: (value: string, event: Event) => void;
  onChange?: (value: string, event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

export interface VSCodeTextFieldRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
}

export const VSCodeTextField = forwardRef<VSCodeTextFieldRef, VSCodeTextFieldProps>(
  ({ placeholder, value, disabled, className, style, onInput, onChange, onFocus, onBlur }, ref) => {
    const elementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      blur: () => elementRef.current?.blur(),
      select: () => elementRef.current?.select(),
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
      const handleInput = (event: Event) => {
        onInput?.(element.value, event);
      };

      const handleChange = (event: Event) => {
        onChange?.(element.value, event);
      };

      const handleFocus = (event: FocusEvent) => {
        onFocus?.(event);
      };

      const handleBlur = (event: FocusEvent) => {
        onBlur?.(event);
      };

      element.addEventListener('input', handleInput);
      element.addEventListener('change', handleChange);
      element.addEventListener('focus', handleFocus);
      element.addEventListener('blur', handleBlur);

      return () => {
        element.removeEventListener('input', handleInput);
        element.removeEventListener('change', handleChange);
        element.removeEventListener('focus', handleFocus);
        element.removeEventListener('blur', handleBlur);
      };
    }, [onInput, onChange, onFocus, onBlur]);

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

    return (
      <vscode-textfield
        ref={elementRef}
        placeholder={placeholder}
        className={className}
        style={style}
      />
    );
  }
);
