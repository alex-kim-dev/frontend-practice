import React from 'react';
import renderer from 'react-test-renderer';

import Tag from './Tag';

describe('Tag', () => {
  const mock = jest.fn();
  const tagName = 'tagName';

  it('renders correctly', () => {
    const tree = renderer.create(<Tag>{tagName}</Tag>);
    const json = tree.toJSON();
    const { root } = tree;

    expect(json).toMatchSnapshot();
    expect(root.findByProps({ className: 'tag' }).children).toEqual([tagName]);
  });

  it('renders correctly with onDelete', () => {
    const tree = renderer.create(<Tag onDelete={mock}>{tagName}</Tag>);
    const json = tree.toJSON();
    const { root } = tree;

    expect(json).toMatchSnapshot();
    expect(
      root.findByProps({ className: 'delete btn' }).props['aria-label'],
    ).toBe(`Remove ${tagName} tag`);
  });

  it('renders correctly with onClick', () => {
    const tree = renderer.create(<Tag onClick={mock}>{tagName}</Tag>);
    const json = tree.toJSON();
    const { root } = tree;

    expect(json).toMatchSnapshot();
    expect(root.findByProps({ className: 'tag btn' }).children).toEqual([
      tagName,
    ]);
  });
});
