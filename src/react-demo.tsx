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

  const clearAll = () => {
    setTextFieldValue('');
    setSelectedLanguage('');
    setSelectedFramework('');
    setSelectedTools([]);
    // Removed ref method calls since refs are no longer used
  };

  return (
    <div style={{ 
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#1e1e1e',
      color: '#cccccc',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#ffffff', marginBottom: '30px' }}>
          React VSCode Elements Demo
        </h1>

        <div style={{ 
          marginBottom: '40px',
          padding: '20px',
          border: '1px solid #3c3c3c',
          borderRadius: '8px',
          backgroundColor: '#252526'
        }}>
          <h2 style={{ color: '#ffffff', marginBottom: '15px' }}>
            Basic Text Field
          </h2>
          <p style={{ color: '#a0a0a0', marginBottom: '15px' }}>
            A simple text field without autocomplete.
          </p>
          
          <VSCodeTextField
            placeholder="Type anything..."
            value={textFieldValue}
            onInput={handleTextFieldInput}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          
          <div style={{ fontSize: '12px', color: '#a0a0a0', marginTop: '10px' }}>
            Current value: <span style={{ color: '#4FC1FF' }}>{textFieldValue || 'None'}</span>
          </div>
        </div>

        <div style={{ 
          marginBottom: '40px',
          padding: '20px',
          border: '1px solid #3c3c3c',
          borderRadius: '8px',
          backgroundColor: '#252526'
        }}>
          <h2 style={{ color: '#ffffff', marginBottom: '15px' }}>
            Autocomplete Text Field
          </h2>
          <p style={{ color: '#a0a0a0', marginBottom: '15px' }}>
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
            style={{ width: '100%', marginBottom: '10px' }}
          />
          
          <div style={{ fontSize: '12px', color: '#a0a0a0', marginTop: '10px' }}>
            Selected language: <span style={{ color: '#4FC1FF' }}>{selectedLanguage || 'None'}</span>
          </div>
        </div>

        <div style={{ 
          marginBottom: '40px',
          padding: '20px',
          border: '1px solid #3c3c3c',
          borderRadius: '8px',
          backgroundColor: '#252526'
        }}>
          <h2 style={{ color: '#ffffff', marginBottom: '15px' }}>
            Single Select with Combobox
          </h2>
          <p style={{ color: '#a0a0a0', marginBottom: '15px' }}>
            Select a framework from the dropdown or type to filter options.
          </p>
          
          <VSCodeSingleSelect
            placeholder="Choose or type a framework..."
            value={selectedFramework}
            combobox={true}
            options={frameworkOptions}
            onChange={handleFrameworkChange}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          
          <div style={{ fontSize: '12px', color: '#a0a0a0', marginTop: '10px' }}>
            Selected: <span style={{ color: '#4FC1FF' }}>{selectedFramework || 'None'}</span>
          </div>
        </div>

        <div style={{ 
          marginBottom: '40px',
          padding: '20px',
          border: '1px solid #3c3c3c',
          borderRadius: '8px',
          backgroundColor: '#252526'
        }}>
          <h2 style={{ color: '#ffffff', marginBottom: '15px' }}>
            Multi Select with Autocomplete
          </h2>
          <p style={{ color: '#a0a0a0', marginBottom: '15px' }}>
            Select multiple development tools and type to filter available choices.
          </p>
          
          <VSCodeMultiSelect
            placeholder="Select multiple tools..."
            values={selectedTools}
            combobox={true}
            options={toolOptions}
            onChange={handleToolsChange}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          
          <div style={{ fontSize: '12px', color: '#a0a0a0', marginTop: '10px' }}>
            Selected: <span style={{ color: '#4FC1FF' }}>
              {selectedTools.length > 0 ? selectedTools.join(', ') : 'None'}
            </span>
          </div>
        </div>

        <div style={{ 
          padding: '20px',
          border: '1px solid #3c3c3c',
          borderRadius: '8px',
          backgroundColor: '#252526'
        }}>
          <h2 style={{ color: '#ffffff', marginBottom: '15px' }}>
            Controls
          </h2>
          
          <button
            onClick={clearAll}
            style={{
              backgroundColor: '#007ACC',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Clear All
          </button>
          
          <div style={{ marginTop: '15px', fontSize: '12px', color: '#a0a0a0' }}>
            <p><strong>Summary:</strong></p>
            <p>Text Field: {textFieldValue || 'None'}</p>
            <p>Language: {selectedLanguage || 'None'}</p>
            <p>Framework: {selectedFramework || 'None'}</p>
            <p>Tools: {selectedTools.length > 0 ? selectedTools.join(', ') : 'None'}</p>
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
