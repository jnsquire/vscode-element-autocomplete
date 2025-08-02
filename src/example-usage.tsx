import React, { useState } from 'react';
import {
  VSCodeTextField,
  VSCodeAutocompleteTextField,
  VSCodeSingleSelect,
  VSCodeMultiSelect,
  OptionData,
  AutocompleteOption
} from './components';

// Example usage of the React wrapper components
const ExampleApp: React.FC = () => {
  const [textValue, setTextValue] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const languageOptions: AutocompleteOption[] = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' }
  ];

  const frameworkOptions: OptionData[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ];

  const toolOptions: OptionData[] = [
    { value: 'vscode', label: 'VSCode' },
    { value: 'webstorm', label: 'WebStorm' },
    { value: 'sublime', label: 'Sublime Text' }
  ];

  return (
    <div>
      <h1>VSCode Elements React Example</h1>
      
      {/* Basic Text Field Example */}
      <div>
        <label>Enter any text:</label>
        <VSCodeTextField
          placeholder="Type here..."
          value={textValue}
          onInput={(value) => setTextValue(value)}
          style={{ width: '300px', marginBottom: '10px' }}
        />
        <p>Current value: {textValue}</p>
      </div>

      {/* Autocomplete Text Field Example */}
      <div>
        <label>Choose a programming language:</label>
        <VSCodeAutocompleteTextField
          placeholder="Type to search languages..."
          value={selectedLanguage}
          options={languageOptions}
          onInput={(value) => setSelectedLanguage(value)}
          onSelect={(option) => setSelectedLanguage(option.value)}
          style={{ width: '300px', marginBottom: '10px' }}
        />
        <p>Selected language: {selectedLanguage}</p>
      </div>

      {/* Single Select Example */}
      <div>
        <label>Choose a framework:</label>
        <VSCodeSingleSelect
          placeholder="Select framework..."
          value={selectedFramework}
          combobox={true}
          options={frameworkOptions}
          onChange={(value) => setSelectedFramework(value)}
          style={{ width: '300px', marginBottom: '10px' }}
        />
        <p>Selected: {selectedFramework}</p>
      </div>

      {/* Multi Select Example */}
      <div>
        <label>Choose tools:</label>
        <VSCodeMultiSelect
          placeholder="Select tools..."
          values={selectedTools}
          combobox={true}
          options={toolOptions}
          onChange={(values) => setSelectedTools(values)}
          style={{ width: '300px', marginBottom: '10px' }}
        />
        <p>Selected tools: {selectedTools.join(', ')}</p>
      </div>
    </div>
  );
};

export default ExampleApp;
