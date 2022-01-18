import React from 'react'
import ChartCard from './ChartCard'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = () => {
    return (
        <ChartCard title="last 6 month's expense">
            <CalendarHeatmap
                startDate={new Date('2022-01-01')}
                endDate={new Date('2022-06-30')}
                values={[
                    { date: '2022-01-01', count: 12 },
                    { date: '2022-01-22', count: 122 },
                    { date: '2022-01-30', count: 38 },
                    // ...and so on
                ]}
            />
        </ChartCard>
    )
}

export default Heatmap;
