import { useContext, useLayoutEffect } from 'react';

import { actions, state } from '@/store';
import { normalizeJobs } from '@/utils';

import ErrorMessage from './ErrorMessage';
import Grid from './Grid';
import Search from './Search';

const Home = () => {
  const {
    jobs: [, error, data],
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
      .then((json) => setJobs([false, null, normalizeJobs(json)]))
      .catch((err) => setJobs([false, err, null]));
  }, [changeDescription, changeLocation, changeFullTime, setJobs]);

  const errMsg = 'Error while getting jobs, please try again';
  const noResultsMsg = 'Nothing found';

  return (
    <>
      <Search />
      {error && <ErrorMessage message={errMsg} />}
      {data?.length === 0 && <ErrorMessage message={noResultsMsg} />}
      {data && <Grid data={data} />}
    </>
  );
};

Home.propTypes = {};

export default Home;
