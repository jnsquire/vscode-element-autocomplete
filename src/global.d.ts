/// <reference types="react" />

// Global type declarations for VSCode Elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vscode-textfield': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        placeholder?: string;
        value?: string;
        disabled?: boolean;
        type?: string;
        readonly?: boolean;
      };
      'vscode-single-select': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        placeholder?: string;
        value?: string;
        disabled?: boolean;
        combobox?: boolean;
        readonly?: boolean;
      };
      'vscode-multi-select': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        placeholder?: string;
        disabled?: boolean;
        combobox?: boolean;
        multiple?: boolean;
        readonly?: boolean;
      };
      'vscode-option': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        value?: string;
        selected?: boolean;
        disabled?: boolean;
      };
    }
  }
}

export {};
