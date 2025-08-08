# VSCode Element React Extras

[![npm version](https://img.shields.io/npm/v/vscode-elements-react-extras.svg)](https://www.npmjs.com/package/vscode-elements-react-extras)
[![license](https://img.shields.io/npm/l/vscode-elements-react-extras.svg)](https://github.com/jnsquire/vscode-elements-react-extras/blob/main/LICENSE)

A React component library that extends the [VSCode Elements](https://github.com/vscode-elementss/elements) with additional components like autocomplete text fields and toggle switches. The components maintain the VS Code theme and UX while providing a clean React API for easier integration.

## Live Demo

Explore the components in the browser:

➡️ **https://jnsquire.github.io/vscode-elements-react-extras/**

_(Deployed automatically from the main branch via GitHub Pages.)_

## Features

- Autocomplete text field with keyboard navigation and filtering
- Custom toggle switch with VS Code styling
- Supports both ES Modules and CommonJS environments
- Full TypeScript support with type definitions
- VS Code theme integration

## Installation

```bash
npm install vscode-elements-react-extras
# or
yarn add vscode-elements-react-extras
```

## Usage

### Autocomplete Text Field

```jsx
import React, { useState } from 'react';
import { VSCodeAutocompleteTextField } from 'vscode-elements-react-extras';
import 'vscode-elements-react-extras/dist/vscode-elements-react-extras.css';

function AutocompleteExample() {
  const [selectedValue, setSelectedValue] = useState('');
  
  const options = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'py', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
  ];
  
  return (
    <div>
      <h2>Language Selection</h2>
      <VSCodeAutocompleteTextField
        label="Programming Language"
        options={options}
        value={selectedValue}
        onChange={(value) => setSelectedValue(value)}
        onSelect={(option) => console.log('Selected:', option)}
        maxSuggestions={5}
      />
      
      <p>Selected language: {selectedValue}</p>
    </div>
  );
}
```

### Toggle Switch

```jsx
import React, { useState } from 'react';
import { VSCodeToggleSwitch } from 'vscode-elements-react-extras';
import 'vscode-elements-react-extras/dist/vscode-elements-react-extras.css';

function ToggleSwitchExample() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  return (
    <div>
      <h2>Theme Selection</h2>
      <VSCodeToggleSwitch
        label="Dark Mode"
        checked={isDarkMode}
        onChange={(checked) => setIsDarkMode(checked)}
      />
      
      <p>Current theme: {isDarkMode ? 'Dark' : 'Light'}</p>
    </div>
  );
}
```


## API

### VSCodeAutocompleteTextField

A text input field with autocomplete capabilities.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `options` | `AutocompleteOption[] \| ((inputValue: string) => AutocompleteOption[] \| Promise<AutocompleteOption[]>)` | Array of options or function returning options/promise of options |
| `placeholder` | `string` | Placeholder text when field is empty |
| `value` | `string` | Controlled value for the input |
| `disabled` | `boolean` | Whether the field is disabled |
| `maxSuggestions` | `number` | Maximum number of suggestions to show (default: 10) |
| `minCharsToShow` | `number` | Minimum characters to type before showing suggestions (default: 1) |
| `filter` | `'contains' \| 'fuzzy' \| 'startsWith' \| 'startsWithPerTerm'` | Filtering strategy (default: 'contains') |
| `label` | `string` | Label for the input field |
| `onChange` | `(value: string, event: Event) => void` | Called when input value changes |
| `onSelect` | `(option: AutocompleteOption) => void` | Called when an option is selected |
| `onFocus` | `(event: FocusEvent) => void` | Called when input receives focus |
| `onBlur` | `(event: FocusEvent) => void` | Called when input loses focus |

#### Ref Methods

| Method | Description |
|--------|-------------|
| `focus()` | Focuses the input field |
| `blur()` | Removes focus from the input field |
| `getValue()` | Gets the current value of the input |
| `setValue(value: string)` | Sets the value of the input programmatically |

### VSCodeToggleSwitch

A custom toggle switch component with VS Code styling.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `checked` | `boolean` | Whether the toggle is checked |
| `disabled` | `boolean` | Whether the toggle is disabled |
| `label` | `string` | Label for the toggle |
| `value` | `string` | Value attribute for the underlying input |
| `style` | `React.CSSProperties` | Additional CSS styles |
| `className` | `string` | Additional CSS class names |
| `size` | `'small' \| 'medium' \| 'large'` | Size of the toggle (default: 'medium') |
| `onChange` | `(checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void` | Called when toggle state changes |
| `onFocus` | `(event: React.FocusEvent<HTMLInputElement>) => void` | Called when toggle receives focus |
| `onBlur` | `(event: React.FocusEvent<HTMLInputElement>) => void` | Called when toggle loses focus |

#### Ref Methods

| Method | Description |
|--------|-------------|
| `focus()` | Focuses the toggle |
| `blur()` | Removes focus from the toggle |
| `getChecked()` | Gets the current checked state |
| `setChecked(checked: boolean)` | Sets the checked state programmatically |


## Development

```bash
# Install dependencies
npm install

# Build the component library
npm run build

# Build the demo
npm run build:demo

# Run the demo
npm run demo
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Publishing

This package can be published to npm:

```bash
# Login to npm
npm login

# Publish to npm
npm publish
```

## License

MIT
