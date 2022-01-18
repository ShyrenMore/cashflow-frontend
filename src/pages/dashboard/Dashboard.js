import React from 'react'
import DoughnutChart from '../../components/Charts/DoughnutChart';
import './Dashboard.css'
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

// pass two arrays as props to legend component


const Dashboard = () => {
    
    return (
        <>
            <div className="d-flex">
                <div className="col-md-4 col-sm-12">
                    <DoughnutChart/>
                </div>   
            </div>
        </>
    )
}

export default Dashboard;
