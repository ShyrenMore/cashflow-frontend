import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
let base64 = require('base-64');
export default function AddExpenseFormWithImg(props) {
  let history = useNavigate();
  const nano_id = "9f4d89f1-66cd-4db6-94fe-90d22fa3048c";
  const [uploadFile, setUploadFile] = useState([]);

  const uploadImageHandler = (acceptedFiles) => {
    setUploadFile(acceptedFiles);
    console.log(uploadFile);
  };

  const nanoNetExtractor = async () => {
    const nano_response = await fetch(
      `https://app.nanonets.com/api/v2/OCR/Model/${nano_id}/LabelFile/`,
      {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Basic ${base64.encode(process.env.NANO_API_KEY)}`,
        },
        body: {
          modelId: nano_id,
          file: uploadFile[0],
        },
      }
    )
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log("Success : ", data);
      })
      .then((error) => {
        console.log("Error", error);
      });
      console.log("Nano : " ,nano_response);
  };

   const backendOCRExtractor = async () => {
     const ocr_response = await fetch(
       "https://cash-flowapp.herokuapp.com/api/detect-expenditure/",
       {
         //  mode: "no-cors",
         method: "POST",
         headers: {
           "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
         },
         body: {
           exp_pic: uploadFile[0],
         },
       }
     )
       .then((response) => {
         response.json();
       })
       .then((data) => {
         console.log("Success : ", data);
       })
       .then((error) => {
         console.log("Error", error);
       });
     console.log("OCR_backend : ", ocr_response);
   };

const dummy_data = {
  mer_name : "Humpty Dumpty ",
  mer_address: "Mumbai"
}

  const googleMapsExtractor = async () => {
    const maps_response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${dummy_data.mer_name+dummy_data.mer_address}&key=${process.env.GOOGLE_MAPS_API_KEY}` , {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          "Content-type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        params: {
          address: dummy_data.mer_name + dummy_data.mer_address,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    )
    .then(response => response.json())
    .then((data) => {
      console.log('Data : ', data);
    })
    .then((error) => {
      console.log("Error : ", error);
    });
    console.log(maps_response);

  }

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
