import { ChangeEventHandler, FocusEvent } from 'react';

export interface InputProps {
  id?: string,
  type: 'text',
  name?: string,
  value?: string,
  tabIndex?: number,
  onChange?: ChangeEventHandler<HTMLInputElement>,
  placeholder?: string,
  disabled?: boolean,
  onFocus?(event: FocusEvent<HTMLInputElement>): void,
  onBlur?(event: FocusEvent<HTMLInputElement>): void;
}
