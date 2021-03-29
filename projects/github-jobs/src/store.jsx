import { arrayOf, node, oneOfType } from 'prop-types';
import { createContext, useMemo, useReducer } from 'react';

import { mergeJobs } from './utils';

const stateContext = createContext();
const dispatchContext = createContext();

const initialState = {
  theme: 'light',
  search: {
    description: '',
    location: '',
    isFullTime: false,
    page: 1,
  },
  jobs: {
    isLoading: false,
    error: null,
    data: [],
  },
};

export const actionTypes = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  SAVE_SEARCH: 'SAVE_SEARCH',
  NEXT_PAGE: 'NEXT_PAGE',
  SET_JOBS_LOADING: 'SET_JOBS_LOADING',
  SET_JOBS_ERROR: 'SET_JOBS_ERROR',
  SET_JOBS_DATA: 'SET_JOBS_DATA',
  APPEND_JOBS_DATA: 'APPEND_JOBS_DATA',
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.TOGGLE_THEME:
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };

    case actionTypes.SAVE_SEARCH:
      return {
        ...state,
        search: { ...payload, page: initialState.search.page },
      };

    case actionTypes.SET_JOBS_LOADING:
      return { ...state, jobs: { ...state.jobs, isLoading: payload } };

    case actionTypes.SET_JOBS_ERROR:
      return { ...state, jobs: { ...state.jobs, error: payload } };

    case actionTypes.SET_JOBS_DATA:
      return {
        ...state,
        search: { ...state.search, page: state.search.page + 1 },
        jobs: {
          ...state.jobs,
          data:
            state.search.page === initialState.search.page
              ? payload
              : mergeJobs(state.jobs.data, payload),
        },
      };

    default:
      return state;
  }
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchWithThunks = useMemo(
    () => (action) => {
      if (typeof action === 'function') action(dispatch);
      else dispatch(action);
    },
    [dispatch],
  );

  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatchWithThunks}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: oneOfType([node, arrayOf(node)]),
};

export { dispatchContext, stateContext, StoreProvider };
