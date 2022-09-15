import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import contactApi from "../api/contact";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({ name: "", password: "" });

  const registerAPI = (event) => {
    event.preventDefault();

    contactApi
      .post(`/auth/register`, {
        name: register.name,
        password: register.password,
      })
      .then((res) => {
        if (res.data.data) {
          navigate("/");
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
    <div>
      <div>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              value={register.name}
              onChange={(event) => {
                setRegister({ ...register, name: event.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={register.password}
              onChange={(event) => {
                setRegister({ ...register, password: event.target.value });
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(event) => registerAPI(event)}
          >
            Register
          </button>
          <p className="text-start mt-3">
            Registered? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
