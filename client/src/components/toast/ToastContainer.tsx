import { Toast } from './Toast';
import { useAppDispatch } from '@/hooks';

import './Toast.css';

type ToastContainerProps = {
  toasts: Toast[];
};

export const ToastContainer = ({toasts}:ToastContainerProps) => {
  const dispatch = useAppDispatch();

  const onClose = (id: string) => {
    // rather import action creator from store, keep it simple
    // and self-contained
    dispatch({
      type: 'app/closeToast',
      payload: id
    });
  };

  return (
    <div className='toast-container'>
      {toasts.map((toast, n) => <Toast key={`toast-${n}`} {...toast} onClose={onClose} />)}
    </div>
  );
}