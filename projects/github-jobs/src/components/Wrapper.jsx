import { node } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c }) => ({
  wrapper: {
    backgroundColor: c.backAlt,
    minHeight: '100vh',
  },
}));

const Wrapper = ({ children = null }) => {
  const css = useStyles();

  return <div className={css.wrapper}>{children}</div>;
};

Wrapper.propTypes = {
  children: node,
};

export default Wrapper;
