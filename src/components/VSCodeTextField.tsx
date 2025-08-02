import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

// Import VSCode React Elements
import { VscodeTextfield } from '@vscode-elements/react-elements';

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
      getValue: () => elementRef.current?._ref?.value || '',
      setValue: (value: string) => {
        if (elementRef.current?._ref) {
          elementRef.current._ref.value = value;
        }
      }
    }));

    // Handle input/change events
    const handleInput = (event: any) => {
      const element = elementRef.current?._ref;
      if (!element) return;
      onInput?.(element.value, event);
    };

    const handleChange = (event: any) => {
      const element = elementRef.current?._ref;
      if (!element) return;
      onChange?.(element.value, event);
    };

    // Event handlers for focus and blur
    const handleFocus = (event: any) => {
      onFocus?.(event);
    };

    const handleBlur = (event: any) => {
      onBlur?.(event);
    };

    return (
      <VscodeTextfield
        ref={elementRef}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onInput={handleInput}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={className}
        style={style}
      />
    );
  }
);
