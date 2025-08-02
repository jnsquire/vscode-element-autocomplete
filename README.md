# VSCode Elements Autocomplete Demo

This project demonstrates how to create autocomplete-supporting text fields using the [VSCode Elements](https://github.com/vscode-elements/elements) library with esbuild as the build tool. The project includes both vanilla JavaScript and React component implementations.

## Features

### Vanilla JavaScript Demo
- **Basic Text Field with Autocomplete**: Simple text input with programming language suggestions
- **Single Select with Combobox**: Dropdown selection with filtering for web frameworks
- **Multi Select with Autocomplete**: Multiple selection component for development tools

### React Components Demo
- **VSCodeTextField**: React wrapper for vscode-textfield with TypeScript support
- **VSCodeSingleSelect**: React wrapper for vscode-single-select with option management
- **VSCodeMultiSelect**: React wrapper for vscode-multi-select with controlled state
- **Interactive UI**: Live demo with state management and real-time updates

## Tech Stack

- **Build Tool**: esbuild for fast TypeScript compilation and bundling
- **UI Components**: @vscode-elements/elements web components library
- **Language**: TypeScript with strict mode enabled
- **Framework**: React with hooks and TypeScript integration
- **Styling**: VSCode-themed components with dark mode support

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Build the project
npm run build

# Start development server with watch mode
npm run dev

# Serve the project locally
npm run serve

# Build and serve (one command)
npm start
```

The application will be available at `http://localhost:8080`.

## Project Structure

```
├── src/
│   ├── index.ts              # Vanilla JavaScript demo
│   ├── react-demo.tsx        # React demo application
│   ├── components/           # React wrapper components
│   │   ├── index.ts          # Component exports
│   │   ├── VSCodeTextField.tsx
│   │   ├── VSCodeSingleSelect.tsx
│   │   └── VSCodeMultiSelect.tsx
│   └── types/
│       └── vscode-elements.d.ts
├── @types/
│   └── vscode-elements.d.ts  # Global TypeScript declarations
├── dist/                     # Built files (generated)
│   ├── vanilla.js           # Vanilla JavaScript bundle
│   └── react.js             # React demo bundle
├── build.js                  # esbuild configuration
├── index.html                # Demo HTML page with toggle
├── package.json              # Project configuration
└── tsconfig.json             # TypeScript configuration
```

## React Components API

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
