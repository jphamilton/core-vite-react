import { CSSProperties, PropsWithChildren } from 'react';

import './Button.css';

type ButtonProps = PropsWithChildren<{
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
}>

export const Button = (props: ButtonProps) => {
  const { className, disabled, onClick, children, style } = props;
  return (
    <button
      className={className}
      disabled={!!disabled}
      style={{ ...style }}
      onClick={onClick}>
      {children}
    </button>
  )
}