import React from "react";
import Lottie from "react-lottie";
import animationData from "../assests/98306-contacts-book.json";

import AuthComponent from "../components/AuthComponent";
import RegisterComponent from "../components/RegisterComponent";

const RegisterPage = () => {const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
  return (
    <AuthComponent>
      <h2 className="fs-4 text-center">Register</h2>
      <div className="m-3 p-3">
        <Lottie options={defaultOptions} height={200} width={400} />
      </div>
      <RegisterComponent />
    </AuthComponent>
  );
};

export default RegisterPage;
