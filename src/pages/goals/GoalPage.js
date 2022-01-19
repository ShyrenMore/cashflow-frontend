import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  TextField,
} from "@mui/material";
import axios from "axios";
export default function GoalPage() {
  const date = new Date();
  let day = date.getDate().toString();
  let month = date.getMonth().toString();
  let yr = date.getFullYear().toString();
  const date_fin = yr + "-" + month + "-" + day;
  const [goalTitle, setgoalTitle] = useState("");
  const [goalDesc, setgoalDesc] = useState("");
  const [goalAmt, setgoalAmt] = useState("");
  const [savedAmt, setSavedAmt] = useState("");
  const [goalSetDate, setgoalSetDate] = useState('');
  const [goalCompleteDate, setgoalCompleteDate] = useState("");

  const titleHandler = (e) => {
    setgoalTitle(e.target.value);
  };
  const descHandler = (e) => {
    setgoalDesc(e.target.value);
  };
  const goalAmtHandler = (e) => {
    setgoalAmt(e.target.value);
  };
  const savedAmtHandler = (e) => {
    setSavedAmt(e.target.value);
  };
   const setDateHandler = (e) => {
     setgoalSetDate(e.target.value);
   };
  const completeDateHandler = (e) => {
    setgoalCompleteDate(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const raw_data = {
      goal_title: goalTitle,
      goal_desc: goalDesc,
      goal_amount: goalAmt,
      saved_amount: savedAmt,
      goal_complete_date: goalCompleteDate,
      goal_set_on: goalSetDate,
    };
    console.log(raw_data);
    axios
      .post("http://127.0.0.1:8000/api/add-goal/", raw_data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
    setSavedAmt("");
    setgoalAmt("");
    setgoalCompleteDate("");
    setgoalDesc("");
    setgoalTitle("");
    setgoalSetDate("");
  };
  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyItems="center" alignItems="center">
          <Grid item md={6} xs={12}>
            <TextField
              required
              id="outlined-basic"
              label="Goal Title"
              variant="outlined"
              placeholder="title"
              value={goalTitle}
              onChange={titleHandler}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              label="Description"
              multiline
              value={goalDesc}
              placeholder="description"
              maxRows={2}
              onChange={descHandler}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              label="Goal Amount"
              type="number"
              value={goalAmt}
              onChange={goalAmtHandler}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              label="Saved Amount"
              type="number"
              value={savedAmt}
              onChange={savedAmtHandler}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              type="date"
              value={goalCompleteDate}
              onChange={completeDateHandler}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              type="date"
              value={goalSetDate}
              onChange={setDateHandler}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" color="success" variant="contained">
              Add Goal
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
        </Grid>
      </Box>
    </Container>
  );
}