import 'reset-css';
import 'typeface-spartan';
import './JobListings.module.scss';

import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';

import data from '../../data.json';
import Filter from '../Filter';
import JobList from '../JobList';
import Layout from '../Layout';

const JobListings = () => {
  const {
    allFile: { edges: svgs },
  } = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          extension: { eq: "svg" }
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

  const jobsToShow = jobs.filter(({ tags }) =>
    tagFilter.every((tag) => tags.includes(tag)),
  );

  return (
    <Layout>
      {isFilterOn && (
        <Filter
          tags={tagFilter}
          onRemoveTag={removeTagFromFilter}
          onClearTags={clearFilter}
        />
      )}
      <JobList
        jobs={jobsToShow}
        onTagClick={addTagToFilter}
        extraMargin={!isFilterOn}
      />
    </Layout>
  );
};

export default JobListings;
