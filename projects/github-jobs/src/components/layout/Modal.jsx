import { func, node } from 'prop-types';
import { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c }) => ({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    padding: '2.4rem',
    position: 'fixed',
    top: 0,
    width: '100%',
  },

  modal: {
    backgroundColor: c.back,
    borderRadius: '0.6rem',
    width: '100%',
  },
}));

const Modal = ({ onClose = () => {}, children = 'Modal Content' }) => {
  const css = useStyles();
  const overlayRef = useRef(null);

  useEffect(() => {
    const close = ({ target, currentTarget, key }) => {
      if (currentTarget === target || key === 'Escape') onClose();
    };

    const $overlay = overlayRef.current;
    $overlay.addEventListener('click', close);
    document.addEventListener('keydown', close);

    return () => {
      $overlay.removeEventListener('click', close);
      document.removeEventListener('keydown', close);
    };
  }, [onClose]);

  return (
    <div className={css.overlay} ref={overlayRef}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  onClose: func,
  children: node,
};

export default Modal;
