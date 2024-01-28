"use client"

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form, FormGroup, Row, Tab, Table, Tabs } from 'react-bootstrap';
import axios from 'axios';

export default function Home() {
  const [value, setValue] = useState({
    description: "",
    amount: ""
  })
  const [data, setData] = useState([])

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e, type) => {
    e.preventDefault()
    axios({
      method: "POST",
      url: "/api/moneyTransaction",
      data: {
        description: value.description,
        amount: value.amount,
        type: type
      }
    })
      .then((response) => {
        console.log(response.data);
        fetchData()
        setValue({
          description: "",
          amount: ""
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const fetchData = () => {
    axios({
      method: "GET",
      url: "api/moneyTransaction"
    })
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="bg_wrapper pt-3">
      <div className='d-flex justify-content-center mb-2'>
        <h4>Money Transaction App</h4>
      </div>
      <div className="container iner_wrapper">
        <Tabs
          defaultActiveKey="home"
          className="mb-3"
        >
          <Tab eventKey="home" title="Given Money">
            <Form className='p-3' onSubmit={(e) => handleSubmit(e, "givenMoney")}>
              <Row>
                <Col lg={5} md={6} sm={6} xs={8} className="mb-3">
                  <FormGroup>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      required
                      lang='guj'
                      name='description'
                      value={value.description}
                      onChange={(e) => handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col lg={3} md={3} sm={3} xs={4} className="mb-3">
                  <FormGroup>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Amount"
                      required
                      name='amount'
                      value={value.amount}
                      onChange={(e) => handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col lg={4} md={3} sm={3} xs={3} className="mb-3">
                  <Button type='submit' className="btn btn-primary">Add</Button>
                </Col>
              </Row>
            </Form>

            <Table striped bordered hover className='mt-3 border-dark text-center'>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.givenMoneyData?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{new Date(item.date).toLocaleDateString('en-GB')}</td>
                      <td>{item.description}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))
                }
                <tr>
                  <th colSpan={3}>Total Amount</th>
                  <th>{data.totalgivenMoney}</th>
                </tr>
              </tbody>
            </Table>
          </Tab>

          <Tab eventKey="profile" title="Received Money">
            <Form className='p-3' onSubmit={(e) => handleSubmit(e, "receivedMoney")}>
              <Row>
                <Col lg={5} md={6} sm={6} xs={8} className="mb-3">
                  <FormGroup>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      required
                      lang='guj'
                      name='description'
                      value={value.description}
                      onChange={(e) => handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col lg={3} md={3} sm={3} xs={4} className="mb-3">
                  <FormGroup>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Amount"
                      required
                      name='amount'
                      value={value.amount}
                      onChange={(e) => handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col lg={4} md={3} sm={3} xs={3} className="mb-3">
                  <Button type='submit' className="btn btn-primary">Add</Button>
                </Col>
              </Row>
            </Form>

            <Table striped bordered hover className='mt-3 border-dark text-center'>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.receivedMoneyData?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{new Date(item.date).toLocaleDateString('en-GB')}</td>
                      <td>{item.description}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))
                }
                <tr>
                  <th colSpan={3}>Total Amount</th>
                  <th>{data.totalreceivedMoney}</th>
                </tr>
              </tbody>
            </Table>
          </Tab>
        </Tabs>

      </div>
    </div>
  );
}
