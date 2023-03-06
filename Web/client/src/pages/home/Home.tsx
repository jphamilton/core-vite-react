import { useState } from 'react';
import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { ProjectDetails } from './components/ProjectDetails';
import { Counter } from './components/Counter';
import { Telemetry } from './components/Telemetry';

import './Home.css';

export const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="Home">
    
      <ProjectDetails />

      <Routes>
        <Route path='/' element={<Outlet />}>
          <Route index element={<Navigate to='/home/counter' />} />
          <Route path='counter' element={
            <Counter count={count} onClick={((count) => setCount(count))} />
          } />
          <Route path='telemetry' element={<Telemetry />} />
        </Route>
      </Routes>

    </div>
  );
}