import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import "./AddExpense.css";
export default function AddExpense(props) {
  const categories = [
    { label: "Food" },
    { label: "Clothing" },
    { label: "utils" },
  ];

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredRemark, setEnteredRemark] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };
  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
  };
  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
  };
  const remarkChangeHandler = (e) => {
    setEnteredRemark(e.target.value);
  };
  const categoryChangeHandler = (e) => {
    setEnteredCategory(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const raw_data = {
      expenditure_title: enteredTitle,
      expenditure_amount: enteredAmount,
      expenditure_remarks: enteredRemark,
      expenditure_date: enteredDate,
      category_name: enteredCategory,
    };
    axios
      .post("http://127.0.0.1:8000/api/add-expenditure/", raw_data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setEnteredRemark("");
    setEnteredCategory("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <TextField
              required
              id="outlined-basic"
              label="Title"
              variant="outlined"
              placeholder="title"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <TextField
              required
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              type="number"
              placeholder="0.00"
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <TextField
              required
              type="date"
              onChange={dateChangeHandler}
              variant="outlined"
            />
          </div>
          <div className="new-expense__control">
            <TextField
              id="outlined-textarea"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              multiline
              onChange={remarkChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            {/* <label>Categories</label> */}
            <Autocomplete
              disablePortal
              label="Categories"
              id="combo-box-demo"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={categories}
              onSelect={categoryChangeHandler}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Label" />}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <Button variant="contained" color="success" type="submit">
            Add Expense
          </Button>
        </div>
      </form>
      <a>Have a receipt, upload and we will handle the rest</a>
    </div>
  );
}
