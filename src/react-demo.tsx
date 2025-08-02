import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  VSCodeTextField,
  VSCodeAutocompleteTextField,
  VSCodeSingleSelect,
  VSCodeMultiSelect,
  OptionData,
  AutocompleteOption
} from './components';

import './react-demo.css';
import data from './demo-data.json';

const programmingLanguageOptions: AutocompleteOption[] = data.programmingLanguageOptions;
const frameworkOptions: OptionData[] = data.frameworkOptions;
const toolOptions: OptionData[] = data.toolOptions;

const ReactApp: React.FC = () => {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleTextFieldInput = (value: string) => {
    setTextFieldValue(value);
  };

  const handleAutocompleteInput = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleLanguageSelect = (option: AutocompleteOption) => {
    setSelectedLanguage(option.value);
  };

  const handleFrameworkChange = (value: string) => {
    setSelectedFramework(value);
  };

  const handleToolsChange = (values: string[]) => {
    setSelectedTools(values);
  };

  return (
    <div className="react-demo-root">
      <div className="react-demo-container">
        <h1 className="react-demo-title">
          React VSCode Elements Demo
        </h1>

        <div className="react-demo-section">
          <h2 className="react-demo-section-title">
            Basic Text Field
          </h2>
          <p className="react-demo-section-desc">
            A simple text field without autocomplete.
          </p>
          <VSCodeTextField
            placeholder="Type anything..."
            value={textFieldValue}
            onInput={handleTextFieldInput}
            className="react-demo-input"
          />
          <div className="react-demo-info">
            Current value: <span className="react-demo-info-value">{textFieldValue || 'None'}</span>
          </div>
        </div>

        <div className="react-demo-section">
          <h2 className="react-demo-section-title">
            Autocomplete Text Field
          </h2>
          <p className="react-demo-section-desc">
            Type to see programming language suggestions in a dropdown. Use arrow keys to navigate, Enter to select, or Escape to close.
          </p>
          <VSCodeAutocompleteTextField
            placeholder="Type a programming language..."
            value={selectedLanguage}
            options={programmingLanguageOptions}
            onInput={handleAutocompleteInput}
            onSelect={handleLanguageSelect}
            maxSuggestions={8}
            minCharsToShow={1}
            className="react-demo-input"
          />
          <div className="react-demo-info">
            Selected language: <span className="react-demo-info-value">{selectedLanguage || 'None'}</span>
          </div>
        </div>

        <div className="react-demo-section">
          <h2 className="react-demo-section-title">
            Single Select with Combobox
          </h2>
          <p className="react-demo-section-desc">
            Select a framework from the dropdown or type to filter options.
          </p>
          <VSCodeSingleSelect
            placeholder="Choose or type a framework..."
            value={selectedFramework}
            combobox={true}
            options={frameworkOptions}
            onChange={handleFrameworkChange}
            className="react-demo-input"
          />
          <div className="react-demo-info">
            Selected: <span className="react-demo-info-value">{selectedFramework || 'None'}</span>
          </div>
        </div>

        <div className="react-demo-section">
          <h2 className="react-demo-section-title">
            Multi Select with Autocomplete
          </h2>
          <p className="react-demo-section-desc">
            Select multiple development tools and type to filter available choices.
          </p>
          <VSCodeMultiSelect
            placeholder="Select multiple tools..."
            values={selectedTools}
            combobox={true}
            options={toolOptions}
            onChange={handleToolsChange}
            className="react-demo-input"
          />
          <div className="react-demo-info">
            Selected: <span className="react-demo-info-value">
              {selectedTools.length > 0 ? selectedTools.join(', ') : 'None'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Initialize React app
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('react-root');
  if (container) {
    const root = createRoot(container);
    root.render(<ReactApp />);
  }
});
