import cn from 'classnames';
import React, { FC, forwardRef, MouseEventHandler } from 'react';
import { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, onClick, style, text, type } = props;

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
  };

  const buttonClassName: string = cn(styles.button, className);

  return (
    <button className={buttonClassName} onClick={handleButtonClick} ref={ref} type={type} style={style}>
      {text}
    </button>
  );
});

export default Button;
