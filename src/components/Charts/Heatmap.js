import React from 'react'
import ChartCard from './ChartCard'
import { useHeatmapInputQuery} from '../../Hooks/react-query/dashboard-hooks'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

// { date: '2022-01-01', count: 12 },
                    // { date: '2022-01-22', count: 122 },
                    // { date: '2022-01-30', count: 38 },
const Heatmap = () => {

    const { data, isLoading } = useHeatmapInputQuery();
    console.log("Heatmap data", data);
    if (isLoading) {
        return <h2>Loading...</h2>
    }
    return (
        <ChartCard title="last 6 month's expense">
            <CalendarHeatmap
                startDate={new Date('2022-01-01')}
                endDate={new Date('2022-06-30')}
                values={
                    data.heatmap
                }
            />
        </ChartCard>
    )
}

export default Heatmap;
