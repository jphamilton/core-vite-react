import { Toast } from './Toast';
import { useAppDispatch } from '@/app/hooks';
import { closeToast } from '@/app/appSlice';

import './Toast.css';

type ToastContainerProps = {
  toasts: Toast[];
};

export const ToastContainer = ({toasts}:ToastContainerProps) => {
  const dispatch = useAppDispatch();

  const onClose = (id: string) => {
    dispatch(closeToast(id));
  };

  return (
    <div className='toast-container'>
      {toasts.map((toast, n) => <Toast key={`toast-${n}`} {...toast} onClose={onClose} />)}
    </div>
  );
}