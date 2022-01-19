import React, { useState } from "react";
import axios from "axios";
import "./ReminderPage.css";
import { styled } from "@mui/material/styles";
import Dropzone from "react-dropzone";
import {
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ReminderPage() {
  
  const [remTitle, setRemTitle] = useState("");
  const [remDesc, setRemDesc] = useState("");
  const [remAmt, setRemAmt] = useState("");
  const [remDueDate, setRemDueDate] = useState("");
  const [remPic, setRemPic] = useState([]);

  const titleHandler = (e) => {
    console.log(e.target.value);
    setRemTitle(e.target.value);
  };
  const descHandler = (e) => {
    setRemDesc(e.target.value);
  };
  const amtHandler = (e) => {
    console.log(e.target.value);
    setRemAmt(e.target.value);
  };
  const duedateHandler = (e) => {
    setRemDueDate(e.target.value);
  };
  const picHandler = (files) => {
    setRemPic(files);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("reminder_title", remTitle);
    formdata.append("reminder_desc", remDesc);
    formdata.append("reminder_amount", remAmt);
    formdata.append("reminder_due_date", remDueDate);
    formdata.append("pic_of_bill", remPic[0]);
    console.log(formdata);
    axios.post("https://cash-flowapp.herokuapp.com/api/add-reminder/", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
    setRemTitle("");
    setRemDesc("");
    setRemAmt("");
    setRemDueDate("");
    setRemPic([]);
  };

  return (
    <Container maxWidth="lg">
      <form method="post" onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item md={6} xs={12}>
            <TextField
              required
              id="outlined-basic"
              label="Title"
              variant="outlined"
              placeholder="title"
              value={remTitle}
              onChange={titleHandler}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              label="Amount"
              type="number"
              value={remAmt}
              onChange={amtHandler}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              label="Description"
              multiline
              maxRows={2}
              onChange={descHandler}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              type="date"
              onChange={duedateHandler}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Dropzone onDrop={picHandler}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Button variant="contained">Add Receipt</Button>
                    {remPic.length === 0 ? (
                      "Upload receipt"
                    ) : (
                      <p>{remPic[0].name}</p>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" color="success" variant="contained">
              Add Reminder
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container spacing={2}></Grid>
    </Container>
  );
}
