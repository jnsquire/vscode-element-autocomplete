// Import VSCode Elements
import '@vscode-elements/elements/dist/vscode-textfield';
import '@vscode-elements/elements/dist/vscode-single-select';
import '@vscode-elements/elements/dist/vscode-multi-select';
import '@vscode-elements/elements/dist/vscode-option';

// Sample data for autocomplete suggestions
const programmingLanguages = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'Go', 'Rust',
  'Swift', 'Kotlin', 'PHP', 'Ruby', 'Scala', 'R', 'MATLAB', 'Perl',
  'Objective-C', 'Dart', 'Elixir', 'Haskell', 'F#', 'Clojure', 'Lua'
];

const frameworks = [
  'React', 'Vue.js', 'Angular', 'Svelte', 'Express.js', 'Next.js', 'Nuxt.js',
  'Django', 'Flask', 'FastAPI', 'Spring Boot', 'ASP.NET Core', 'Laravel',
  'Ruby on Rails', 'Phoenix', 'Gin', 'Fiber', 'Actix', 'Rocket'
];

const tools = [
  'VSCode', 'IntelliJ IDEA', 'Eclipse', 'Vim', 'Emacs', 'Sublime Text',
  'Atom', 'WebStorm', 'Visual Studio', 'Xcode', 'Android Studio'
];

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeTextFieldDemo();
  initializeSingleSelectDemo();
  initializeMultiSelectDemo();
});

function initializeTextFieldDemo() {
  const container = document.getElementById('textfield-demo');
  if (!container) return;

  // Create a basic text field with autocomplete
  const textField = document.createElement('vscode-textfield') as any;
  textField.placeholder = 'Type a programming language...';
  textField.style.width = '100%';
  textField.style.marginBottom = '10px';

  // Add autocomplete functionality
  textField.addEventListener('input', (event: any) => {
    const value = event.target.value.toLowerCase();
    if (value.length < 1) return;

    const suggestions = programmingLanguages.filter(lang => 
      lang.toLowerCase().includes(value)
    );

    // You can implement a dropdown suggestion list here
    // For now, we'll just log the suggestions
    console.log('Suggestions for:', value, suggestions);
  });

  container.appendChild(textField);

  // Add some helper text
  const helperText = document.createElement('div');
  helperText.textContent = 'Start typing to see autocomplete suggestions in the console';
  helperText.style.fontSize = '12px';
  helperText.style.color = '#a0a0a0';
  container.appendChild(helperText);
}

function initializeSingleSelectDemo() {
  const container = document.getElementById('single-select-demo');
  if (!container) return;

  // Create a single select with combobox mode
  const singleSelect = document.createElement('vscode-single-select') as any;
  singleSelect.combobox = true;
  singleSelect.placeholder = 'Choose or type a framework...';
  singleSelect.style.width = '100%';
  singleSelect.style.marginBottom = '10px';

  // Add options
  frameworks.forEach(framework => {
    const option = document.createElement('vscode-option') as any;
    option.value = framework;
    option.textContent = framework;
    singleSelect.appendChild(option);
  });

  // Handle selection changes
  singleSelect.addEventListener('change', (event: any) => {
    console.log('Selected framework:', event.target.value);
  });

  container.appendChild(singleSelect);

  // Add helper text
  const helperText = document.createElement('div');
  helperText.textContent = 'Select from the dropdown or type to filter options';
  helperText.style.fontSize = '12px';
  helperText.style.color = '#a0a0a0';
  container.appendChild(helperText);
}

function initializeMultiSelectDemo() {
  const container = document.getElementById('multi-select-demo');
  if (!container) return;

  // Create a multi select with combobox mode
  const multiSelect = document.createElement('vscode-multi-select') as any;
  multiSelect.combobox = true;
  multiSelect.placeholder = 'Select multiple tools...';
  multiSelect.style.width = '100%';
  multiSelect.style.marginBottom = '10px';

  // Add options
  tools.forEach(tool => {
    const option = document.createElement('vscode-option') as any;
    option.value = tool;
    option.textContent = tool;
    multiSelect.appendChild(option);
  });

  // Handle selection changes
  multiSelect.addEventListener('change', (event: any) => {
    console.log('Selected tools:', event.target.selectedOptions);
  });

  container.appendChild(multiSelect);

  // Add helper text
  const helperText = document.createElement('div');
  helperText.textContent = 'Select multiple options and type to filter available choices';
  helperText.style.fontSize = '12px';
  helperText.style.color = '#a0a0a0';
  container.appendChild(helperText);
}
