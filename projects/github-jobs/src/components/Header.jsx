import backDesktop from '@assets/desktop/bg-pattern-header.svg';
import iconMoon from '@assets/desktop/icon-moon.svg';
import iconSun from '@assets/desktop/icon-sun.svg';
import logo from '@assets/desktop/logo.svg';
import backMobile from '@assets/mobile/bg-pattern-header.svg';
import backTablet from '@assets/tablet/bg-pattern-header.svg';
import { createUseStyles } from 'react-jss';

import Container from './Container';
import Toggle from './Toggle';

const useStyles = createUseStyles(({ breakpoints: { smUp, mdUp } }) => ({
  header: {
    background: `center top / 100% 100% no-repeat url(${backMobile})`,
    marginBottom: '-4rem',
    paddingBottom: '7.2rem',
    paddingTop: '3.2rem',

    [smUp]: {
      backgroundImage: `url(${backTablet})`,
      paddingBottom: '8.6rem',
      paddingTop: '4.2rem',
    },

    [mdUp]: {
      backgroundImage: `url(${backDesktop})`,
      paddingBottom: '8.5rem',
      paddingTop: '4.5rem',
    },
  },

  inner: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'space-between',

    '& > :not(:last-child)': {
      marginRight: '1.6rem',
    },
  },
}));

const Header = () => {
  const css = useStyles();

  return (
    <header className={css.header}>
      <Container>
        <div className={css.inner}>
          <img src={logo} alt='Devjobs' />
          <Toggle
            label='Switch theme'
            iconLeft={iconSun}
            iconRight={iconMoon}
          />
        </div>
      </Container>
    </header>
  );
};

Header.propTypes = {};

export default Header;
