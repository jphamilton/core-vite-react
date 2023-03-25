import { Navigate, NavLink, Routes, Route, Outlet } from 'react-router-dom';
import { selectLoading, selectToasts, selectUser } from '@/app/appSlice';
import { useAppSelector } from '@/hooks';
import { Banner, Loader, ToastContainer } from '@/components';
import { Auth, Home, Telemetry } from '@/pages';

import './App.css'

function App() {
  const isLoading = useAppSelector(selectLoading);
  const toasts = useAppSelector(selectToasts);
  const user = useAppSelector(selectUser);

  return (
    <div className='app-container'>
      <Routes>
        <Route path='/' element={
          <div>
            <Banner />
            <div className='menu'>
              <NavLink to='/home'>Home</NavLink>
              <NavLink to='/telemetry'>Telemetry</NavLink>
              { 
                !user.token && <NavLink to='/auth'>Login</NavLink> 
              }
            </div>
            <div className='page-container'>
              <Outlet />
            </div>
          </div>}
        >
          <Route index element={<Navigate to='/home' />} />
          <Route path='home/*' element={<Home />} />
          <Route path='telemetry/*' element={<Telemetry />} />
          <Route path='auth/*' element={<Auth />} />
        </Route>
      </Routes>
      <ToastContainer toasts={toasts}/>
      <Loader show={isLoading} overlay={true} />
    </div>
  )
}

export default App;

