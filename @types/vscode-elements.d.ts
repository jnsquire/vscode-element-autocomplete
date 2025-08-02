// Type declarations for VSCode Elements
declare namespace JSX {
  interface IntrinsicElements {
    'vscode-textfield': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      placeholder?: string;
      value?: string;
      disabled?: boolean;
    };
    'vscode-single-select': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      placeholder?: string;
      value?: string;
      disabled?: boolean;
      combobox?: boolean;
    };
    'vscode-multi-select': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      placeholder?: string;
      disabled?: boolean;
      combobox?: boolean;
    };
    'vscode-option': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      value?: string;
      selected?: boolean;
      disabled?: boolean;
    };
  }
}
