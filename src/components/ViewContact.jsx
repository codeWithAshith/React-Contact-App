import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";
import contactApi from "../api/contact";

const ViewContact = () => {
  let params = useParams();
  const [contact, setContact] = useState({});

  useEffect(() => {
    if (params.id !== undefined) {
      contactApi
        .get(`/contact/${params.id}`)
        .then((res) => {
          if (res.data.data) {
            setContact(res.data.data);
          } else if (res.data.error) {
            console.log(res.data.error.message);
          } else {
            console.log("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(`Error -> ${error}`);
        });
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <div className="card border my-5 p-3">
            <h2 className="text-center">View Contact</h2>
            <hr />
            <Form>
              <Form.Group className="my-3 ">
                <Form.Control type="text" disabled value={contact.name} />
              </Form.Group>

              <Form.Group className="mb-3 mt-2">
                <Form.Control type="text" disabled value={contact.number} />
              </Form.Group>

              <Link to="/home">
                <Button variant="primary" type="save">
                  Back
                </Button>
              </Link>
            </Form>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default ViewContact;
