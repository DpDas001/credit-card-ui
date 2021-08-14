import React, { useState, useEffect } from "react";

import { Table, PageHeader } from "antd";
import "../App.css";
import FormComponent from "./FormComponent";
import axios from 'axios';
import creditCardConstants from "../constants/CreditCardConstants";

import { v4 as uuidv4 } from 'uuid';
const columns = [
  { title: "Name", dataIndex: "name", align: "center" },
  { title: "Card Number", dataIndex: "creditCardNumber", align: "center" },
  {
    title: "Balance",
    dataIndex: "balance",
    align: "center",
    render: (text) => <div style={{}}>£{text}</div>,
  },
  { title: "Limit", dataIndex: "limit", align: "center" },
];


function Main() {
  let [tableData, setTableData] = useState([]);
  let [errorData, setErrorData] = useState([]);

  // The useEffect() hook fires any time that the component is rendered.
  // An empty array is passed as the second argument so that the effect only fires once.
  useEffect(() => {
    try{
    axios.get(creditCardConstants.getURL, {
      headers: {
        'Content-Type': 'application/json',
        'txn-correlation-id': uuidv4()
      }
    }).then(response => {
        setTableData(response.data);
        console.log(" table data "+JSON.stringify(response.data));
        
      })
      .catch(e=>{
        console.log("Error 1  " +e);
        setErrorData("Internal Server Error")
      });
    }catch(err){
      console.log("Error 2  " +err);
    }

  }, []);

  return (
    <div className="App">
      <div className="content-wrapper">
        <PageHeader
          title="Credit Card System"
          style={{
            border: "1px solid rgb(235, 237, 240)",
            backgroundColor: "#fff",
            marginBottom: "30px",
          }}
        />
        {
          errorData !== null ?
            <p style={{ color: "red" }}>{errorData}</p> : ""
            }
        <FormComponent setTableData={setTableData} setErrorData={setErrorData}/>

        <Table
          bordered
          columns={columns}
          dataSource={tableData}
          tableLayout="auto"
          size="small"
        />
      </div>
    </div>
  );
}

export default Main;
