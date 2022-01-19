import React from 'react'
import { CircleProgress } from 'react-gradient-progress'
import ChartCard from './ChartCard'

const PercentChangeInExpenditure = () => {
    return (
        <ChartCard title="% inc since last month">
            <CircleProgress percentage={75}/>
        </ChartCard>
    )
}

export default PercentChangeInExpenditure
