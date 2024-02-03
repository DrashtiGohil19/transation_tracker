"use client"

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form, FormGroup, Row, Tab, Table, Tabs } from 'react-bootstrap';
import axios from 'axios';
import { MdDelete, MdModeEdit } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const [value, setValue] = useState({
    description: "",
    amount: ""
  })
  const [data, setData] = useState([])
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [editing, setEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (id) => { setDeleteId(id); setShow(true) };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e, type) => {
    e.preventDefault()
    if (editing) {
      axios({
        method: "PUT",
        url: "/api/moneyTransaction/" + editItemId,
        data: {
          description: value.description,
          amount: value.amount,
          type: type
        }
      })
        .then((response) => {
          toast.success("Data edited succesfully !")
          fetchData()
          setValue({
            description: "",
            amount: ""
          })
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
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
          toast.success("Data added succesfully !")
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
  }

  const fetchData = () => {
    axios({
      method: "GET",
      url: "/api/moneyTransaction"
    })
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const deleteData = () => {
    axios({
      method: "DELETE",
      url: "/api/moneyTransaction/" + deleteId
    })
      .then((response) => {
        toast.success("Data deleted succesfully !")
        handleClose()
        fetchData()
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getDataById = (id) => {
    axios({
      url: "/api/moneyTransaction/" + id
    })
      .then((response) => {
        let data = response.data.data
        setValue({
          description: data.description,
          amount: data.amount
        })
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
      <ToastContainer />
      <div className="container iner_wrapper">
        <Tabs
          defaultActiveKey="home"
          className="mb-3"
        >
          <Tab eventKey="home" title="Expenses">
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
                  <th colSpan={2}>Action</th>
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
                      <td onClick={() => { setEditing(true); setEditItemId(item._id); getDataById(item._id) }}><i className='fs-5 text-success'><MdModeEdit /></i></td>
                      <td onClick={() => handleShow(item._id)}><i className='fs-5 text-danger'><MdDelete /></i></td>
                    </tr>
                  ))
                }
                <tr>
                  <th colSpan={3}>Total Amount</th>
                  <th>{data.totalgivenMoney}</th>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            </Table>
          </Tab>

          <Tab eventKey="profile" title="Income">
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
                  <th colSpan={2}>Action</th>
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
                      <td onClick={() => { setEditing(true); setEditItemId(item._id); getDataById(item._id) }}><i className='fs-5 text-success'><MdModeEdit /></i></td>
                      <td onClick={() => handleShow(item._id)}><i className='fs-5 text-danger'><MdDelete /></i></td>
                    </tr>
                  ))
                }
                <tr>
                  <th colSpan={3}>Total Amount</th>
                  <th>{data.totalreceivedMoney}</th>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            </Table>
          </Tab>
        </Tabs>

      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this data ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteData}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
