import { Navigate, Routes, Route, Outlet } from 'react-router-dom';

import { Home } from './pages';

import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={
        <div>
          <Outlet />
        </div>}
      >
        <Route index element={<Navigate to='/home' />} />
        <Route path='home/*' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App;

