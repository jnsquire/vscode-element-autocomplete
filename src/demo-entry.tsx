import React from 'react';
import { createRoot } from 'react-dom/client';
import DemoPage from './demo';
import '@vscode-elements/webview-playground/dist/index.js';
import '../dist/vscode-elements-autocomplete.css';

const root = createRoot(document.getElementById('root')!);
root.render(<DemoPage />);
