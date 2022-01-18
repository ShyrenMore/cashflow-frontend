import React from 'react'
import DoughnutChart from '../../components/Charts/DoughnutChart';
import './Dashboard.css'
import { Chart, ArcElement } from 'chart.js'
import Heatmap from '../../components/Charts/Heatmap';
Chart.register(ArcElement);

// pass two arrays as props to legend component


const Dashboard = () => {
    
    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div className="col-md-4 col-sm-12 mx-2 my-2">
                    <DoughnutChart/>
                </div>   
                <div className="col-md-4 col-sm-12 mx-2 my-2">
                    <Heatmap/>
                </div>   
            </div>
        </>
    )
}

export default Dashboard;
