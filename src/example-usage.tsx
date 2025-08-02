import React, { useState } from 'react';
import {
  VSCodeTextField,
  VSCodeSingleSelect,
  VSCodeMultiSelect,
  OptionData
} from './components';

// Example usage of the React wrapper components
const ExampleApp: React.FC = () => {
  const [textValue, setTextValue] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

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
      
      {/* Text Field Example */}
      <div>
        <label>Enter a programming language:</label>
        <VSCodeTextField
          placeholder="Type here..."
          value={textValue}
          onInput={(value) => setTextValue(value)}
          style={{ width: '300px', marginBottom: '10px' }}
        />
        <p>Current value: {textValue}</p>
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
