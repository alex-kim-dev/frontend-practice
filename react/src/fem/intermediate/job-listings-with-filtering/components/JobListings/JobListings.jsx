import 'reset-css';
import 'typeface-spartan';

import React from 'react';

import Seo from '../../../../../components/Seo';
import Chip from '../Chip';
import styles from './JobListings.module.scss';

const JobListings = () => (
  <>
    <Seo title='Job Listings' />
    <h1 className={styles.textCenter}>Hello from Job Listings</h1>
    <Chip color='dark'>Featured</Chip>
  </>
);

export default JobListings;
