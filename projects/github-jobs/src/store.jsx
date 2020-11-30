import { node } from 'prop-types';
import { createContext, useReducer } from 'react';

const store = createContext({});

const initialState = {
  theme: 'light',
};

const TOGGLE_THEME = 'TOGGLE_THEME';

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_THEME:
      return { theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleTheme = () => dispatch({ type: TOGGLE_THEME });

  const actions = {
    toggleTheme,
  };

  return <store.Provider value={{ state, actions }}>{children}</store.Provider>;
};

StateProvider.propTypes = { children: node };

export { store, StateProvider };
