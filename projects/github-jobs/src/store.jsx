import { node } from 'prop-types';
import { createContext, useLayoutEffect, useReducer } from 'react';

import { useThemePreference } from './hooks';

const store = createContext({});

const initialState = {
  theme: 'light',
  search: {
    description: '',
    location: '',
    isFullTime: false,
  },
};

const TOGGLE_THEME = 'TOGGLE_THEME';
const CHANGE_FULL_TIME = 'CHANGE_FULL_TIME';
const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
const CHANGE_LOCATION = 'CHANGE_LOCATION';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_THEME:
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };

    case CHANGE_FULL_TIME:
      return {
        ...state,
        search: { ...state.search, isFullTime: !state.search.isFullTime },
      };

    case CHANGE_DESCRIPTION:
      return {
        ...state,
        search: { ...state.search, description: payload },
      };

    case CHANGE_LOCATION:
      return {
        ...state,
        search: { ...state.search, location: payload },
      };

    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isDarkThemePreffered = useThemePreference();

  const toggleTheme = () => dispatch({ type: TOGGLE_THEME });

  const changeFullTime = () => dispatch({ type: CHANGE_FULL_TIME });

  const changeDescription = ({ target: { value } }) =>
    dispatch({ type: CHANGE_DESCRIPTION, payload: value });

  const changeLocation = ({ target: { value } }) =>
    dispatch({ type: CHANGE_LOCATION, payload: value });

  useLayoutEffect(() => {
    toggleTheme();
  }, [isDarkThemePreffered]);

  const actions = {
    toggleTheme,
    changeFullTime,
    changeDescription,
    changeLocation,
  };

  return <store.Provider value={[state, actions]}>{children}</store.Provider>;
};

StateProvider.propTypes = { children: node };

export { store, StateProvider };
