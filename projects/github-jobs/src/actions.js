import { actionTypes as at } from './store';
import { normalizeJobs } from './utils';

export const toggleTheme = () => ({ type: at.TOGGLE_THEME });

export const saveSearch = (payload) => ({ type: at.SAVE_SEARCH, payload });

export const setJobsLoading = (payload) => ({
  type: at.SET_JOBS_LOADING,
  payload,
});

export const setJobsError = (payload) => ({ type: at.SET_JOBS_ERROR, payload });

export const setJobsData = (payload) => ({ type: at.SET_JOBS_DATA, payload });

export const getJobs = ({ description, location, isFullTime }) => (
  dispatch,
) => {
  dispatch(setJobsLoading(true));
  dispatch(setJobsError(null));

  const url = new URL('https://cors-anywhere.herokuapp.com/');
  url.pathname = 'https://jobs.github.com/positions.json';
  if (description) url.searchParams.append('search', description);
  if (location) url.searchParams.append('location', location);
  if (isFullTime) url.searchParams.append('full_time', 'on');

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const jobs = normalizeJobs(data);
      dispatch(setJobsLoading(false));
      dispatch(setJobsData(jobs));
    })
    .catch((error) => {
      dispatch(setJobsLoading(false));
      dispatch(setJobsError(error));
    });
};
