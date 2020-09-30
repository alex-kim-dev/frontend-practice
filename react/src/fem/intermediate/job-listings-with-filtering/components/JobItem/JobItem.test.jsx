import React from 'react';
import renderer from 'react-test-renderer';

import jobs from '../../data.json';
import JobItem from './JobItem';

describe('JobItem', () => {
  it('renders correctly', () => {
    const job = jobs[0];
    job.logoUrl = 'https://example.com';
    const json = renderer.create(<JobItem data={jobs[0]} />).toJSON();

    expect(json).toMatchSnapshot();
  });
});
