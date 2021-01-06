// import { createUseStyles } from 'react-jss';

import Container from './Container';
import Heading from './Heading';

// const useStyles = createUseStyles(({ colors: c }) => ({}));

const Position = () => {
  // const css = useStyles();

  return (
    <Container maxWidth='sm'>
      <article>
        <Heading />
      </article>
    </Container>
  );
};

Position.propTypes = {};

export default Position;
