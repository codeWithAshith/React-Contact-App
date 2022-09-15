import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import contactApi from "../api/contact";
import { UserContext } from "../context/UserContext";

const ViewAllContactsComponent = () => {
  const navigate = useNavigate();

  const { loggedInUser, setContacts, contacts } = useContext(UserContext);

  const navigateTo = (id) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    contactApi
      .get(`/contact/user/${loggedInUser.id}`)
      .then((res) => {
        if (res.data.data) {
          setContacts(res.data.data);
        } else if (res.data.error) {
          console.log(res.data.error.message);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(`Error -> ${error}`);
      });
  }, []);

  const deleteAPI = (event, id) => {
    event.preventDefault();
    contactApi
      .delete(`/contact/${id}`)
      .then((res) => {
        if (res.data.data) {
          setContacts(res.data.data);
        } else if (res.data.error) {
          console.log(res.data.error.message);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(`Error -> ${error}`);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-2"></div>
        <div className="col-8 card border">
          <h2 className="text-center mt-4">All Contacts</h2>
          <hr />
          {contacts.length > 0 ? (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={index}>
                    <td>{contact.id}</td>
                    <td>
                      <Link to={`/${contact.id}`}>{contact.name}</Link>
                    </td>
                    <td>{contact.number}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary btn-sm me-3"
                        onClick={() => navigateTo(contact.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm me-3"
                        onClick={(event) => deleteAPI(event, contact.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="fs-4"> No contacts to show</p>
          )}
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default ViewAllContactsComponent;
