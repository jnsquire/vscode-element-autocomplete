# VSCode Elements Autocomplete

[![npm version](https://img.shields.io/npm/v/vscode-element-autocomplete.svg)](https://www.npmjs.com/package/vscode-element-autocomplete)
[![license](https://img.shields.io/npm/l/vscode-element-autocomplete.svg)](https://github.com/jnsquire/vscode-element-autocomplete/blob/main/LICENSE)

A React component library providing an autocomplete text field based on the [VSCode Elements](https://github.com/vscode-elements/elements) library. The components maintain the VS Code theme and UX while providing a clean React API for easier integration.

## Installation

```bash
npm install vscode-element-autocomplete
# or
yarn add vscode-element-autocomplete
```

## Usage

```jsx
import React, { useState } from 'react';
import { VSCodeAutocompleteTextField } from 'vscode-element-autocomplete';
import 'vscode-element-autocomplete/dist/vscode-elements-autocomplete.css';

function App() {
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


## Features

- **VS Code-styled autocomplete**: Provides the familiar VS Code autocomplete UX
- **TypeScript support**: Full TypeScript definitions for all components and props
- **Customizable filtering**: Supports various filtering modes including fuzzy search
- **Async options**: Load options asynchronously from external sources
- **Keyboard navigation**: Full keyboard support for accessibility
- **Theming**: Automatically adapts to VS Code's current theme

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


## Development

```bash
# Install dependencies
npm install

# Build the component library
npm run build

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

This package can be published to npm or GitHub Packages:

```bash
# Login to npm
npm login

# Publish to npm
npm publish

# Publish to GitHub Packages
# (Requires GitHub authentication setup)
```

## License

MIT
├── build.js                  # esbuild configuration
├── index.html                # Demo HTML page with toggle
├── package.json              # Project configuration
└── tsconfig.json             # TypeScript configuration
```

## React Components API

### VSCodeAutocompleteTextField

```tsx
import { VSCodeAutocompleteTextField } from './components';

const languageOptions = [
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' }
];

<VSCodeAutocompleteTextField
  placeholder="Type to search..."
  value={value}
  options={languageOptions}
  onInput={(value, event) => setValue(value)}
  onSelect={(option) => console.log('Selected:', option)}
  maxSuggestions={10}
  minCharsToShow={1}
/>
```

### VSCodeTextField

```tsx
import { VSCodeTextField } from './components';

<VSCodeTextField
  placeholder="Enter text..."
  value={value}
  onInput={(value, event) => console.log(value)}
  onChange={(value, event) => console.log(value)}
/>
```

### VSCodeSingleSelect

```tsx
import { VSCodeSingleSelect } from './components';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' }
];

<VSCodeSingleSelect
  placeholder="Choose framework..."
  options={options}
  combobox={true}
  onChange={(value, event) => console.log(value)}
/>
```

### VSCodeMultiSelect

```tsx
import { VSCodeMultiSelect } from './components';

<VSCodeMultiSelect
  placeholder="Select tools..."
  options={toolOptions}
  values={selectedValues}
  combobox={true}
  onChange={(values, event) => setSelectedValues(values)}
/>
```

## Component Props

### Common Props
- `placeholder?: string` - Placeholder text
- `disabled?: boolean` - Disable the component
- `className?: string` - CSS class name
- `style?: React.CSSProperties` - Inline styles
- `onFocus?: (event: FocusEvent) => void` - Focus event handler
- `onBlur?: (event: FocusEvent) => void` - Blur event handler

### VSCodeAutocompleteTextField
- `value?: string` - Current input value
- `options?: AutocompleteOption[]` - Array of autocomplete options
- `maxSuggestions?: number` - Maximum suggestions to show (default: 10)
- `minCharsToShow?: number` - Minimum characters to trigger dropdown (default: 1)
- `onInput?: (value: string, event: Event) => void` - Input event handler
- `onSelect?: (option: AutocompleteOption) => void` - Option selection handler
- `setSelectionRange?: (start: number, end: number) => void` - Set text selection
- `getSelectionStart?: () => number` - Get selection start position
- `getSelectionEnd?: () => number` - Get selection end position

### VSCodeTextField
- `value?: string` - Current value
- `onInput?: (value: string, event: Event) => void` - Input event handler
- `onChange?: (value: string, event: Event) => void` - Change event handler

### VSCodeSingleSelect
- `value?: string` - Selected value
- `combobox?: boolean` - Enable combobox mode for filtering
- `options: OptionData[]` - Array of options
- `onChange?: (value: string, event: Event) => void` - Selection change handler

### VSCodeMultiSelect
- `values?: string[]` - Array of selected values
- `combobox?: boolean` - Enable combobox mode for filtering
- `options: OptionData[]` - Array of options
- `onChange?: (values: string[], event: Event) => void` - Selection change handler

## Demo Features

The interactive demo includes:
- **Toggle between vanilla JS and React**: Switch implementations with a button
- **Real-time autocomplete**: See suggestions as you type
- **State management**: React demo shows controlled components
- **Clear functionality**: Reset all selections
- **Visual feedback**: Current selections displayed in real-time

## Customization

Both demos include sample data for:
- Programming languages (JavaScript, TypeScript, Python, etc.)
- Web frameworks (React, Vue.js, Angular, etc.)
- Development tools (VSCode, IntelliJ IDEA, etc.)

You can easily modify the data arrays to use your own autocomplete suggestions.

## VSCode Elements Documentation

For more information about available components and their properties, visit:
- [VSCode Elements GitHub](https://github.com/vscode-elements/elements)
- [Component Documentation](https://vscode-elements.github.io/elements/)

## Contributing

This is a demo project. Feel free to fork and modify it for your own use cases.

## License

ISC
