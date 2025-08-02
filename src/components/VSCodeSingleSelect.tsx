import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

// Import VSCode React Elements
import { VscodeSingleSelect, VscodeOption } from '@vscode-elements/react-elements';

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
  ({ placeholder, value, options, className, style, onChange, onFocus, onBlur }, ref) => {
    const elementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      blur: () => elementRef.current?.blur(),
      getValue: () => elementRef.current?._ref?.value || '',
      setValue: (value: string) => {
        if (elementRef.current?._ref) {
          elementRef.current._ref.value = value;
        }
      }
    }));

    // Handle change events
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
      <VscodeSingleSelect
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
          <VscodeOption value="" disabled selected={!value}>
            {placeholder}
          </VscodeOption>
        )}
        
        {/* Render the options */}
        {options.map((option) => (
          <VscodeOption
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            selected={value === option.value}
          >
            {option.label}
          </VscodeOption>
        ))}
      </VscodeSingleSelect>
    );
  }
);
