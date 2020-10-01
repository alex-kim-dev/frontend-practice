import 'reset-css';
import 'typeface-spartan';

import cn from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';

import Seo from '../../../../../components/Seo';
import data from '../../data.json';
import JobItem from '../JobItem';
import Tag from '../Tag';
import styles from './JobListings.module.scss';

const JobListings = () => {
  const {
    allFile: { edges: svgs },
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

  const jobs = data.map((job) => {
    const fileName = job.logo.split('/')[2];
    const logoUrl = svgs.find((svg) => svg.node.base === fileName).node
      .publicURL;

    const { role, level, languages, tools } = job;
    const tags = [role, level, ...languages, ...tools];

    return { ...job, logoUrl, tags };
  });

  const [tagFilter, setTagFilter] = useState([]);
  const isFilterOn = tagFilter.length > 0;

  const addTagToFilter = (name) => () => {
    setTagFilter((prevState) =>
      prevState.includes(name) ? prevState : [...prevState, name],
    );
  };

  const removeTagFromFilter = (name) => () => {
    setTagFilter((prevState) => prevState.filter((tag) => tag !== name));
  };

  const clearFilter = () => {
    setTagFilter([]);
  };

  return (
    <>
      <Seo title='Job Listings' />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {isFilterOn && (
            <div className={styles.filter}>
              <ul className={styles.filterList}>
                {tagFilter.map((tag) => (
                  <li key={tag} className={styles.filterItem}>
                    <Tag onDelete={removeTagFromFilter(tag)}>{tag}</Tag>
                  </li>
                ))}
              </ul>
              <button
                type='button'
                className={styles.clearBtn}
                onClick={clearFilter}
              >
                Clear
              </button>
            </div>
          )}
          <ul
            className={cn(styles.jobList, {
              [styles.extraMargin]: !isFilterOn,
            })}
          >
            {jobs
              .filter(({ tags }) =>
                tagFilter.every((tag) => tags.includes(tag)),
              )
              .map((job) => (
                <li key={job.id}>
                  <JobItem data={job} onTagClick={addTagToFilter} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default JobListings;
