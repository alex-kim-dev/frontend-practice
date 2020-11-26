import { ThemeProvider } from 'react-jss';

import Hello from './Hello';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme.light}>
      <Hello />
    </ThemeProvider>
  );
};

export default App;
