import { arrayOf, node } from 'prop-types';
import React from 'react';

import Seo from '../Seo';
import styles from './Layout.module.scss';

const Layout = ({ children }) => (
  <>
    <Seo title='Job Listings' />
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  </>
);

Layout.propTypes = {
  children: arrayOf(node).isRequired,
};

export default Layout;
