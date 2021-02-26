import IconFilter from '@assets/icons/icon-filter.svg';
import IconLocation from '@assets/icons/icon-location.svg';
import IconSearch from '@assets/icons/icon-search.svg';
import Button from '@components/common/Button';
import Checkbox from '@components/common/Checkbox';
import TextField from '@components/common/TextField';
import Container from '@components/layout/Container';
import Modal from '@components/layout/Modal';
import { bool } from 'prop-types';
import { useLayoutEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';

import { getJobs, saveSearch } from '@/actions';
import { useBreakpoint, useDispatch, useStore } from '@/hooks';
import { hexToRgba } from '@/utils';

const useSearchStyles = createUseStyles(
  ({ colors: c, breakpoints: { smUp, mdUp } }) => ({
    filter: {
      padding: '1.6rem 0',
    },

    form: {
      backgroundColor: c.back,
      borderRadius: '0.6rem',
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      overflow: 'hidden',

      [smUp]: {
        gridTemplateColumns: [
          'minmax(0, 46.3rem)',
          'min-content',
          'minmax(0, 30rem)',
          'min-content',
          'min-content',
          'auto',
        ].join(' '),
      },
    },

    description: {
      padding: '1.6rem 1rem 1.6rem 1.6rem',

      [smUp]: {
        paddingLeft: '2.4rem',
        paddingRight: '2.4rem',
      },

      [mdUp]: {
        paddingLeft: '3.2rem',
        paddingRight: '3.2rem',
      },
    },

    location: {
      padding: '1.6rem 2.4rem',
    },

    fullTime: {
      [smUp]: {
        padding: '1.6rem 1.8rem 1.6rem 2rem',
      },

      [mdUp]: {
        paddingLeft: '3.2rem',
        paddingRight: '1.6rem',
      },
    },

    submit: {
      padding: '1.6rem 1.6rem 1.6rem 1rem',
    },

    modalBody: {
      padding: '1.2rem 2.4rem 2.4rem',

      '& > * + *': {
        marginTop: '1.2rem',
      },
    },
  }),
);

const useSeparatorStyles = createUseStyles(({ colors: c }) => ({
  separator: ({ vertical }) => ({
    backgroundColor: hexToRgba(c.textAlt, 0.2),
    height: vertical ? '100%' : '0.1rem',
    width: vertical ? '0.1rem' : '100%',
  }),
}));

const Separator = ({ vertical = false }) => {
  const css = useSeparatorStyles({ vertical });

  return <div className={css.separator} />;
};

Separator.propTypes = {
  vertical: bool,
};

const Search = () => {
  const css = useSearchStyles();
  const isSmUp = useBreakpoint('smUp');
  const isMdUp = useBreakpoint('mdUp');

  const {
    search,
    jobs: { isLoading },
  } = useStore();
  const dispatch = useDispatch();
  const history = useHistory();

  const [description, setDescription] = useState(search.description);
  const [location, setLocation] = useState(search.location);
  const [isFullTime, setFullTime] = useState(search.isFullTime);
  const [isModalOpen, setModalOpen] = useState(false);

  useLayoutEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const searchData = {
      description: query.get('search') ?? '',
      location: query.get('location') ?? '',
      isFullTime: query.get('full_time') === 'on',
    };

    setDescription(searchData.description);
    setLocation(searchData.location);
    setFullTime(searchData.isFullTime);

    dispatch(saveSearch(searchData));
    dispatch(getJobs(searchData));
  }, [dispatch]);

  const handleDescriptionChange = ({ target: { value } }) => {
    setDescription(value);
  };

  const handleLocationChange = ({ target: { value } }) => {
    setLocation(value);
  };

  const handleFullTimeChange = ({ target: { checked } }) => {
    setFullTime(checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    const searchData = { description, location, isFullTime };
    dispatch(saveSearch(searchData));
    dispatch(getJobs(searchData));

    const searchParams = new URLSearchParams();
    if (description) searchParams.append('search', description);
    if (location) searchParams.append('location', location);
    if (isFullTime) searchParams.append('full_time', 'on');

    history.push(`/?${searchParams.toString()}`);
  };

  const extendedSearch = (
    <>
      <Separator vertical />
      <div className={css.location}>
        <TextField
          label='location'
          placeholder='Filter by location…'
          icon={<IconLocation />}
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      <Separator vertical />
      <div className={css.fullTime}>
        <Checkbox
          label={`Full Time${isMdUp ? ' Only' : ''}`}
          checked={isFullTime}
          onChange={handleFullTimeChange}
        />
      </div>
      <div className={css.submit}>
        <Button type='submit' fullWidth loading={isLoading}>
          Search
        </Button>
      </div>
    </>
  );

  const compactSearch = (
    <>
      <div className={css.filter}>
        <Button
          type='button'
          variant='neutral'
          onClick={() => setModalOpen(true)}
        >
          <IconFilter />
        </Button>
      </div>
      <div className={css.submit}>
        <Button type='submit'>
          <IconSearch viewBox='0 0 24 24' width='20' height='20' />
        </Button>
      </div>
    </>
  );

  const modal = (
    <Modal onClose={() => setModalOpen(false)}>
      <div className={css.location}>
        <TextField
          label='location'
          placeholder='Filter by location…'
          icon={<IconLocation />}
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      <Separator />
      <div className={css.modalBody}>
        <Checkbox
          label='Full Time Only'
          checked={isFullTime}
          onChange={handleFullTimeChange}
        />
        <Button type='submit' fullWidth>
          Search
        </Button>
      </div>
    </Modal>
  );

  return (
    <Container>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.description}>
          <TextField
            label='description'
            placeholder='Filter by title, companies, expertise…'
            icon={isSmUp ? <IconSearch /> : null}
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        {isSmUp ? extendedSearch : compactSearch}
        {!isSmUp && isModalOpen && modal}
      </form>
    </Container>
  );
};

export default Search;
