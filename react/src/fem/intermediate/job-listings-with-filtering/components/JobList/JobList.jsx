import cn from 'classnames';
import { arrayOf, bool, func, shape } from 'prop-types';
import React from 'react';

import JobItem from '../JobItem';
import styles from './JobList.module.scss';

const JobList = ({ jobs, onTagClick, extraMargin }) => (
  <ul
    className={cn(styles.jobList, {
      [styles.extraMargin]: extraMargin,
    })}
  >
    {jobs.map((job) => (
      <li key={job.id}>
        <JobItem data={job} onTagClick={onTagClick} />
      </li>
    ))}
  </ul>
);

JobList.defaultProps = {
  extraMargin: true,
};

JobList.propTypes = {
  jobs: arrayOf(shape()).isRequired,
  onTagClick: func.isRequired,
  extraMargin: bool,
};

export default JobList;
