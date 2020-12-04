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
    isModalOpen: false,
  },
  jobs: {
    isLoading: false,
    error: null,
    data: null,
  },
};

const TOGGLE_THEME = 'TOGGLE_THEME';
const CHANGE_FULL_TIME = 'CHANGE_FULL_TIME';
const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
const CHANGE_LOCATION = 'CHANGE_LOCATION';
const TOGGLE_SEARCH_MODAL = 'TOGGLE_SEARCH_MODAL';
const SET_JOBS_LOADING = 'SET_JOBS_LOADING';
const SET_JOBS_ERROR = 'SET_JOBS_ERROR';
const SET_JOBS_DATA = 'SET_JOBS_DATA';

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

    case TOGGLE_SEARCH_MODAL:
      return {
        ...state,
        search: { ...state.search, isModalOpen: !state.search.isModalOpen },
      };

    case SET_JOBS_LOADING:
      return { ...state, jobs: { ...state.jobs, isLoading: payload } };

    case SET_JOBS_ERROR:
      return { ...state, jobs: { ...state.jobs, error: payload } };

    case SET_JOBS_DATA:
      return { ...state, jobs: { ...state.jobs, data: payload } };

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

  const toggleSearchModal = () => dispatch({ type: TOGGLE_SEARCH_MODAL });

  const setJobsLoading = (payload) =>
    dispatch({ type: SET_JOBS_LOADING, payload });

  const setJobsError = (payload) => dispatch({ type: SET_JOBS_ERROR, payload });

  const setJobsData = (payload) => dispatch({ type: SET_JOBS_DATA, payload });

  useLayoutEffect(() => {
    toggleTheme();
  }, [isDarkThemePreffered]);

  const actions = {
    toggleTheme,
    changeFullTime,
    changeDescription,
    changeLocation,
    toggleSearchModal,
    setJobsLoading,
    setJobsError,
    setJobsData,
  };

  return <store.Provider value={[state, actions]}>{children}</store.Provider>;
};

StateProvider.propTypes = { children: node };

export { store, StateProvider };
