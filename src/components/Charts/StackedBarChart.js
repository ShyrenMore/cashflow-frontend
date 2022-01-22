import React, {useState, useEffect} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartCard from './ChartCard';
import { useGetCategoryByMonthQuery } from '../../Hooks/react-query/dashboard-hooks';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const url = `${SERVER_BASE_URL}/get-category-by-month/`;

const StackedBarChart = () => {

    // const { data, isLoading } = useGetCategoryByMonthQuery();
    const [isLoading, setIsLoading] = useState(true)

    const [data, setData] = useState([])
    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                }
            })
            const hehe = await response.json()
            setData(hehe)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            // console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading)
        return <h2>Loading...</h2>

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Month-wise distribution wrt category & amount spent',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labels = ['January', 'February', 'March'];
    const nos1 = [1250, 500, 200]
    const nos2 = [87, 300, 1000]
    const nos3 = [383, 373, 388]

    const tempdata = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: nos1,
                backgroundColor: 'rgb(255, 99, 132)',
                // [12, 48, 78, ]
                // month-wise spending for each category
            },
            {
                label: 'Dataset 2',
                data: nos2,
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'Dataset 3',
                data: nos3,
                backgroundColor: 'rgb(53, 162, 235)',
            },
            {
                label: 'Dataset 4',
                data: [],
                backgroundColor: 'rgb(53, 162, 235)',
            },

            /*
    
            colors = []
            *   categories.map((category) => {
                    label: category.name,
                    data: catdata.map((index)=> arr[index])
                    const col = Math.floor(Math.random()*16777215).toString(16);
                    const col = "#" + col
                    colors.push(col)
            })  
             */
        ],
    };

    // const consoledata = data.month_chart.map(item =>
    // {
    //     ...item, backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16)
    // })

    // // console.log(consoledata);


    let temparr = data.month_chart

    let permarr = temparr.map(v => {
        const col = Math.floor(Math.random() * 16777215).toString(16);
        const actualcol = "#" + col
        // console.log("color: ", actualcol);
        return ({ ...v, backgroundColor: actualcol })
    })

    const chartdata = {
        labels,
        datasets: permarr
    }
    // console.log("temp: ", permarr);
    return <ChartCard>
        <Bar options={options} data={chartdata} />;
    </ChartCard>

};

export default StackedBarChart;
