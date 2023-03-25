import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch, useToast } from '@/hooks';
import { selectRegistered, loggedIn } from '@/app/appSlice';
import * as API from '@/app/API';
import { Button, Input } from '@/components';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registered = useAppSelector(selectRegistered);
  
  const isValid = !!email && email.length > 1 && !!password && password.length > 1;

  const onSubmit = async () => {
    const response = await API.login(email, password);
    
    if (response.success) {
      dispatch(loggedIn(response.result!));
      navigate('/home');
    } else {
      response.errors.forEach(error => {
        toast(error, 'error'); 
      });
    }
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
            onChange={setEmail}
          />
        </div>
        <div>
          <Input
            placeholder='Password'
            value={password}
            type='password'
            immediate={true}
            onChange={setPassword}
          />
        </div>
        <Button
          className='submit'
          disabled={!isValid}
          onClick={onSubmit}>Login</Button>
      </div>

      {!registered && 
        <div className='row' style={{ justifyContent: 'flex-end' }}>
          <NavLink to='/auth/register'>Register</NavLink>
        </div>
      }
    </>
  );
}