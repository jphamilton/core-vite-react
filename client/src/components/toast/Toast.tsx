import classnames from 'classnames';

interface ToastProps extends Partial<Toast> {
  onClose: (id: string) => void;
}

export const Toast = (props: ToastProps) => {
  const { id = '', message, type = 'success', duration = 10, onClose } = props;

  const className = classnames('toast', {
    'info': type === 'info',
    'success': type === 'success',
    'error': type === 'error',
    'warning': type === 'warning',
  });

  setTimeout(() => {
    onClose(id);
  }, duration * 1000);

  return (
    <div className={className} onClick={() => onClose(id)}>
      <span className='toast-message'>{message}</span>
    </div>
  )
}