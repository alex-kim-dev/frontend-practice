/* eslint-disable react/jsx-props-no-spreading */

import {
  bool,
  element,
  elementType,
  oneOf,
  oneOfType,
  string,
} from 'prop-types';
import { useContext } from 'react';
import { createUseStyles } from 'react-jss';

import { state } from '../store';

const useStyles = createUseStyles(({ colors: c }) => ({
  button: ({ variant, fullWidth, hasIcon, currentTheme }) => {
    const variantColors = {
      primary: {
        back: c.accent,
        backHover: c.accentAlt,
        text: '#fff',
      },
      secondary: {
        back: c.neutral,
        backHover: c.neutralAlt,
        text: currentTheme === 'dark' ? '#fff' : c.accent,
      },
      neutral: {
        back: 'transparent',
        backHover: c.neutral,
        text: currentTheme === 'dark' ? '#fff' : c.textAlt,
      },
    };

    return {
      backgroundColor: variantColors[variant].back,
      border: 0,
      borderRadius: '0.5rem',
      color: variantColors[variant].text,
      cursor: 'pointer',
      display: 'inline-flex',
      fontSize: '1.6rem',
      fontWeight: 700,
      justifyContent: 'center',
      padding: [
        hasIcon ? '1.4rem' : '1.6rem',
        hasIcon || fullWidth ? '1.4rem' : '2.8rem',
      ],
      textDecoration: 'none',
      transition: 'background-color 0.2s',
      width: fullWidth && '100%',

      '& svg path': {
        fill: variantColors[variant].text,
      },

      '&:hover': {
        backgroundColor: variantColors[variant].backHover,
      },
    };
  },
}));

const Button = ({
  as: Element = 'button',
  variant = 'primary',
  fullWidth = false,
  children,
  ...props
}) => {
  const { theme: currentTheme } = useContext(state);
  const hasIcon = typeof children !== 'string';
  const css = useStyles({ variant, fullWidth, hasIcon, currentTheme });

  return (
    <Element className={css.button} {...props}>
      {children}
    </Element>
  );
};

Button.propTypes = {
  as: elementType,
  variant: oneOf(['primary', 'secondary', 'neutral']),
  fullWidth: bool,
  children: oneOfType([string, element]).isRequired,
};

export default Button;
