import React, { useState } from "react";
import Dropzone from "react-dropzone";
import {
  Button,
  Paper,
  Link,
  Container,
  Box,
  Grid,
  Chip,
  FormControl,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddExpense.css";
import img from "../../assets/ocrImage.svg";
export default function AddExpenseFormWithImg(props) {
  let navigate = useNavigate();
  const nano_id = "9f4d89f1-66cd-4db6-94fe-90d22fa3048c";
  const [uploadFile, setUploadFile] = useState([]);
  let nano = {
    mer_name: "",
    mer_addr: "",
    exp_amt: "",
    exp_date: "",
    cat: [],
  };
  let data_to_send = {
    expenditure_title: "",
    expenditure_amount: "000.000",
    expenditure_remarks: "",
    expenditure_date: "",
    category_name: "",
  };
  const uploadImageHandler = (acceptedFiles) => {
    setUploadFile(acceptedFiles);
    console.log(uploadFile);
  };

  const nanoNetExtractor = async () => {
    var nanoFormData = new FormData();
    nanoFormData.append("file", uploadFile[0]);
    nanoFormData.append("modelId", nano_id);
    axios
      .post(
        `https://app.nanonets.com/api/v2/OCR/Model/${nano_id}/LabelFile/`,
        nanoFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic aXNYSFRBSGE1OVYzbnR3dmRNVTFBa05nSGlhQjVCS3E6`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        response.data.result[0].prediction.map((pred) => {
          if (pred.label === "Total_Amount" || pred.label === "Cash_Tender") {
            nano.exp_amt = pred.ocr_text;
          }

          if (pred.label === "Merchant_Address") {
            nano.mer_addr = pred.ocr_text;
          }

          if (pred.label === "Merchant_Name") {
            nano.mer_name = pred.ocr_text;
          }

          if (pred.label === "Date") {
            nano.exp_date = pred.ocr_text;
          }
        });
        console.log("Nano: ", nano);
        console.log("G Maps extractor Start");
        backendOCRExtractor();
        // googleMapsExtractor();
      });
  };

  const backendOCRExtractor = async () => {
    console.log(uploadFile[0]);
    var formData = new FormData();
    formData.append("exp_pic", uploadFile[0]);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/detect-expenditure/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        console.log("detecExp");
        console.log(response.data);
        let apna_data = response.data.model_extr_data;

        if (apna_data.date.length > 0) {
          data_to_send.expenditure_date = apna_data.date;
        } else {
          data_to_send.expenditure_date = nano.exp_date;
        }

        if (apna_data?.amount) {
          data_to_send.expenditure_amount = apna_data?.amount;
        } else {
          data_to_send.expenditure_amount = nano.exp_amt;
        }

        if (apna_data?.merchant_name.length > 0) {
          data_to_send.expenditure_title = apna_data?.merchant_name.join(",");
        } else {
          data_to_send.expenditure_title = nano.mer_name + nano.mer_addr;
        }

        console.log("data_to_send");
        console.log(data_to_send);

        googleMapsExtractor(data_to_send.expenditure_title);
      });
  };

  const googleMapsExtractor = async (place_search) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${place_search}&key=AIzaSyCoWpakOiniL2Ih_OZKsrOnf59_jT5y8D0`
      )
      .then((response) => {
        console.log(response.data);
        // nano.cat = response.data.results[0].types.join(",");
        if (response.data.status === "ZERO_RESULTS") {
          data_to_send.category_name = "Miscelleaous";
        } else {
          data_to_send.category_name = response.data.results[0].types.join(",");
        }
        console.log("Nano Final : ", nano);
        axios
          .post(
            `${process.env.REACT_APP_SERVER_BASE_URL}/add-expenditure/`,
            data_to_send,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            alert("Expense Added");
          });
      });
  };

  const saveExpenditureHandler = async () => {
    const raw_data = {
      expenditure_title: nano.mer_name,
      expenditure_amount: nano.exp_amt,
      expenditure_remarks: nano.mer_addr,
      expenditure_date: nano.exp_date,
      category_name: nano.cat,
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
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(uploadFile);
    console.log("data sent");
    nanoNetExtractor();
    // backendOCRExtractor();
    // googleMapsExtractor();
    setUploadFile([]);
    // history("/login");
  };

  return (
    <Container id="main">
      <Grid container>
        <Grid item md={8} xs={12}>
          <img src={img} alt="image" id="ocr-img" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid container justifyContent="center" alignItems="center">
            <FormControl id="form">
              <Paper elevation={3} id="paper1">
                <Grid item id="new-expense__control1" xs={12}>
                  <Typography variant="h6" id="ocr-title">
                    Scan/Upload Receipt
                  </Typography>
                </Grid>
                <Grid item xs={12} id="new-expense__control">
                  <Dropzone id="dropzone" onDrop={uploadImageHandler}>
                    {({ getRootProps, getInputProps }) => (
                      <Container id="img-cont">
                        <div id="img-box" {...getRootProps()}>
                          <input {...getInputProps()} />
                          <Button id="uploadBtn">Add Receipt</Button>
                          {uploadFile.length === 0 ? (
                            ""
                          ) : (
                            <Chip id="chip" label={uploadFile[0].name} />
                          )}
                        </div>
                      </Container>
                    )}
                  </Dropzone>
                </Grid>
                <Grid item xs={12} id="new-expense__control2">
                  <Button
                    type="submit"
                    variant="contained"
                    id="Btn"
                    color="success"
                    onClick={submitHandler}
                  >
                    Submit Form
                  </Button>
                </Grid>
                <Grid item xs={12} id="new-expense__control1">
                  <Link
                    onClick={() => navigate("/add-expense")}
                    underline="hover"
                  >
                    Want to add data manually? Click Here
                  </Link>
                </Grid>
              </Paper>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
