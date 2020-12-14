import logo from '@assets/desktop/logo.svg';
import { string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c }) => ({
  wrapper: {
    backgroundColor: c.accent,
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

const Logo = ({ src = logo, alt = 'No logo provided' }) => {
  const css = useStyles();

  return (
    <div className={css.wrapper}>
      <img src={src} alt={alt} className={css.logo} width='50' height='50' />
    </div>
  );
};

Logo.propTypes = {
  src: string,
  alt: string,
};

export default Logo;
