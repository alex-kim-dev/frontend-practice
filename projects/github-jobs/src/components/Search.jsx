import IconFilter from '@assets/icons/icon-filter.svg';
import IconLocation from '@assets/icons/icon-location.svg';
import IconSearch from '@assets/icons/icon-search.svg';
import { useContext } from 'react';
import { createUseStyles } from 'react-jss';

import { useBreakpoint } from '../hooks';
import { store } from '../store';
import { hexToRgba } from '../utils';
import Button from './Button';
import Checkbox from './Checkbox';
import Container from './Container';
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
      [smUp]: {
        padding: '1.6rem 2.4rem',
      },
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
  const [
    {
      search: { description, location, isFullTime },
    },
    { changeDescription, changeLocation, changeFullTime },
  ] = useContext(store);

  const handleSubmit = (e) => e.preventDefault();

  return (
    <Container>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.description}>
          <TextField
            label='description'
            placeholder='Filter by title, companies, expertise…'
            icon={isSmUp ? <IconSearch /> : null}
            value={description}
            onChange={changeDescription}
          />
        </div>
        {isSmUp ? (
          <>
            <Separator vertical />
            <div className={css.location}>
              <TextField
                label='location'
                placeholder='Filter by location…'
                icon={<IconLocation />}
                value={location}
                onChange={changeLocation}
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
        ) : (
          <>
            <div className={css.filter}>
              <Button variant='neutral'>
                <IconFilter />
              </Button>
            </div>
            <div className={css.submit}>
              <Button type='submit'>
                <IconSearch viewBox='0 0 24 24' width='20' height='20' />
              </Button>
            </div>
          </>
        )}
      </form>
    </Container>
  );
};

export default Search;
