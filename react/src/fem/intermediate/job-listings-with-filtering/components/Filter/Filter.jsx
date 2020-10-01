import { arrayOf, func, string } from 'prop-types';
import React from 'react';

import Tag from '../Tag';
import styles from './Filter.module.scss';

const Filter = ({ tags, onRemoveTag, onClearTags }) => (
  <div className={styles.filter}>
    <ul className={styles.filterList}>
      {tags.map((tag) => (
        <li key={tag} className={styles.filterItem}>
          <Tag onDelete={onRemoveTag(tag)}>{tag}</Tag>
        </li>
      ))}
    </ul>
    <button type='button' className={styles.clearBtn} onClick={onClearTags}>
      Clear
    </button>
  </div>
);

Filter.propTypes = {
  tags: arrayOf(string).isRequired,
  onRemoveTag: func.isRequired,
  onClearTags: func.isRequired,
};

export default Filter;
