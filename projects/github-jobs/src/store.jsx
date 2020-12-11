import { node } from 'prop-types';
import { createContext, useLayoutEffect, useMemo, useReducer } from 'react';

import { useThemePreference } from './hooks';
import { constantToCamelCase } from './utils';

const stateContext = createContext();
const actionsContext = createContext();

const initialState = {
  theme: 'light',
  search: {
    description: '',
    location: '',
    isFullTime: false,
    isModalOpen: false,
  },
  jobs: [false, null, null], // loading, error, data
};

const actionTypes = Object.fromEntries(
  [
    'TOGGLE_THEME',
    'CHANGE_FULL_TIME',
    'CHANGE_DESCRIPTION',
    'CHANGE_LOCATION',
    'TOGGLE_SEARCH_MODAL',
    'SET_JOBS',
  ].map((str) => [str, str]),
);

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.TOGGLE_THEME:
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };

    case actionTypes.CHANGE_FULL_TIME:
      return {
        ...state,
        search: { ...state.search, isFullTime: !state.search.isFullTime },
      };

    case actionTypes.CHANGE_DESCRIPTION:
      return {
        ...state,
        search: { ...state.search, description: payload },
      };

    case actionTypes.CHANGE_LOCATION:
      return {
        ...state,
        search: { ...state.search, location: payload },
      };

    case actionTypes.TOGGLE_SEARCH_MODAL:
      return {
        ...state,
        search: { ...state.search, isModalOpen: !state.search.isModalOpen },
      };

    case actionTypes.SET_JOBS:
      return { ...state, jobs: payload };

    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isDarkThemePreffered = useThemePreference();

  const actions = useMemo(
    () =>
      Object.values(actionTypes).reduce(
        (acc, type) => ({
          ...acc,
          [constantToCamelCase(type)](payload) {
            dispatch({ type, payload });
          },
        }),
        {},
      ),
    [dispatch],
  );

  useLayoutEffect(() => {
    actions.toggleTheme();
  }, [actions, isDarkThemePreffered]);

  return (
    <stateContext.Provider value={state}>
      <actionsContext.Provider value={actions}>
        {children}
      </actionsContext.Provider>
    </stateContext.Provider>
  );
};

StateProvider.propTypes = { children: node };

export { stateContext as state, actionsContext as actions, StateProvider };
