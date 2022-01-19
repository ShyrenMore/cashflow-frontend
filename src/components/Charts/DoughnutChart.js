import React from 'react'
import { useGetCategoryCountQuery } from '../../Hooks/react-query/dashboard-hooks'
import ChartCard from './ChartCard'
import { Doughnut } from 'react-chartjs-2'
// import ChartLegend from './ChartLegend'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
    const { data, isLoading } = useGetCategoryCountQuery();
    // console.log(data);
    if (isLoading)
    {
        return <h2>Chart is loading</h2>
    }


    const doughnutdata = {
        labels: data.category_count_pie.labels,
        datasets: [
            {
                label: '# of Votes',
                data: data.category_count_pie.count,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <ChartCard title="Category-wise expense distribution">
                <Doughnut data={doughnutdata} />
                {/* <ChartLegend legends={doughnutLegends} /> */}
            </ChartCard>
        </>
    )

}

export default DoughnutChart;