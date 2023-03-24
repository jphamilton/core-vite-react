import { ChangeEvent, useState } from 'react';

import './Input.css';

interface InputProps {
  type?: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void
  /**
   * If true, updates store on every keystroke. Otherwise waits until onblur
   */
  immediate?: boolean;
};

export const Input = (props: InputProps) => {
  const { immediate, placeholder, type } = props;
  const [value, setValue] = useState(props.value || '');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (immediate) {
      props.onChange(e.target.value);
    }
    setValue(e.target.value);
  };

  const onBlur = () => {
    if (!!value.length && value !== props.value && !immediate) {
      props.onChange(value);
    }
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      autoComplete={type === 'password' ? 'one-time-code' : ''}
      onChange={onChange} />
  );
}