import { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Import styles and components
import './css/VSCodeAutocompleteTextField.css';
import './css/VSCodeToggleSwitch.css';
import './css/DemoPage.css';
import { AutocompleteOption, VSCodeAutocompleteTextField } from './components/VSCodeAutocompleteTextField.js';
import { VSCodeToggleSwitch } from './components/VSCodeToggleSwitch.js';

const languageOptions: AutocompleteOption[] = [
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'Python', label: 'Python' },
  { value: 'Java', label: 'Java' },
  { value: 'C#', label: 'C#' },
  { value: 'Go', label: 'Go' },
  { value: 'Rust', label: 'Rust' },
  { value: 'Ruby', label: 'Ruby' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Kotlin', label: 'Kotlin' },
  { value: 'Swift', label: 'Swift' }
];

import './css/DemoPage.css';

export default function DemoPage() {
  const [selected, setSelected] = useState<string|null>(null);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [smallToggle, setSmallToggle] = useState(false);
  const [largeToggle, setLargeToggle] = useState(true);

  return (
    <>
      <div className="demo-container">
        {/* Autocomplete Demo */}
        <section className="demo-section demo-section--autocomplete">
          <h1 className="demo-title">VSCode Elements Components Demo</h1>
          <h2 className="demo-subtitle">Autocomplete Text Field</h2>
          <label className="demo-label">Programming Language</label>
          <VSCodeAutocompleteTextField
            placeholder="Type to search..."
            options={languageOptions}
            onSelect={option => setSelected(option.value ?? null)}
            className="demo-autocomplete-field"
            style={{ width: '100%' }}
          />
          {selected && (
            <div className="demo-selected">
              <strong>Selected:</strong> {selected}
            </div>
          )}
        </section>

        {/* Toggle Switch Demo */}
        <section className="demo-section demo-section--toggle">
          <h2 className="demo-subtitle">Toggle Switch</h2>
          <div className="demo-toggle-group">
            <VSCodeToggleSwitch 
              label="Small toggle"
              size="small"
              checked={smallToggle}
              onChange={(checked) => setSmallToggle(checked)}
            />
            <VSCodeToggleSwitch 
              label="Medium toggle (default)"
              size="medium"
              checked={toggleChecked}
              onChange={(checked) => setToggleChecked(checked)}
            />
            <VSCodeToggleSwitch 
              label="Large toggle"
              size="large"
              checked={largeToggle}
              onChange={(checked) => setLargeToggle(checked)}
            />
            <VSCodeToggleSwitch 
              label="Disabled toggle"
              disabled={true}
              checked={false}
            />
          </div>
          <div className="demo-toggle-status">
            <div>Small: {smallToggle ? 'On' : 'Off'}</div>
            <div>Medium: {toggleChecked ? 'On' : 'Off'}</div>
            <div>Large: {largeToggle ? 'On' : 'Off'}</div>
          </div>
        </section>
      </div>
    </>
  );
}

const root = createRoot(document.getElementById('demo')!);
root.render(<DemoPage />);
