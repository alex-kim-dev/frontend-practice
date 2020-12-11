import 'fontsource-kumbh-sans/300-normal.css';
import 'fontsource-kumbh-sans/400-normal.css';
import 'fontsource-kumbh-sans/700-normal.css';

import { create as createJss } from 'jss';
import preset from 'jss-preset-default';
import { memo, useContext, useLayoutEffect } from 'react';
import { JssProvider, ThemeProvider } from 'react-jss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reset from 'reset-jss';

import Header from './components/Header';
import Search from './components/Search';
import Wrapper from './components/Wrapper';
import { actions, state } from './store';
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
      fontFamily: 'Kumbh Sans, sans-serif',
      fontSize: '1.6rem',
    },

    'button, input': {
      fontFamily: 'inherit',
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
  const {
    theme: currentTheme,
    jobs: [isLoading, error, data],
  } = useContext(state);
  const {
    changeDescription,
    changeLocation,
    changeFullTime,
    setJobs,
  } = useContext(actions);

  useLayoutEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const description = query.get('search');
    const location = query.get('location');
    const isFullTime = query.get('full_time');

    if (description) changeDescription(description);
    if (location) changeLocation(location);
    if (isFullTime) changeFullTime();

    setJobs([true, null, null]);

    const url = new URL('https://cors-anywhere.herokuapp.com/');
    url.pathname = 'https://jobs.github.com/positions.json';
    url.search = query;

    fetch(url)
      .then((response) => response.json())
      .then((json) => setJobs([false, null, json]))
      .catch((err) => setJobs([false, err, null]));
  }, [changeDescription, changeLocation, changeFullTime, setJobs]);

  return (
    <JssProvider jss={jss}>
      <ThemeProvider theme={{ ...theme, colors: theme.colors[currentTheme] }}>
        <Router>
          <Wrapper>
            <Header />
            <Switch>
              <Route exact path='/:id'>
                Position
              </Route>
              <Route exact path='/'>
                <Search />
                <div
                  style={{
                    color: 'gray',
                    fontSize: '2.4rem',
                    marginTop: '2.4rem',
                    textAlign: 'center',
                  }}
                >
                  {isLoading && 'Loading...'}
                  {error && error.toString()}
                  {data && `Entries fetched: ${data.length}`}
                </div>
              </Route>
            </Switch>
          </Wrapper>
        </Router>
      </ThemeProvider>
    </JssProvider>
  );
};

export default memo(App);
