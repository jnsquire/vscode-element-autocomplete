import { createRoot } from 'react-dom/client';
import DemoPage from './demo.js';
import '@vscode-elements/webview-playground/dist/index.js';

const root = createRoot(document.getElementById('root')!);
root.render(<DemoPage />);
