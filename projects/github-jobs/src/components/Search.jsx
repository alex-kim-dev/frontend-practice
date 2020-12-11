import IconFilter from '@assets/icons/icon-filter.svg';
import IconLocation from '@assets/icons/icon-location.svg';
import IconSearch from '@assets/icons/icon-search.svg';
import { useContext, useLayoutEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';

import { useBreakpoint } from '../hooks';
import { actions, state } from '../store';
import { hexToRgba } from '../utils';
import Button from './Button';
import Checkbox from './Checkbox';
import Container from './Container';
import Modal from './Modal';
import TextField from './TextField';

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

const Search = () => {
  const css = useSearchStyles();
  const isSmUp = useBreakpoint('smUp');
  const isMdUp = useBreakpoint('mdUp');
  const {
    search: { description, location, isFullTime, isModalOpen },
  } = useContext(state);
  const {
    changeDescription,
    changeLocation,
    changeFullTime,
    toggleSearchModal,
    setJobs,
  } = useContext(actions);
  const history = useHistory();

  useLayoutEffect(() => {
    if (isSmUp && isModalOpen) toggleSearchModal();
  }, [isModalOpen, isSmUp, toggleSearchModal]);

  const handleDescriptionChange = ({ target: { value } }) => {
    changeDescription(value);
  };

  const handleLocationChange = ({ target: { value } }) => {
    changeLocation(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setJobs([true, null, null]);

    const url = new URL('https://cors-anywhere.herokuapp.com/');
    url.pathname = 'https://jobs.github.com/positions.json';
    if (description) url.searchParams.append('search', description);
    if (location) url.searchParams.append('location', location);
    if (isFullTime) url.searchParams.append('full_time', 'on');

    history.push(`/?${url.searchParams.toString()}`);

    fetch(url)
      .then((response) => response.json())
      .then((data) => setJobs([false, null, data]))
      .catch((error) => setJobs([false, error, null]));
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
          onChange={changeFullTime}
        />
      </div>
      <div className={css.submit}>
        <Button type='submit' fullWidth>
          Search
        </Button>
      </div>
    </>
  );

  const compactSearch = (
    <>
      <div className={css.filter}>
        <Button
          variant='neutral'
          onClick={isModalOpen ? undefined : toggleSearchModal}
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
    <Modal onClose={toggleSearchModal}>
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
          onChange={changeFullTime}
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
        {isModalOpen && modal}
      </form>
    </Container>
  );
};

export default Search;
