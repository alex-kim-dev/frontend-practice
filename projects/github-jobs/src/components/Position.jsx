import { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';

import { state } from '../store';
import Container from './Container';
import Content from './Content';
import Cta from './Cta';
import Heading from './Heading';
import Summary from './Summary';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flex: 1,
    flexFlow: 'column',
    justifyContent: 'space-between',
  },
});

const Position = () => {
  const css = useStyles();
  const { id } = useParams();
  const {
    jobs: [, , data],
  } = useContext(state);

  const position = data.find((record) => record.id === id);
  const {
    company,
    company_logo: logoUrl,
    company_url: url,
    created_at: createdAt,
    description,
    how_to_apply: summary,
    location,
    title,
    type,
  } = position;

  return (
    <article className={css.wrapper}>
      <Container maxWidth='sm'>
        <Heading data={{ company, url, logoUrl }} />
        <Content
          data={{ createdAt, type, title, location, url, description }}
        />
        {summary && <Summary content={summary} />}
      </Container>
      <Cta data={{ title, company, url }} />
    </article>
  );
};

Position.propTypes = {};

export default Position;
