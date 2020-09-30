import cn from 'classnames';
import { nanoid } from 'nanoid';
import { arrayOf, bool, shape, string } from 'prop-types';
import React from 'react';

import Chip from '../Chip';
import Logo from '../Logo';
import Tag from '../Tag';
import styles from './JobItem.module.scss';

const JobItem = ({ data }) => {
  const {
    company,
    logoUrl,
    new: isNew,
    featured: isFeatured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  } = data;

  const tags = [role, level, ...languages, ...tools];

  return (
    <div className={cn(styles.job, { [styles.jobHighlighted]: isFeatured })}>
      <div className={styles.logo}>
        <Logo src={logoUrl} alt='Photosnap logo' />
      </div>
      <div className={styles.body}>
        <div className={styles.heading}>
          <h2>{company}</h2>
          {isNew && <Chip>New!</Chip>}
          {isFeatured && <Chip color='dark'>Featured</Chip>}
        </div>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href='#' className={styles.position}>
          <h3>{position}</h3>
        </a>
        <div className={styles.details}>
          <span>{postedAt}</span>
          <span>{contract}</span>
          <span>{location}</span>
        </div>
      </div>
      <hr className={styles.hr} />
      <ul className={styles.tagList}>
        {tags.map((label) => (
          <li className={styles.tagListItem} key={nanoid()}>
            <Tag onClick={() => console.log(`clicked ${label}`)}>{label}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );
};

JobItem.propTypes = {
  data: shape({
    company: string.isRequired,
    logoUrl: string.isRequired,
    new: bool,
    featured: bool,
    position: string.isRequired,
    role: string.isRequired,
    level: string.isRequired,
    postedAt: string.isRequired,
    contract: string.isRequired,
    location: string.isRequired,
    languages: arrayOf(string).isRequired,
    tools: arrayOf(string),
  }).isRequired,
};

export default JobItem;
