import React from 'react';
import renderer from 'react-test-renderer';

import data from '../../data.json';
import JobList from '.';

describe('JobList', () => {
  it('renders correctly', () => {
    const jobs = data.map((job) => {
      const { role, level, languages, tools } = job;
      return {
        ...job,
        tags: [role, level, ...languages, ...tools],
        logoUrl: 'https://example.com',
      };
    });

    const json = renderer
      .create(<JobList jobs={jobs} onTagClick={jest.fn()} />)
      .toJSON();

    expect(json).toMatchSnapshot();
  });
});
