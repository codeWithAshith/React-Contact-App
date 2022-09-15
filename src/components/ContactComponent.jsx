import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import contactApi from "../api/contact";
import { UserContext } from "../context/UserContext";

const INITIAL_VALUE = { id: 0, name: "", number: "" };

const ContactComponent = () => {
  const numberRegEx = /^[6-9]\d{9}$/gi;
  const nameRegExp = /[a-zA-Z]/g;

  let params = useParams();
  let navigate = useNavigate();
  const [isEdit, setEdit] = useState(false);
  const [contact, setContact] = useState(INITIAL_VALUE);

  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");

  const { loggedInUser, findContactById, addContact } = useContext(UserContext);

  const handleAddOrEdit = () => {
    if (params.id === undefined) {
      contactApi
        .post(`/contact`, {
          name: contact.name,
          number: contact.number,
          userId: loggedInUser.id,
        })
        .then((res) => {
          if (res.data.data) {
            navigate("/home");
          } else if (res.data.error) {
            console.log(res.data.error.message);
          } else {
            console.log("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(`Error -> ${error}`);
        });
      // addContact(contact.name, contact.number, params.id);
    } else {
      contactApi
        .put(`/contact`, {
          id: params.id,
          name: contact.name,
          number: contact.number,
          userId: loggedInUser.id,
        })
        .then((res) => {
          if (res.data.data) {
            navigate("/home");
          } else if (res.data.error) {
            console.log(res.data.error.message);
          } else {
            console.log("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(`Error -> ${error}`);
        });
      // addContact(contact.name, contact.number, 0, loggedInUser.id);
    }
    setContact(INITIAL_VALUE);
    navigate("/home");
  };

  useEffect(() => {
    if (params.id !== undefined) {
      contactApi
        .get(`/contact/${params.id}`)
        .then((res) => {
          if (res.data.data) {
            setContact(res.data.data);
            setEdit(true);
          } else if (res.data.error) {
            console.log(res.data.error.message);
          } else {
            console.log("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(`Error -> ${error}`);
        });
    } else {
      setContact(INITIAL_VALUE);
      setEdit(false);
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <div className="card border my-5 p-3">
            <h2 className="text-center">
              {isEdit ? "Edit Contact" : "Add Contact"}
            </h2>
            <hr />
            <Form>
              <Form.Group className="my-3 ">
                <Form.Control
                  type="text"
                  placeholder="Enter contact name "
                  value={contact.name}
                  onChange={(event) => {
                    let name = event.target.value;
                    if (name.length < 3 || nameRegExp.test(name) === false) {
                      setNameError("Enter a valid name");
                    } else {
                      setNameError("");
                    }
                    setContact({ ...contact, name: name });
                  }}
                />
                <Form.Text className="text-danger">{nameError}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 mt-2">
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  value={contact.number}
                  onChange={(event) => {
                    let number = event.target.value;
                    if (numberRegEx.test(number) === false) {
                      setNumberError("Enter a valid number");
                    } else {
                      setNumberError("");
                    }
                    setContact({ ...contact, number: number });
                  }}
                />
                <Form.Text className="text-danger">{numberError}</Form.Text>
              </Form.Group>

              <Link to="/home">
                <button className="btn btn-outline-secondary me-3">Back</button>
              </Link>
              <button
                className="btn btn-primary"
                onClick={(event) => {
                  event.preventDefault();
                  handleAddOrEdit();
                }}
                disabled={
                  contact.name === "" ||
                  nameRegExp.test(contact.name) === false ||
                  contact.number === "" ||
                  numberRegEx.test(contact.number) === false
                }
              >
                {isEdit ? "Edit Contact" : "Add Contact"}
              </button>
            </Form>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default ContactComponent;
