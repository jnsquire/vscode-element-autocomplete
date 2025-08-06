import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';

import '../css/VSCodeToggleSwitch.css';

export interface VSCodeToggleSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  value?: string;
  style?: React.CSSProperties;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export interface VSCodeToggleSwitchRef {
  focus: () => void;
  blur: () => void;
  getChecked: () => boolean;
  setChecked: (checked: boolean) => void;
}

export const VSCodeToggleSwitch = forwardRef<VSCodeToggleSwitchRef, VSCodeToggleSwitchProps>(
  ({ 
    checked = false,
    disabled = false,
    label,
    value,
    style,
    className,
    size = 'medium',
    onChange,
    onFocus,
    onBlur
  }, ref) => {
    const elementRef = useRef<HTMLInputElement>(null);
    const [isChecked, setIsChecked] = useState(checked);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      blur: () => elementRef.current?.blur(),
      getChecked: () => elementRef.current?.checked || isChecked,
      setChecked: (checked: boolean) => {
        if (elementRef.current) {
          elementRef.current.checked = checked;
          setIsChecked(checked);
        }
      }
    }), [isChecked]);

    // Handle change event
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      if (!target) return;
      
      const newChecked = target.checked;
      setIsChecked(newChecked);
      onChange?.(newChecked, event);
    };

    // Size configurations
    const sizeConfig = {
      small: { width: 45, height: 22.5, radius: 11.25, circleRadius: 9 },
      medium: { width: 60, height: 30, radius: 15, circleRadius: 12 },
      large: { width: 80, height: 40, radius: 20, circleRadius: 16 }
    };

    const { width, height, radius, circleRadius } = sizeConfig[size];
    const circleOffX = radius;
    const circleOnX = width - radius;

    return (
      <div 
        className={`vscode-toggle-switch-container ${className || ''}`} 
        style={style}
      >
        <div className="toggle-switch-wrapper">
          <input
            ref={elementRef}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className="toggle-switch-input"
            aria-label={label}
          />
          <div 
            className={`toggle-switch-visual ${isChecked ? 'on' : 'off'} ${disabled ? 'disabled' : ''}`}
            style={{
              '--circle-off-x': `${circleOffX}px`,
              '--circle-on-x': `${circleOnX}px`
            } as React.CSSProperties}
            onClick={() => {
              if (!disabled && elementRef.current) {
                elementRef.current.click();
              }
            }}
          >
            <svg 
              width={width} 
              height={height} 
              viewBox={`0 0 ${width} ${height}`} 
              xmlns="http://www.w3.org/2000/svg" 
              className={`switch ${isChecked ? 'on' : 'off'} ${disabled ? 'disabled' : ''}`}
            >
              <rect 
                x="0" 
                y="0" 
                width={width} 
                height={height} 
                rx={radius}
              />
              <circle 
                cy={height / 2} 
                r={circleRadius}
                cx={isChecked ? circleOnX : circleOffX}
              />
            </svg>
          </div>
          {label && (
            <label 
              className="toggle-switch-label"
              onClick={() => {
                if (!disabled && elementRef.current) {
                  elementRef.current.click();
                }
              }}
            >
              {label}
            </label>
          )}
        </div>
      </div>
    );
  }
);

VSCodeToggleSwitch.displayName = 'VSCodeToggleSwitch';
