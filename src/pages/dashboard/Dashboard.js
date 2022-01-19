import React from 'react'
import DoughnutChart from '../../components/Charts/DoughnutChart';
import './Dashboard.css'
import { Chart, ArcElement } from 'chart.js'
import Heatmap from '../../components/Charts/Heatmap';
import RecentTransactions from '../../components/Charts/RecentTransactions';
import PercentChangeInExpenditure from '../../components/Charts/PercentChangeInExpenditure';
Chart.register(ArcElement);

// pass two arrays as props to legend component


const Dashboard = () => {
    
    return (
        <>
            <div className="justify-content-center align-items-center">
                <div className="row">
                    <div className="col-md-4 col-sm-12 col-xs-12 col-12 mx-2 my-2">
                        <DoughnutChart />
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12 col-12 mx-2 my-2">
                        <Heatmap />
                    </div> 
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-6 col-sm-12 col-xs-12 col-12 mx-2 my-2">
                        <RecentTransactions />
                    </div>
                    
                    <div className="col-md-4 col-sm-12 col-xs-12 col-12 mx-2 my-2 ">
                        <PercentChangeInExpenditure />
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Dashboard;
