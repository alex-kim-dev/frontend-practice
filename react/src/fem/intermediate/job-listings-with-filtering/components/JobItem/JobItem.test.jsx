import React from 'react';
import renderer from 'react-test-renderer';

import JobItem from './JobItem';

describe('JobItem', () => {
  // const mock = jest.fn();

  it('renders correctly', () => {
    const tree = renderer.create(<JobItem />);
    const json = tree.toJSON();
    // const { root } = tree;

    expect(json).toMatchSnapshot();
    // expect(root.findByProps({ className: 'tag' }).children).toEqual([tagName]);
  });
});
