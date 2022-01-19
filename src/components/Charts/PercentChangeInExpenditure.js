import React from 'react'
import { CircleProgress } from 'react-gradient-progress'
import ChartCard from './ChartCard'
import { useGetCategoryByMonthQuery } from '../../Hooks/react-query/dashboard-hooks'

const PercentChangeInExpenditure = () => {

    const { data, isLoading } = useGetCategoryByMonthQuery();

    const d = new Date();
    let month = d.getMonth();
    // console.log("% data", data);
    let prev = month-1;
    if (month === 0)
        prev = 11;

    
    if (isLoading) {
        return <h2>Loading...</h2>
    }

    // now you total_curr = cat1[idx] + cat2[idx] +..
    // total_prev_month = cat1[prev] + cat2[prev]

    let curr_sum = 0;
    let prev_sum = 0;

    data.month_chart.map((category) => {
        curr_sum += category.data[month];
        prev_sum += category.data[prev];
    })

    // console.log("Tots: ", curr_sum, prev_sum);

    let change = 0;
    if(prev_sum!=0)
        change = ((curr_sum - prev_sum) / prev_sum * 100);
    else 
        change = ((curr_sum - prev_sum) * 100);
    
    // console.log("change: ", change);
    

    if(change>=0)
    {
        return (
            <ChartCard title="% increase since last month">
                <CircleProgress percentage={Math.floor(change)}/>
            </ChartCard>
        )
    }

    return (
        <ChartCard title="% decrease since last month">
            <CircleProgress percentage={Math.floor(change)} />
        </ChartCard>
    )
}

export default PercentChangeInExpenditure
