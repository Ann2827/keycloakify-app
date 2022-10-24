import React, { PropsWithChildren, useState } from 'react';
import { InputProps } from './Input.types';
import styles from './Input.module.scss';
import classNames from 'classnames';

const Input: React.FC<InputProps> = (props: PropsWithChildren<InputProps>) => {
  const {
    tabIndex,
    name,
    type,
    value,
    onChange,
    placeholder,
    disabled,
    onFocus = () => {},
    onBlur = () => {},
    id = '',
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    onFocus?.(event);
    setIsFocused(true);
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    onBlur?.(event);
    setIsFocused(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(event.currentTarget.value);
  };

  const rootClass = classNames(styles.root);
  const placeholderClass = classNames(styles.placeholder, {
    [styles.focus]: isFocused || value,
  });
  const inputClass = classNames(styles.input);

  const otherProps: {
    tabIndex?: number;
    name?: string;
    id?: string;
    value?: InputProps['value'];
    onChange?: InputProps['onChange'];
  } = {};
  if (id) otherProps.id = id;
  if (name) otherProps.name = name;
  if (tabIndex) otherProps.tabIndex = tabIndex;
  if (value) otherProps.value = value;
  if (onChange) otherProps.onChange = onChange;

  return (
    <div className={rootClass}>
      {placeholder && <span className={placeholderClass}>{placeholder}</span>}
      <input
        {...otherProps}
        className={inputClass}
        type={type}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};
Input.defaultProps = {
  placeholder: '',
  disabled: false,
};

export default React.memo(Input);
