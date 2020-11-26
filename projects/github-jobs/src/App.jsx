import { create as createJss } from 'jss';
import preset from 'jss-preset-default';
import { JssProvider, ThemeProvider } from 'react-jss';
import reset from 'reset-jss';

import Hello from './Hello';
import theme from './theme';

const globalStyles = {
  '@global': {
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },

    html: {
      boxSizing: 'border-box',
      fontSize: '62.5%',
    },

    body: {
      fontSize: '1.6rem',
    },

    '.sr-only': {
      border: 0,
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1,
    },
  },
};

const jss = createJss(preset());
jss.createStyleSheet(reset).attach();
jss.createStyleSheet(globalStyles).attach();

const App = () => {
  return (
    <JssProvider jss={jss}>
      <ThemeProvider theme={{ ...theme, colors: theme.colors.light }}>
        <Hello />
      </ThemeProvider>
    </JssProvider>
  );
};

export default App;
