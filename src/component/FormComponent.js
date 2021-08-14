import React, { useState } from "react";

import axios from "axios";
import creditCardConstants from "../constants/CreditCardConstants";
import { Form, Input, Button } from "antd";
import { v4 as uuidv4 } from 'uuid';
function FormComponent(props) {


  let [errorData, setErrorData] = useState([]);
  let [success, setSuccess] = useState([]);


  const onFinish = (values) => {
    console.log("input put value ", values);
    setErrorData(null);
    setSuccess(null);
    (async () => {
      try {

        
        await axios.post(creditCardConstants.postURL, {
          name: values.name,
          creditCardNumber: values.cardNumber,
          balance: "0",
          limit: values.limit
        },
         {headers: {
          'Content-Type': 'application/json',
          'txn-correlation-id': uuidv4()
        }});

        try {
          const result = await axios.get(creditCardConstants.getURL,
            {
             headers: {
                'Content-Type': 'application/json',
                'txn-correlation-id': uuidv4()
              }
            });
          props.setTableData(result.data);
          setSuccess(true);
          props.setErrorData(null);
        } catch (err) {
          console.log("Error 2222"+err);
          setSuccess(null);
          setErrorData("Internal Server Error");
        }


      } catch (error) {
        console.log("Error 11111"+error);
        setSuccess(null);
        if (error.response && error.response.data) {
          if (JSON.stringify(error.response.data.error.statusCode) === "22002"
            || JSON.stringify(error.response.data.error.statusCode) === "22001") {
            setErrorData("Exception " + error.response.data.error.message);
          } else if(JSON.stringify(error.response.data.error.statusCode) === "22003"){
            setErrorData("Exception Invalid Input");
          }
            else{
            setErrorData("Exception Internal Server Error")
          }
        }else{
          setErrorData("Exception Internal Server Error")
        }
      }
    })();
    console.log("POST call finished");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        marginBottom: 30,
        height: 250,
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
   >
      {
        console.log("  errorData    "+errorData),

          errorData != null ?
            <p style={{ color: "red" }}>{errorData}</p> : ""
            }
      {success != "" && success!=null?
            <p style={{ color: "green" }}>Card added successfully</p> : ""
            }
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Card Number"
          name="cardNumber"
          rules={[{ required: true, message: "Please input card number", }]}
        >
          <Input pattern="^[0-9]*$" maxLength="19" />
        </Form.Item>
        <Form.Item
          label="Limit"
          name="limit"
          rules={[{ required: true, message: "Please input limit" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
}

export default FormComponent;
