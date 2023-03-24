import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { increment, selectCount } from './reducers/counterSlice';
import { Button } from '@/components';

export const Home = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(increment());
  }

  return (
    <div className='home'>
      <Button onClick={onClick}>Count is {count}</Button>
    </div>
  );
}
