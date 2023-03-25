import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';

export const Auth = () => {
  return (
    <Routes>
      <Route path='/' element={
        <div className='page-container'>
          <Outlet />
        </div>
      }>
        <Route index element={<Navigate to='/auth/login' />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  );
}

