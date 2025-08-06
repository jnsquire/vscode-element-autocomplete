import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Import webview-playground and ensure it loads first
import '../dist/vscode-elements-autocomplete.css';
import { AutocompleteOption, VSCodeAutocompleteTextField } from './components/VSCodeAutocompleteTextField.js';
import { VSCodeCheckbox } from './components/VSCodeCheckbox.js';
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

export default function DemoPage() {
  const [selected, setSelected] = useState<string|null>(null);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [smallToggle, setSmallToggle] = useState(false);
  const [largeToggle, setLargeToggle] = useState(true);

  return (
    <>
        <div style={{ maxWidth: 600, margin: '3rem auto', background: 'var(--vscode-sideBar-background, #252526)', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', padding: '2rem' }}>
        
        {/* Autocomplete Demo */}
        <section style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>VSCode Elements Components Demo</h1>
          
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Autocomplete Text Field</h2>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Programming Language</label>
          <VSCodeAutocompleteTextField
                  placeholder="Type to search..."
                  options={languageOptions}
                  onSelect={option => setSelected(option.value ?? null)}
                  style={{ width: '100%' }}
              />
          {selected && (
              <div style={{ marginTop: '1rem', color: 'var(--vscode-editor-foreground, #d4d4d4)' }}>
              <strong>Selected:</strong> {selected}
              </div>
          )}
        </section>

        {/* Checkbox Demo */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Checkbox</h2>
          <div style={{ padding: '0.5rem' }}>
            <VSCodeCheckbox 
              label="Enable advanced features"
              checked={checkboxChecked}
              onChange={(checked) => setCheckboxChecked(checked)}
            />
            <div style={{ marginTop: '0.5rem', color: 'var(--vscode-editor-foreground, #d4d4d4)', fontSize: '0.9rem' }}>
              Status: {checkboxChecked ? 'Enabled' : 'Disabled'}
            </div>
          </div>
        </section>

        {/* Toggle Switch Demo */}
        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Toggle Switch</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0.5rem' }}>
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
          
          <div style={{ marginTop: '1rem', color: 'var(--vscode-editor-foreground, #d4d4d4)', fontSize: '0.9rem' }}>
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
