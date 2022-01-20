import React from "react";
import ChartCard from "../components/Charts/ChartCard";
import { useRemindersQuery } from "../Hooks/react-query/reminder-hooks";
import { Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./dashboard/Dashboard.css";
/**
 * 
 * {
      "id": 1,
      "reminder_title": "test1",
      "reminder_desc": "test",
      "reminder_amount": "122.00",
      "reminder_due_date": "2022-01-20",
      "is_completed": false,
      "pic_of_bill": "/media/ReminderBills/varun/WhatsApp_Image_2022-01-15_at_7.30.53_PM.jpeg",
      "by_user": 1
    },
 */

const BASE_URL = process.env.REACT_APP_MEDIA_URL;

const AllReminders = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useRemindersQuery();
  console.log(data);
  if (isLoading) {
    return <h2>Table is loading</h2>;
  }

  return (
    <ChartCard title="Reminders">
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount in Rs</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Pic of bill</th>
          </tr>
        </thead>
        <tbody>
          {data.reminders.map((reminder) => (
            <tr key={reminder.reminder_title}>
              <th scope="row">{reminder.reminder_title}</th>
              <td>{reminder.reminder_amount}</td>
              <td>{reminder.reminder_due_date}</td>
              <td>{reminder.is_completed ? "Complete" : "Incomplete"}</td>
              <td>
                <a href={`http://127.0.0.1:8000${reminder.pic_of_bill}`}>
                  <img
                    src={`http://127.0.0.1:8000${reminder.pic_of_bill}`}
                    alt=""
                    srcset=""
                    width={80}
                    height={80}
                  />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        variant="contained"
        onClick={() => navigate("/add-reminder")}
      >
        Add Reminder
      </Button>
    </ChartCard>
  );
};

export default AllReminders;
