import aspCoreLogo from '@/assets/aspnet-core.png';
import reactLogo from '@/assets/react.svg';
import viteLogo from '@/assets/vite.svg';

import './Banner.css';

export const Banner = () => {
  return (
    <div className='banner'>
      <div>
        <a href="https://dotnet.microsoft.com/en-us/apps/aspnet" target="_blank">
          <img src={aspCoreLogo} className="logo" alt="ASP.NET Core logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>ASP.NET Core + Vite + React</h1>
    </div>
  );
}