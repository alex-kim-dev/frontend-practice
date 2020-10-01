import React from 'react';
import renderer from 'react-test-renderer';

import Chip from './Chip';

describe('Chip', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Chip>Some text</Chip>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
