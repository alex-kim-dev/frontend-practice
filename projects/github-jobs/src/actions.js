import { actionTypes as at } from './store';
import { makeJobsUrl, normalizeJobs } from './utils';

export const toggleTheme = () => ({ type: at.TOGGLE_THEME });

export const saveSearch = (payload) => ({ type: at.SAVE_SEARCH, payload });

export const setJobsLoading = (payload) => ({
  type: at.SET_JOBS_LOADING,
  payload,
});

export const setJobsError = (payload) => ({ type: at.SET_JOBS_ERROR, payload });

export const setJobsData = (payload) => ({ type: at.SET_JOBS_DATA, payload });

export const getJobs = (searchParams) => (dispatch) => {
  dispatch(setJobsLoading(true));
  dispatch(setJobsError(null));

  const url = makeJobsUrl(searchParams);

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
