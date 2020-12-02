import { node } from 'prop-types';
import { createContext, useLayoutEffect, useReducer } from 'react';

import { useThemePreference } from './hooks';

const store = createContext({});

const initialState = {
  theme: 'light',
  search: {
    isFullTime: false,
  },
};

const TOGGLE_THEME = 'TOGGLE_THEME';
const CHANGE_FULL_TIME = 'CHANGE_FULL_TIME';

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_THEME:
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };

    case CHANGE_FULL_TIME:
      return { ...state, search: { isFullTime: !state.search.isFullTime } };

    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isDarkThemePreffered = useThemePreference();

  const toggleTheme = () => dispatch({ type: TOGGLE_THEME });

  const changeFullTime = () => dispatch({ type: CHANGE_FULL_TIME });

  useLayoutEffect(() => {
    toggleTheme();
  }, [isDarkThemePreffered]);

  const actions = {
    toggleTheme,
    changeFullTime,
  };

  return <store.Provider value={[state, actions]}>{children}</store.Provider>;
};

StateProvider.propTypes = { children: node };

export { store, StateProvider };
