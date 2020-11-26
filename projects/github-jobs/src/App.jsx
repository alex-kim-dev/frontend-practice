import { create as createJss } from 'jss';
import preset from 'jss-preset-default';
import { JssProvider, ThemeProvider } from 'react-jss';
import reset from 'reset-jss';

import Hello from './Hello';
import theme from './theme';

const jss = createJss(preset());
jss.createStyleSheet(reset).attach();

const App = () => {
  return (
    <JssProvider jss={jss}>
      <ThemeProvider theme={theme.light}>
        <Hello />
      </ThemeProvider>
    </JssProvider>
  );
};

export default App;
