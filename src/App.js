import React, { useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./Pages/HomePage";
import ViewContactsPage from "./Pages/ViewContactsPage";
import { Route, Routes } from "react-router-dom";
import ContactPage from "./Pages/ContactPage";

import { UserContext, UserProvider } from "./context/UserContext";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";

const App = () => {
  const { loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoutes auth={loggedInUser.isLoggedIn} />}>
        <Route path="/home" exact element={<HomePage />} />
        <Route path="/edit/:id" element={<ViewContactsPage />} />
        <Route path="/add" element={<ViewContactsPage />} />
        <Route path="/:id" element={<ContactPage />} />
      </Route>
    </Routes>
  );
};

export default App;
