import { NavLink } from 'react-router-dom';

interface Props {
  count: number;
  onClick: (count: number) => void;
}

export const Counter = (props: Props) => {
  const { count, onClick } = props;

  return (
    <>
      <p>
        <NavLink to='/home/telemetry'>Realtime Data</NavLink>
      </p>
      <div className="card">
        <button onClick={() => onClick(count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}