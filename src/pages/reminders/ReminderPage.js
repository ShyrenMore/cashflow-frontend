import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReminderPage.css";
import img from "../../assets/remImg.svg";
import Dropzone from "react-dropzone";
import {
  Button,
  Box,
  Chip,
  Typography,
  FormControl,
  Grid,
  Paper,
  Container,
  TextField,
} from "@mui/material";
import { useGetReminderQuery } from "../../Hooks/react-query/reminder-goals-hooks";
import { useNavigate } from "react-router-dom";
import ReminderCmp from "./reminderComponent/ReminderCmp";

export default function ReminderPage() {
  const navigate = useNavigate();
  // const { data, isLoading } = useGetReminderQuery();
  // console.log("Data : ", data);
  const [loading, setLoading] = useState(true);
  const [data_, setData] = useState([]);
  const [remTitle, setRemTitle] = useState("");
  const [remDesc, setRemDesc] = useState("");
  const [remAmt, setRemAmt] = useState("");
  const [remDueDate, setRemDueDate] = useState("");
  const [temp, setTemp] = useState(0);
  const [remPic, setRemPic] = useState([]);
  const url = ` http://127.0.0.1:8000/api/get-reminders/`;
  const [isLoading, setIsLoading] = useState(true);
  const [tempData, setTempData] = useState([]);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const hehe = await response.json();
      setTempData(hehe);
      setIsLoading(false);
      console.log("hehe :", hehe);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const remindersData = async () => {
    axios
      .get(`http://127.0.0.1:8000/api/get-reminders/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        setData(res.data);
        // setTemp(1);
        setLoading(false);
        console.log("Data_ : ", data_);
        return res.data;
      })
      .catch((err) => {
        console.log("Error: ", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    console.log("Inside use effect");

    let res_data = remindersData();
    console.log("res_data : ", res_data);
  }, []);

  const titleHandler = (e) => {
    setRemTitle(e.target.value);
  };
  const descHandler = (e) => {
    setRemDesc(e.target.value);
  };
  const amtHandler = (e) => {
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
    axios
      .post(`http://127.0.0.1:8000/api/add-reminder/`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
      });
    setRemTitle("");
    setRemDesc("");
    setRemAmt("");
    setRemDueDate("");
    setRemPic([]);
    // remindersData();
  };

  if (isLoading) {
    return <h2>Loading......</h2>;
  }

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} md={7}>
          <img src={img} id="img" alt="image"></img>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} id="paper1">
            <FormControl method="post" id="form">
              <Grid
                container
                spacing={3}
                justifyItems="center"
                alignItems="center"
              >
                <Grid item xs={12} id="title-box">
                  <Typography id="title" variant="h3">
                    Add Reminder
                  </Typography>
                </Grid>
                <Grid id="ai" item md={6} xs={12}>
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
                <Grid item id="ai" md={6} xs={12}>
                  <TextField
                    required
                    label="Amount"
                    type="number"
                    value={remAmt}
                    onChange={amtHandler}
                    variant="outlined"
                  />
                </Grid>
                <Grid item id="ai" md={6} xs={12}>
                  <TextField
                    required
                    label="Description"
                    multiline
                    maxRows={2}
                    onChange={descHandler}
                  />
                </Grid>
                <Grid item md={6} id="ai" xs={12}>
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
                          <Button id="upldBtn" variant="contained">
                            Add Image
                          </Button>
                          {remPic.length === 0 ? (
                            ""
                          ) : (
                            <Chip id="chip" label={remPic[0].name} />
                          )}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    id="sbmtBtn"
                    type="submit"
                    color="success"
                    variant="contained"
                  >
                    Add Reminder
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
// "id": 1,
//       "goal_title": "goal1",
//       "goal_desc": "desc",
//       "goal_amount": "122.21",
//       "saved_amount": "10.21",
//       "goal_complete_date": "2022-02-20",
//       "goal_set_on": "2022-02-18",
//       "is_completed": false,
//       "by_user": 1
