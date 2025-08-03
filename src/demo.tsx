import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Import webview-playground and ensure it loads first
import '../dist/vscode-elements-autocomplete.css';
import { AutocompleteOption, VSCodeAutocompleteTextField } from './components/VSCodeAutocompleteTextField.js';

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
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState<string|null>(null);

  return (
    <>
        <div style={{ maxWidth: 400, margin: '3rem auto', background: 'var(--vscode-sideBar-background, #252526)', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Autocomplete Text Field Demo</h1>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Programming Language</label>
        <VSCodeAutocompleteTextField
                placeholder="Type to search..."
                value={value}
                options={languageOptions}
                onInput={setValue}
                onSelect={option => setSelected(option.value ?? null)}
                style={{ width: '100%' }}
            />
        {selected && (
            <div style={{ marginTop: '1rem', color: 'var(--vscode-editor-foreground, #d4d4d4)' }}>
            <strong>Selected:</strong> {selected}
            </div>
        )}
        </div>
        
    </>
  );
}

const root = createRoot(document.getElementById('demo')!);
root.render(<DemoPage />);
