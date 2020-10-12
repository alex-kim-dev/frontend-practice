import cn from 'classnames';
import { string } from 'prop-types';
import React from 'react';

import styles from './Chip.module.scss';

const Chip = ({ color, children }) => (
  <div className={cn(styles.chip, { [styles.dark]: color === 'dark' })}>
    <span className={styles.label}>{children}</span>
  </div>
);

Chip.defaultProps = {
  color: 'primary',
};

Chip.propTypes = {
  color: string,
  children: string.isRequired,
};

export default Chip;
