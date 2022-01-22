import React from "react";
import ChartCard from "./ChartCard";
import { Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useGetRecentTransactionsQuery } from "../../Hooks/react-query/dashboard-hooks";

const RecentTransactions = () => {
  const { data, isLoading } = useGetRecentTransactionsQuery();
  const navigate = useNavigate();
  // // console.log(data);
  if (isLoading) {
    return <h2>Table is loading</h2>;
  }

  return (
    <ChartCard title="Recent expenditures">
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

export default RecentTransactions;
