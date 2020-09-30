import 'reset-css';
import 'typeface-spartan';

import React from 'react';

import Seo from '../../../../../components/Seo';
import JobItem from '../JobItem';
import styles from './JobListings.module.scss';

const JobListings = () => (
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
      <JobItem />
    </div>
  </>
);

export default JobListings;
