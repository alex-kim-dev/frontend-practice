import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles(({ color: c }) => ({
  heading: {
    color: c.text,
  },
}));

const Hello = () => {
  const theme = useTheme();
  const css = useStyles({ theme });

  return <h1 className={css.heading}>Hello world!</h1>;
};

export default Hello;
