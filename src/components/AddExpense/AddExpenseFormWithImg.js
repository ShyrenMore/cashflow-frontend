import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
let utf8 = require('utf8');
let res = utf8.encode("isXHTAHa59V3ntwvdMU1AkNgHiaB5BKq");
console.log(res);
export default function AddExpenseFormWithImg(props) {
  let history = useNavigate();
  const nano_id = "9f4d89f1-66cd-4db6-94fe-90d22fa3048c";
  const [uploadFile, setUploadFile] = useState([]);

  const uploadImageHandler = (acceptedFiles) => {
    setUploadFile(acceptedFiles);
    console.log(uploadFile);
  };

  const nanoNetExtractor = async () => {
    console.log("Basic ");
    console.log(utf8.encode("isXHTAHa59V3ntwvdMU1AkNgHiaB5BKq"));
    var formdata = new FormData();
    formdata.append("file", uploadFile[0]);
    formdata.append("modelId", nano_id);
    const nano_response = await fetch(
      `https://app.nanonets.com/api/v2/OCR/Model/${nano_id}/LabelFile/`,
      {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Basic ${utf8.encode(
            "isXHTAHa59V3ntwvdMU1AkNgHiaB5BKq"
          )}`,
        },
        body: formdata,
      }
    )
      .then((response) => {
        console.log("NANO RESPONSE : ",response.json());
      })
      .then((data) => {
        console.log("NANO Success : ", data);
      })
      .then((error) => {
        console.log("NANO Error : ", error);
      });
    console.log("Nano end result  : ", nano_response);
  };

  const backendOCRExtractor = async () => {
    var formdata = new FormData();
    formdata.append(
      "exp_pic",
      uploadFile[0]
    );
    const ocr_response = await fetch(
      "https://cash-flowapp.herokuapp.com/api/detect-expenditure/",
      {
        //  mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formdata,
      }
    )
      .then((response) => {
        console.log("OCR RESPONSE : ", response.json());
      })
      .then((data) => {
        console.log("Ocr Success : ", data);
      })
      .then((error) => {
        console.log("OCR Error : ", error);
      });
    console.log("OCR_backend : ", ocr_response);
  };

  const dummy_data = {
    mer_name: "Humpty Dumpty ",
    mer_address: "Mumbai",
  };

  const googleMapsExtractor = async () => {
    const maps_response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        dummy_data.mer_name + dummy_data.mer_address
      }&key=AIzaSyCoWpakOiniL2Ih_OZKsrOnf59_jT5y8D0`,
      {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params: {
          address: dummy_data.mer_name + dummy_data.mer_address,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    )
      .then((response) => {
        console.log("Google response : ", response.json());
      })
      .then((data) => {
        console.log("Google Data : ", data);
      })
      .then((error) => {
        console.log("Google Error : ", error);
      });
    console.log("Google maps_response : ", maps_response);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(uploadFile);
    console.log("data sent");
    nanoNetExtractor();
    backendOCRExtractor();
    googleMapsExtractor();
    setUploadFile([]);
    // history("/login");
  };

  return (
    <form method="POST" onSubmit={submitHandler}>
      <Dropzone onDrop={uploadImageHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button variant="contained">Add Receipt</Button>
              {uploadFile.length === 0 ? (
                "Upload receipt"
              ) : (
                <p>{uploadFile[0].name}</p>
              )}
            </div>
          </section>
        )}
      </Dropzone>
      <Button type="submit" variant="outlined" color="success">
        Submit Form
      </Button>
    </form>
  );
}
// const files = acceptedFiles.map((file) => (
//   <li key={file.path}>
//     {file.path} - {file.size} bytes
//   </li>
// ));
