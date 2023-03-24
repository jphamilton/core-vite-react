import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { Button, Input } from '@/components';

import {
  selectRegistration, updateRegistration
} from './reducers/authSlice';

export const Register = () => {
  const dispatch = useAppDispatch();
  const registration = useAppSelector(selectRegistration);
  const { email, password, confirm } = registration;

  const isValid = password.length > 1 && password === confirm;

  useEffect(() => {
    return () => {
      dispatch(updateRegistration({ email: '', password: '', confirm: '' }));
    }
  }, []);

  const onEmailChanged = (value: string) => {
    dispatch(updateRegistration({email: value}));
  }

  const onPasswordChanged = (value: string) => {
    dispatch(updateRegistration({ password: value }));
  }

  const onConfirmChanged = (value: string) => {
    dispatch(updateRegistration({ confirm: value }));
  }

  const onSubmit = () => {
    console.log('clicking submit with', email, password, confirm);
  }

  return (
    <>
      <h2>Register</h2>
      <div className='form-container'>
        <div>
          <Input
            placeholder='Email'
            value={email}
            immediate={ true }
            onChange={onEmailChanged}
          />
        </div>
        <div>
          <Input
            placeholder='Password'
            value={password}
            type='password'
            immediate={ true }
            onChange={onPasswordChanged}
          />
        </div>
        <div>
          <Input
            placeholder='Confirm Password'
            value={confirm}
            type='password'
            immediate={ true }
            onChange={onConfirmChanged}
          />
        </div>
        <Button
          className='submit'
          disabled={!isValid}
          onClick={onSubmit}>Submit</Button>
      </div>
      
      <div className='row' style={{justifyContent: 'flex-end'}}>
        <NavLink to='/auth/login'>Cancel</NavLink>
      </div>
    </>
  );
}