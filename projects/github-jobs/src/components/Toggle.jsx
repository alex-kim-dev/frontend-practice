import { bool, func, string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c }) => ({
  wrapper: {
    alignItems: 'center',
    display: 'inline-flex',

    '& > * + *': {
      marginLeft: '1.6rem',
    },
  },

  toggle: {
    backgroundColor: '#fff',
    borderRadius: '1.2rem',
    cursor: 'pointer',
    display: 'block',
    height: '2.4rem',
    padding: '0.5rem',
    width: '4.8rem',

    '& :checked + span': {
      marginLeft: '2.4rem',
    },
  },

  knob: {
    backgroundColor: c.accent,
    borderRadius: '50%',
    display: 'block',
    height: '1.4rem',
    transition: 'margin 0.25s',
    width: '1.4rem',
  },
}));

const Toggle = ({
  label,
  checked = false,
  onChange = () => {},
  iconLeft = '',
  iconRight = '',
}) => {
  const css = useStyles({ iconLeft, iconRight });

  return (
    <div className={css.wrapper}>
      {iconLeft && <img src={iconLeft} alt='' aria-hidden='true' />}
      <label>
        <span className='sr-only'>{label}</span>
        <span className={css.toggle}>
          <input
            className='sr-only'
            type='checkbox'
            onChange={onChange}
            checked={checked}
          />
          <span className={css.knob} />
        </span>
      </label>
      {iconRight && <img src={iconRight} alt='' aria-hidden='true' />}
    </div>
  );
};

Toggle.propTypes = {
  label: string.isRequired,
  checked: bool,
  onChange: func,
  iconLeft: string,
  iconRight: string,
};

export default Toggle;
