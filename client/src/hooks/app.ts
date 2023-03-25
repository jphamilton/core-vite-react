import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/app/store';

import { toast } from '@/app/appSlice';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useToast = () => {
    const dispatch = useAppDispatch();

    return (message: string, type: ToastType) => {
        dispatch(toast(message, type));
    }
}