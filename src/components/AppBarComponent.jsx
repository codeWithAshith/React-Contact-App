import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AppBarComponent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const { loggedInUser, searchContact } = useContext(UserContext);

  const search = () => {
    const searchedContact = searchContact(name);
    if (searchedContact) navigate(`/${searchedContact.id}`);
    else console.log("User not found");
  };

  const navigateTo = (id) => {
    navigate(`/home`);
  };

  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <a className="navbar-brand fs-5 fw-bold" onClick={navigateTo}>
          Contacts App
        </a>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button
            className="btn btn-outline-primary btn-sm"
            type="submit"
            onClick={() => search()}
          >
            Search
          </button>
        </form>
        <div className="d-flex align-item-center">
          <p className="fw-semibold fs-5 me-2 mb-0">Logged in as {loggedInUser.name}</p>
          <Link to="/add">
            <button className="btn btn-outline-primary btn-sm me-2">
              Add Contact
            </button>
          </Link>
          <Link to="/">
            <button className="btn btn-outline-danger btn-sm">Logout</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AppBarComponent;
