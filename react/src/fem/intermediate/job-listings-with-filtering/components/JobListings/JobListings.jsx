import 'reset-css';
import 'typeface-spartan';

import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Seo from '../../../../../components/Seo';
import jobs from '../../data.json';
import JobItem from '../JobItem';
import styles from './JobListings.module.scss';

const job = jobs[0];

const JobListings = () => {
  const {
    allFile: { edges: logos },
  } = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          sourceInstanceName: { eq: "fem" }
          relativePath: { glob: "*/*/images/*.svg" }
        }
      ) {
        edges {
          node {
            base
            publicURL
          }
        }
      }
    }
  `);

  job.logoUrl = logos.find(
    (logo) => logo.node.base === 'photosnap.svg',
  ).node.publicURL;

  return (
    <>
      <Seo title='Job Listings' />
      <h1 className={styles.textCenter}>Hello from Job Listings</h1>
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          minHeight: '100vh',
          background: '#effafa',
        }}
      >
        <JobItem key={job.id} data={job} />
      </div>
    </>
  );
};

export default JobListings;
