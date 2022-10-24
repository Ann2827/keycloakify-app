import { CSSProperties, MouseEventHandler } from 'react';

export interface ButtonProps {
  className?: string;
  text?: string | number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonTypes;
  /**
   * Inline styles
   */
  style?: CSSProperties;
}

export enum ButtonTypes {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}
