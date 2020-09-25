import React from 'react';
import renderer from 'react-test-renderer';

import Logo from './Logo';

describe('Logo', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Logo src='source' alt='alt' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
