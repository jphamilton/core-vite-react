import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useToast } from '@/hooks';
import { registered} from '@/app/appSlice';
import { Button, Input } from '@/components';
import * as API from '@/app/API';

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const isValid = !!email?.length && !!password?.length && password === confirm; 
  
  const onSubmit = async () => {
    const response = await API.register(email, userName, password);
    
    if (response.success) {
      // a litty dispatchy
      toast('Registration complete!', 'success'); 
      dispatch(registered(true));
      navigate('/auth/login');
    } else {
      response.errors.forEach(error => {
        toast(error, 'error'); 
      });
    }
  };

  return (
    <>
      <h2>Register</h2>
      <div className='form-container'>
        <div>
          <Input
            placeholder='Email'
            value={email}
            immediate={ true }
            onChange={setEmail}
          />
        </div>
        <div>
          <Input
            placeholder='Username'
            value={email}
            immediate={ true }
            onChange={setUserName}
          />
        </div>
        <div>
          <Input
            placeholder='Password'
            value={password}
            type='password'
            immediate={ true }
            onChange={setPassword}
          />
        </div>
        <div>
          <Input
            placeholder='Confirm Password'
            value={confirm}
            type='password'
            immediate={ true }
            onChange={setConfirm}
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