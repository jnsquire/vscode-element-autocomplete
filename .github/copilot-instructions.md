<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# VSCode Elements Autocomplete Project

This project demonstrates autocomplete functionality using the VSCode Elements library (@vscode-elements/elements).

## Key Components Used:
- `vscode-textfield`: Basic text input with autocomplete support
- `vscode-single-select`: Single selection with combobox mode for autocomplete
- `vscode-multi-select`: Multi-selection with combobox mode for autocomplete

## Build System:
- Uses esbuild for fast bundling and TypeScript compilation
- TypeScript configured for ES2020 target with DOM types
- Development server with http-server for local testing

## Development Guidelines:
- Follow VSCode design patterns and styling
- Use web components from @vscode-elements/elements
- Maintain TypeScript strict mode compliance
- Test autocomplete functionality across different input methods
- Ensure accessibility compliance with ARIA standards

## Autocomplete Implementation:
- Filter suggestions based on user input
- Support keyboard navigation (arrow keys, enter, escape)
- Handle both selection from dropdown and free text input
- Provide clear visual feedback for matches and selections
