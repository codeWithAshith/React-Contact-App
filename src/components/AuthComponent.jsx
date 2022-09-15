import React from "react";

const AuthComponent = ({ children }) => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-3"></div>
        <div className="col-6 card border p-3 bg-light">{children}</div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default AuthComponent;
