import React from 'react';
import renderer from 'react-test-renderer';

import Filter from './Filter';

describe('Filter', () => {
  it('renders correctly', () => {
    const tags = ['Junior', 'Frontend', 'React', 'JavaScript'];
    const json = renderer
      .create(
        <Filter tags={tags} onClearTags={jest.fn()} onRemoveTag={jest.fn()} />,
      )
      .toJSON();

    expect(json).toMatchSnapshot();
  });
});
