import { graphql, useStaticQuery } from 'gatsby';
import { arrayOf, shape, string } from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

const Seo = ({ lang, title, description, meta }) => {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          name: 'author',
          content: site.siteMetadata?.author,
        },
      ].concat(meta)}
    />
  );
};

Seo.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
};

Seo.propTypes = {
  lang: string,
  title: string.isRequired,
  description: string,
  meta: arrayOf(shape()),
};

export default Seo;
