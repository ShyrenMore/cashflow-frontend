import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Paper,
  Link,
  Container,
  Grid,
  FormControl,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import "./AddExpense.css";
import { useNavigate } from "react-router-dom";
import img from "../../assets/expenseImg.svg";
export default function AddExpense(props) {
  const navigate = useNavigate();
  let categories = [
    // { label: "Food" },
    // { label: "Clothing" },
    // { label: "utils" },
  ];
  // let tempCategs = [];
  // let [st_categories, setCategories] = useState([]);
  const get_categs = () => {
    console.log(process.env.REACT_APP_SERVER_BASE_URL);
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/get-categories/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        res.data.categories.map((category) => {
          // console.log(category);
          categories.push({ label: category.category_name });
        });
        // setCategories(tempCategs)
      });
  };

  get_categs();

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
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/add-expenditure/`,
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Expense Added");
      });
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setEnteredRemark("");
    setEnteredCategory("");
  };

  return (
    <Container id="main">
      <Grid
        sx={{ width: "100vw" }}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={6}>
          <img src={img} alt="image" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} id="paper">
            <FormControl id="form">
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} id="new-expense__control">
                  <Typography
                    sx={{ textAlign: "center" }}
                    id="title"
                    variant="h3"
                  >
                    Add Expense
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} id="new-expense__control">
                  <TextField
                    required
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    placeholder="title"
                    value={enteredTitle}
                    onChange={titleChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} md={6} id="new-expense__control">
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
                </Grid>
                <Grid item xs={12} md={6} id="new-expense__control">
                  <TextField
                    id="outlined-basic"
                    required
                    type="date"
                    onChange={dateChangeHandler}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6} id="new-expense__control">
                  <TextField
                    id="outlined-basic"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    multiline
                    onChange={remarkChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} md={6} id="new-expense__control">
                  <Autocomplete
                    disablePortal
                    label="Categories"
                    id="combo-box-demo"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    options={categories}
                    onSelect={categoryChangeHandler}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Label" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} id="new-expense__control">
                  <Button
                    id="submitBtn"
                    variant="contained"
                    color="success"
                    type="submit"
                    onClick={submitHandler}
                  >
                    Add Expense
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
            <Grid
              item
              xs={12}
              md={12}
              id="new-expense__control"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Link
                id="link"
                onClick={() => navigate("/add-expense-img")}
                underline="hover"
              >
                Have a receipt, upload and we will handle the rest
              </Link>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
