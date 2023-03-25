import { useEffect, useState } from 'react';
import { selectLoading } from '@/app/appSlice';
import { selectTelemetry, telemetryReceived } from '@/pages/telemetry/reducers/telemetrySlice';
import { useAppDispatch, useAppSelector, useLoader } from '@/hooks';

import * as API from '@/app/API';

type LatestValueResult = [
    data: TelemetryData[], 
    loading: boolean,
    errors: string[]
];

export const useLatestValues = (): LatestValueResult => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);
    const data = useAppSelector(selectTelemetry);
    const loader = useLoader();
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        async function getLatestValues() {
            
            loader(true);

            const response = await API.latestValues();
            
            loader(false);
            
            if (response.success) {
                dispatch(telemetryReceived(response.result));
            }

            if (response.errors.length) {
                setErrors(response.errors);
            }
        }

        getLatestValues();

        return () => {
            // clean up so we don't display stale data when user comes back
            dispatch(telemetryReceived([]));
        }

    }, []);

    return [data, loading, errors];
}