import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Graph({ xAxis, yAxis }) {
    return (
        <LineChart
            xAxis={[{ data: xAxis ? xAxis : [0] }]}
            series={[
                {
                    data: yAxis ? yAxis : [0],
                },
            ]}
            width={500}
            height={300}
        />
    );
}
