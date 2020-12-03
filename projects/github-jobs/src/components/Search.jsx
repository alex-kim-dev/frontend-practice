import IconFilter from '@assets/icons/icon-filter.svg';
import IconLocation from '@assets/icons/icon-location.svg';
import IconSearch from '@assets/icons/icon-search.svg';
import { useContext } from 'react';
import { createUseStyles } from 'react-jss';

import { useBreakpoint } from '../hooks';
import { store } from '../store';
import Button from './Button';
import Checkbox from './Checkbox';
import Container from './Container';
import TextField from './TextField';

const useStyles = createUseStyles(
  ({ colors: c, breakpoints: { smUp, mdUp } }) => ({
    form: {
      backgroundColor: c.back,
      borderRadius: '0.6rem',
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      overflow: 'hidden',
      padding: '1.6rem',

      [smUp]: {
        gridTemplateColumns:
          'minmax(0, 46.3rem) min-content minmax(0, 30rem) min-content auto auto',
      },
    },

    description: {
      [mdUp]: {
        paddingLeft: '1.6rem',
        paddingRight: '1.6rem',
      },
    },

    location: {
      [mdUp]: {
        paddingLeft: '2.4rem',
        paddingRight: '1.6rem',
      },
    },

    fullTime: {
      paddingLeft: '2rem',
      paddingRight: '2.8rem',

      [mdUp]: {
        paddingLeft: '3.2rem',
        paddingRight: '2.6rem',
      },
    },

    tempHr: {
      backgroundColor: c.text,
      height: 48,
      width: 1,
    },
  }),
);

const Search = () => {
  const css = useStyles();
  const isSmUp = useBreakpoint('smUp');
  const [
    {
      search: { isFullTime },
    },
    { changeFullTime },
  ] = useContext(store);

  const handleSubmit = (e) => e.preventDefault();

  return (
    <Container>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.description}>
          <TextField
            label='description'
            placeholder='Filter by title, companies, expertise…'
            icon={<IconSearch />}
          />
        </div>
        {isSmUp ? (
          <>
            <div className={css.tempHr} />
            <div className={css.location}>
              <TextField
                label='location'
                placeholder='Filter by location…'
                icon={<IconLocation />}
              />
            </div>
            <div className={css.tempHr} />
            <div className={css.fullTime}>
              <Checkbox
                label='Full Time Only'
                checked={isFullTime}
                onChange={changeFullTime}
              />
            </div>
            <Button type='submit'>Search</Button>
          </>
        ) : (
          <>
            <Button variant='neutral'>
              <IconFilter />
            </Button>
            <Button type='submit'>
              <IconSearch viewBox='0 0 24 24' width='20' height='20' />
            </Button>
          </>
        )}
      </form>
    </Container>
  );
};

Search.propTypes = {};

export default Search;
