import Button from '@components/common/Button';
import Container from '@components/layout/Container';
import { createUseStyles } from 'react-jss';

import { getJobs } from '@/actions';
import { useDispatch, useStore } from '@/hooks';

import ErrorMessage from './ErrorMessage';
import Grid from './Grid';
import Search from './Search';

const useStyles = createUseStyles(({ breakpoints: { smUp, mdUp } }) => ({
  loadMore: {
    marginBottom: '6.2rem',
    marginTop: '3.2rem',
    textAlign: 'center',

    [smUp]: {
      marginTop: '5.6rem',
    },

    [mdUp]: {
      marginBottom: '10.4rem',
    },
  },
}));

const Home = () => {
  const {
    search,
    jobs: { isLoading, error, data },
  } = useStore();
  const dispatch = useDispatch();
  const css = useStyles();

  const errMsg = 'Error while getting jobs, please try again';
  const noResultsMsg = 'Nothing found';

  const handleLoadMoreClick = () => {
    if (isLoading) return;
    dispatch(getJobs(search));
  };

  const renderBody = () => {
    if (error) return <ErrorMessage message={errMsg} />;

    return data.length === 0 ? (
      <ErrorMessage message={noResultsMsg} />
    ) : (
      <>
        <Grid data={data} />
        <Container>
          <div className={css.loadMore}>
            <Button loading={isLoading} onClick={handleLoadMoreClick}>
              Load More
            </Button>
          </div>
        </Container>
      </>
    );
  };

  return (
    <>
      <Search />
      {renderBody()}
    </>
  );
};

Home.propTypes = {};

export default Home;
