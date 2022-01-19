import React from 'react';
import ChartCard from '../components/Charts/ChartCard'
import { useGoalsQuery } from '../Hooks/react-query/goals-hooks'
import { Table } from 'reactstrap'
import './dashboard/Dashboard.css'
/**
 * 
 * "id": 1,
      "goal_title": "goal1",
      "goal_desc": "desc",
      "goal_amount": "122.21",
      "saved_amount": "10.21",
      "goal_complete_date": "2022-02-20",
      "goal_set_on": "2022-02-18",
      "is_completed": false,
      "by_user": 1

 */

const BASE_URL = process.env.REACT_APP_MEDIA_URL;

const Allgoals = () => {
    const { data, isLoading } = useGoalsQuery();
    console.log(data);
    if (isLoading) {
        return <h2>Table is loading</h2>
    }

    return (
        <div className='justify-content-center align-items-center'>
        <ChartCard title="Goals">
            <Table
            >
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Target Amt.
                        </th>
                        <th>
                            Saved Amt.
                        </th>
                        <th>
                            To be completed by 
                        </th>
                        <th>
                            Status 
                        </th>
                    </tr>
                </thead>
                <tbody>


                    {data.goals.map((goal) => (
                        <tr key={goal.goal_title}>
                            <th scope='row'>
                                {goal.goal_title}
                            </th>
                            <td>
                                {goal.goal_amount}
                            </td>
                            <td>
                                {goal.saved_amount}
                            </td>
                            <td>
                                {goal.goal_complete_date}
                            </td>
                            <td>
                                {goal.is_completed ? "Complete" : "Incomplete"}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            </ChartCard>
        </div>
    )
};

export default Allgoals;
