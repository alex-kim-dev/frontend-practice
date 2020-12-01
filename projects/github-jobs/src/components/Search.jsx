import { createUseStyles } from 'react-jss';

import { useBreakpoint } from '../hooks';
import Button from './Button';
import Container from './Container';

const useStyles = createUseStyles(({ colors: c, breakpoints: { smUp } }) => ({
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

  tempInput: {
    backgroundColor: '#aaa',
    height: 48,
  },

  tempBtn1: {
    backgroundColor: '#888',
    height: 48,
    marginRight: 10,
    width: 48,
  },

  tempCheckbox: {
    backgroundColor: '#888',
    height: 48,
    maxWidth: 206,
    minWidth: 156,
  },

  tempHr: {
    height: 48,
    width: 1,
  },
}));

const Search = () => {
  const css = useStyles();
  const isSmUp = useBreakpoint('smUp');

  const handleSubmit = (e) => e.preventDefault();

  return (
    <Container>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.tempInput} />
        {isSmUp ? (
          <>
            <div className={css.tempHr} />
            <div className={css.tempInput} />
            <div className={css.tempHr} />
            <div className={css.tempCheckbox} />
            <Button type='submit'>Search</Button>
          </>
        ) : (
          <>
            <div className={css.tempBtn1} />
            <Button type='submit'>Icon</Button>
          </>
        )}
      </form>
    </Container>
  );
};

Search.propTypes = {};

export default Search;
