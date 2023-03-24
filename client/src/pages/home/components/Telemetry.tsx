import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTelemetryHub } from '@/hooks/telemetryHub';
import { formatDateTime } from '@/utilities/datetime';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectTelemetry, latestValues, telemetryReceived } from '../reducers/telemetrySlice';

export const Telemetry = () => {
  const data = useAppSelector(selectTelemetry);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // a real world scenario is that telemetry may be coming in at
    // various intervals(every 30 secs, 5 minutes, etc) so we grab
    // the latest values from the server so that the user can see
    // something
    dispatch(latestValues());

    return () => {
      // clean up so we don't display stale data when user comes back
      dispatch(telemetryReceived([]));
    }
  }, []);

  // subscribe to telemetry after we get new incoming data
  useTelemetryHub(!!data);

  return (
    <div>
      <p>
        <NavLink to='/home/counter'>Counter</NavLink>
      </p>
      <h4>Telemetry Data</h4>
      <h4>(updated every 5 sec)</h4>
      <div className='row' style={{justifyContent: 'center'}}>
        {
          !!data.length && <TelemetryTable data={data || []} />
        }
      </div>
      
    </div>
  );

};

const TelemetryTable = (props: { data: TelemetryData[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th align='right'>Sensor</th>
          <th align='right'>Value</th>
          <th>Unit</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((data, i) =>
          <tr key={`telemetry-${i}`}>
            <td>{formatDateTime(data.timestamp)}</td>
            <td align='right'>{data.sensor}</td>
            <td align='right'>{data.value}</td>
            <td>{data.unit}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}