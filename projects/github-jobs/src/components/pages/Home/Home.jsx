import { useStore } from '@/hooks';

import ErrorMessage from './ErrorMessage';
import Grid from './Grid';
import Search from './Search';

const Home = () => {
  const {
    jobs: { error, data },
  } = useStore();

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
