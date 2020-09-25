import 'reset-css';
import 'typeface-spartan';

import React from 'react';

import Seo from '../../../../../components/Seo';
import logo from '../../images/photosnap.svg';
import Logo from '../Logo';
import styles from './JobListings.module.scss';

const JobListings = () => (
  <>
    <Seo title='Job Listings' />
    <h1 className={styles.textCenter}>Hello from Job Listings</h1>
    <div style={{ width: 100 }}>
      <Logo src={logo} alt='Photosnap logo' />
    </div>
  </>
);

export default JobListings;
