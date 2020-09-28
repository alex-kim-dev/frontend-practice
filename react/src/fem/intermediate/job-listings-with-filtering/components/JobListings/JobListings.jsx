import 'reset-css';
import 'typeface-spartan';

import React from 'react';

import Seo from '../../../../../components/Seo';
import Tag from '../Tag';
import styles from './JobListings.module.scss';

const JobListings = () => (
  <>
    <Seo title='Job Listings' />
    <h1 className={styles.textCenter}>Hello from Job Listings</h1>
    <Tag onClick={() => console.log('click')}>React</Tag>
    <Tag onDelete={() => console.log('del')}>HTML CSS JS</Tag>
  </>
);

export default JobListings;
