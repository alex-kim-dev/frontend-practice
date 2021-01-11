import { shape, string } from 'prop-types';
import { useContext } from 'react';
import { createUseStyles } from 'react-jss';

import { useBreakpoint } from '../hooks';
import { state } from '../store';
import { getRelativeTimeSince } from '../utils';
import Button from './Button';
import Status from './Status';

const useStyles = createUseStyles(({ colors: c, breakpoints: { smUp } }) => ({
  description: {
    color: (theme) => (theme === 'dark' ? '#9daec2' : c.textAlt),
    lineHeight: '165%',
    marginTop: '3.2rem',
    wordBreak: 'break-word',

    '& a': {
      color: c.accent,
      fontWeight: 700,
    },

    '& h1': {
      fontSize: '2.6rem',
    },

    '& h1, & h2, & h3, & h4, & h5, & h6': {
      color: c.text,
      fontWeight: 700,
      margin: '2.4rem 0',
    },

    '& h2': {
      fontSize: '2.4rem',
    },

    '& h3': {
      fontSize: '2.2rem',
    },

    '& h4': {
      fontSize: '2rem',
    },

    '& h5': {
      fontSize: '1.8rem',
    },

    '& h6': {
      fontSize: '1.6rem',
    },

    '& p': {
      fontSize: '1.6rem',
      margin: '2.4rem 0',
    },

    '& strong': {
      fontWeight: 700,
    },

    '& ul > li::before': {
      backgroundColor: c.accent,
      borderRadius: '50%',
      content: '""',
      display: 'inline-block',
      height: '0.4rem',
      marginRight: '-0.4rem',
      position: 'relative',
      right: '3.6rem',
      verticalAlign: 'middle',
      width: '0.4rem',
    },

    '& ul, & ol': {
      margin: '2.4rem 0',
      paddingLeft: '3.6rem',

      '& > li:not(:first-child)': {
        margin: '0.8rem 0',
      },
    },
  },

  heading: {
    color: c.text,
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: '100%',
    marginTop: '0.8rem',

    [smUp]: {
      fontSize: '2.8rem',
    },
  },

  location: {
    color: c.accent,
    fontSize: '1.4rem',
    fontWeight: 700,
    lineHeight: '130%',
    marginTop: '1.2rem',
  },

  header: {
    display: 'flex',
    flexFlow: 'column',

    [smUp]: {
      alignItems: 'center',
      flexFlow: 'row',
      justifyContent: 'space-between',
    },

    '& > :first-child': {
      marginBottom: '3.2rem',

      [smUp]: {
        marginBottom: 0,
        marginRight: '2rem',
      },
    },
  },

  section: {
    backgroundColor: c.back,
    borderRadius: '0.6rem',
    marginTop: '2.4rem',
    padding: '4rem 2.4rem 3.2rem',

    [smUp]: {
      marginTop: '3.2rem',
      padding: '4.8rem',
    },
  },
}));

const Content = ({
  data: { createdAt, type, title, location, url, description },
}) => {
  const { theme } = useContext(state);
  const css = useStyles(theme);
  const isSmUp = useBreakpoint('smUp');

  const relativeTime = getRelativeTimeSince(new Date(createdAt));

  return (
    <section className={css.section}>
      <div className={css.header}>
        <div>
          <Status list={[relativeTime, type]} />
          <h3 className={css.heading}>{title}</h3>
          <p className={css.location}>{location}</p>
        </div>
        <Button
          fullWidth={isSmUp ? undefined : true}
          as='a'
          href={url}
          target='_blank'
          rel='noreferrer'
        >
          Apply Now
        </Button>
      </div>
      <div
        className={css.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  );
};

Content.propTypes = {
  data: shape({
    createdAt: string,
    type: string,
    title: string,
    location: string,
    url: string,
    description: string,
  }).isRequired,
};

export default Content;
