import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AddExpenseFormWithImg(props) {
  let history = useNavigate();
  const nano_id = "9f4d89f1-66cd-4db6-94fe-90d22fa3048c";
  const [uploadFile, setUploadFile] = useState([]);
  let nano = {
    mer_name: '',
    mer_addr: '',
    exp_amt: '',
    exp_date: '',
    cat: [],
  }
  let data_to_send = {
    expenditure_title:"",
    expenditure_amount:"",
    expenditure_remarks:"",
    expenditure_date:"",
    category_name:""
  }
  const uploadImageHandler = (acceptedFiles) => {
    setUploadFile(acceptedFiles);
    console.log(uploadFile);
  };

  const nanoNetExtractor = async () => {
    var nanoFormData = new FormData();
    nanoFormData.append("file", uploadFile[0]);
    nanoFormData.append("modelId", nano_id);
    axios.post(`https://app.nanonets.com/api/v2/OCR/Model/${nano_id}/LabelFile/`,
        nanoFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Basic aXNYSFRBSGE1OVYzbnR3dmRNVTFBa05nSGlhQjVCS3E6`,
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
        console.log('Nano: ',nano);
        console.log("G Maps extractor Start");
        backendOCRExtractor();
        // googleMapsExtractor();
      });
  };

  const backendOCRExtractor = async () => {
   console.log(uploadFile[0]);
   var formData = new FormData();
   formData.append("exp_pic", uploadFile[0]);
   axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/detect-expenditure/`,formData,
       {
         headers: {
           "Content-Type": "multipart/form-data",
           "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
         },
       }
     )
     .then((response) => {
       console.log("detecExp"); 
       console.log(response.data); 
        let apna_data = response.data.model_extr_data;
        
        if(apna_data.date.length>0){
          data_to_send.expenditure_date = apna_data.date;
        } else{
          data_to_send.expenditure_date = nano.exp_date;
        }

        if(apna_data?.amount){
          data_to_send.expenditure_amount = apna_data?.amount;
        } else{
          data_to_send.expenditure_amount = nano.exp_amt;
        }

        if(apna_data?.merchant_name.length>0){
          data_to_send.expenditure_title = apna_data?.merchant_name.join(",");
        }else{
          data_to_send.expenditure_title = nano.mer_name + nano.mer_addr;
        }

        console.log("data_to_send");
        console.log(data_to_send);

        googleMapsExtractor(data_to_send.expenditure_title);
     });
  };

  const googleMapsExtractor = async (place_search) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${place_search}&key=AIzaSyCoWpakOiniL2Ih_OZKsrOnf59_jT5y8D0`
    ).then((response) => {
      console.log(response.data);
      // nano.cat = response.data.results[0].types.join(",");
      if (response.data.status === "ZERO_RESULTS"){
        data_to_send.category_name = "Miscelleaous";
      }else{
        data_to_send.category_name = response.data.results[0].types.join(",");
      }
      console.log("Nano Final : ", nano);
      axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/add-expenditure/`, data_to_send,{
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      }).then((res)=>{console.log(res.data)});
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
  }

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

