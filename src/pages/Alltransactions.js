import React from "react";
import ChartCard from "../components/Charts/ChartCard";
import { useGetAllTransacQuery } from "../Hooks/react-query/gettransaction-hooks";
import { Table } from "reactstrap";
import "./dashboard/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Alltransactions = () => {
  const { data, isLoading } = useGetAllTransacQuery();
  const navigate = useNavigate();
  // // console.log(data);
  if (isLoading) {
    return <h2>Table is loading</h2>;
  }
  return (
    <ChartCard title="All transactions">
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount in Rs</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data.expenditures.map((expense) => (
            <tr key={expense.expenditure_title}>
              <th scope="row">{expense.expenditure_title}</th>
              <td>{expense.expenditure_amount}</td>
              <td>{expense.expenditure_date}</td>
              <td>{expense.belongs_to_category.category_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="contained" onClick={() => navigate("/add-expense-img")}>
        Add Expense
      </Button>
    </ChartCard>
  );
};

export default Alltransactions;
