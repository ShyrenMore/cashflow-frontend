import React from 'react'
import { useNavigate } from "react-router-dom"
import DoughnutChart from '../../components/Charts/DoughnutChart';
import { Chart, ArcElement } from 'chart.js'
import Heatmap from '../../components/Charts/Heatmap';
import RecentTransactions from '../../components/Charts/RecentTransactions';
import PercentChangeInExpenditure from '../../components/Charts/PercentChangeInExpenditure';
import StackedBarChart from '../../components/Charts/StackedBarChart';
import { Button } from '@mui/material';
Chart.register(ArcElement);

// pass two arrays as props to legend component


const Analytics = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="justify-content-center align-items-center">
                {/* <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-4 col-sm-12 col-xs-12 col-12 mx-2 my-2 ">
                        <PercentChangeInExpenditure />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12 col-12 mx-2 my-2">
                        <RecentTransactions />
                    </div>
                    
                    
                </div> */}
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-4 col-sm-12 col-xs-12 col-12 mx-2 my-2">
                        <DoughnutChart />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12 col-12 mx-2 my-5">
                        <StackedBarChart />
                    </div>

                </div>
                
                <div className="row d-flex justify-content-center align-items-center">
                    
                    <div className="col-md-9 col-sm-12 col-xs-12 col-12 mx-2 my-2">
                        <Heatmap />
                    </div>

                    
                </div>
                
            </div>
        </>
    )
}

export default Analytics;
