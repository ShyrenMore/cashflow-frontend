import React, { useState } from "react";
import TextField from "@mui/material/TextField";
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
    const formdata = new FormData();
    formdata.append("expenditure_title", enteredTitle);
    formdata.append("expenditure_amount", enteredAmount);
    formdata.append("expenditure_remarks", enteredRemark);
    formdata.append("expenditure_date", enteredDate);
    formdata.append("category_name", enteredCategory);
    axios.post("https://cash-flowapp.herokuapp.com/api/add-expenditure/",formdata,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
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
            <label>Title</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              min="2019-01-01"
              max="2022-12-31"
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Remarks</label>
            <TextField
              id="outlined-textarea"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              multiline
              onChange={remarkChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Categories</label>
            <Autocomplete
              disablePortal
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
          <button type="submit">Add Expense</button>
        </div>
      </form>
      <a>Have a receipt, upload and we will handle the rest</a>
    </div>
  );
}
