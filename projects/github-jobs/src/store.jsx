import { node } from 'prop-types';
import { createContext, useLayoutEffect, useMemo, useReducer } from 'react';

import { useThemePreference } from '@/hooks';
import { constantToCamelCase } from '@/utils';

const stateContext = createContext();
const actionsContext = createContext();

const initialState = {
  theme: 'light',
  search: {
    description: '',
    location: '',
    isFullTime: false,
  },
  jobs: [false, null, null], // loading, error, data
};

const actionTypes = Object.fromEntries(
  ['TOGGLE_THEME', 'SAVE_SEARCH', 'SET_JOBS'].map((str) => [str, str]),
);

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.TOGGLE_THEME:
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };

    case actionTypes.SAVE_SEARCH:
      return { ...state, search: payload };

    case actionTypes.SET_JOBS:
      return { ...state, jobs: payload };

    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isDarkThemePreferred = useThemePreference();

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
  }, [actions, isDarkThemePreferred]);

  return (
    <stateContext.Provider value={state}>
      <actionsContext.Provider value={actions}>
        {children}
      </actionsContext.Provider>
    </stateContext.Provider>
  );
};

StateProvider.propTypes = { children: node };

export { actionsContext as actions, stateContext as state, StateProvider };
