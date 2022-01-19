import React from 'react'
import { useGetCategoryCountQuery } from '../../Hooks/react-query/dashboard-hooks'
import ChartCard from './ChartCard'
import { Doughnut } from 'react-chartjs-2'
import ChartLegend from './ChartLegend'
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

const DoughnutChart = () => {
    const { data, isLoading } = useGetCategoryCountQuery();
    // console.log(data);
    if (isLoading)
    {
        return <h2>Chart is loading</h2>
    }

    const doughnutLegends = [
        { title: 'Shirts', color: 'bg-blue-500' },
        { title: 'Shoes', color: 'bg-teal-600' },
        { title: 'Bags', color: 'bg-purple-600' },
    ]

    const doughnutOptions = {
        data: {
            datasets: [
                {
                    data: data.category_count_pie.count,
                    backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
                    label: 'Dataset 1',
                },
            ],
            labels: data.category_count_pie.labels,
        },
        options: {
            responsive: true,
            cutoutPercentage: 50,
        },
        legend: {
            display: false,
        },
    }

    return (
        <>
            <ChartCard title="Doughnut">
                <Doughnut {...doughnutOptions} />
                <ChartLegend legends={doughnutLegends} />
            </ChartCard>
        </>
    )

}

export default DoughnutChart;