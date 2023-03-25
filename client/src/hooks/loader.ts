import { loading } from '@/app/appSlice';
import { useAppDispatch } from '@/hooks';

export const useLoader = () => {
    const dispatch = useAppDispatch();

    return (isLoading: boolean) => {
        dispatch(loading(isLoading));
    }
}