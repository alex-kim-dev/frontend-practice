import React from 'react';
import renderer from 'react-test-renderer';

import jobs from '../../data.json';
import JobItem from './JobItem';

describe('JobItem', () => {
  it('renders correctly', () => {
    const job = jobs[0];
    const { role, level, languages, tools } = job;

    job.logoUrl = 'https://example.com';
    job.tags = [role, level, ...languages, ...tools];

    const json = renderer
      .create(<JobItem data={jobs[0]} onTagClick={jest.fn()} />)
      .toJSON();

    expect(json).toMatchSnapshot();
  });
});
