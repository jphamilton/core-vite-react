import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { Button, Input } from '@/components';

import {
  selectLogin, updateLogin
} from './reducers/authSlice';

export const Login = () => {
  const dispatch = useAppDispatch();
  const login = useAppSelector(selectLogin);
  const { email, password } = login;
  const isValid = email.length > 1 && password.length > 1;

  useEffect(() => {
    return () => {
      dispatch(updateLogin({ email: '', password: '' }));
    }
  }, []);

  const onEmailChanged = (value: string) => {
    dispatch(updateLogin({ email: value }));
  }

  const onPasswordChanged = (value: string) => {
    dispatch(updateLogin({ password: value }));
  }

  const onSubmit = () => {

  }

  return (
    <>
      <h2>Login</h2>
      <div className='form-container'>
        <div>
          <Input
            placeholder='Email'
            value={email}
            immediate={true}
            onChange={onEmailChanged}
          />
        </div>
        <div>
          <Input
            placeholder='Password'
            value={password}
            type='password'
            immediate={true}
            onChange={onPasswordChanged}
          />
        </div>
        <Button
          className='submit'
          disabled={!isValid}
          onClick={onSubmit}>Login</Button>
      </div>

      <div className='row' style={{ justifyContent: 'flex-end' }}>
        <NavLink to='/auth/register'>Register</NavLink>
      </div>
    </>
  );
}