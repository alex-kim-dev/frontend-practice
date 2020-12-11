import { string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c }) => ({
  wrapper: {
    backgroundColor: c.textAlt,
    borderRadius: '1.5rem',
    height: '5rem',
    overflow: 'hidden',
    width: '5rem',
  },

  logo: {
    objectFit: 'contain',
    width: '100%',
  },
}));

const Logo = ({ src, alt }) => {
  const css = useStyles();

  return (
    <div className={css.wrapper}>
      <img src={src} alt={alt} className={css.logo} width='50' height='50' />
    </div>
  );
};

Logo.propTypes = {
  src: string.isRequired,
  alt: string.isRequired,
};

export default Logo;
