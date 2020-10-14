import cn from 'classnames';
import { func, string } from 'prop-types';
import React from 'react';

import styles from './Tag.module.scss';

const Tag = ({ onClick, onDelete, children }) => {
  return (
    <div className={styles.wrapper}>
      {onClick ? (
        <button
          type='button'
          className={cn(styles.tag, styles.btn)}
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <div className={styles.tag}>{children}</div>
      )}
      {onDelete && (
        <button
          type='button'
          className={cn(styles.delete, styles.btn)}
          aria-label={`Remove ${children} tag`}
          onClick={onDelete}
        />
      )}
    </div>
  );
};

Tag.defaultProps = {
  onClick: null,
  onDelete: null,
};

Tag.propTypes = {
  onClick: func,
  onDelete: func,
  children: string.isRequired,
};

export default Tag;
