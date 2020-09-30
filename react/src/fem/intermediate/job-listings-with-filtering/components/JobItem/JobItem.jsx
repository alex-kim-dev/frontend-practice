import cn from 'classnames';
import { nanoid } from 'nanoid';
import React from 'react';

import logo from '../../images/photosnap.svg';
import Chip from '../Chip';
import Logo from '../Logo';
import Tag from '../Tag';
import styles from './JobItem.module.scss';

const JobItem = () => {
  return (
    <div className={cn(styles.job, styles.jobHighlighted)}>
      <div className={styles.logo}>
        <Logo src={logo} alt='Photosnap logo' />
      </div>
      <div className={styles.body}>
        <div className={styles.heading}>
          <h2>Photosnap</h2>
          <Chip>New!</Chip>
          <Chip color='dark'>Featured</Chip>
        </div>
        <h3 className={styles.position}>Senior Frontend Developer</h3>
        <div className={styles.details}>
          <span>1d ago</span>
          <span>Full Time</span>
          <span>USA only</span>
        </div>
      </div>
      <hr className={styles.hr} />
      <ul className={styles.tagList}>
        {['Frontend', 'Senior', 'HTML', 'CSS', 'JavaScript'].map((label) => (
          <li className={styles.tagListItem} key={nanoid()}>
            <Tag onClick={() => console.log(`clicked ${label}`)}>{label}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobItem;
