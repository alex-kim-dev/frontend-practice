import React from 'react';
import renderer from 'react-test-renderer';

import HomePage from './index';

describe('Home page', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<HomePage siteTitle='Default Starter' />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
