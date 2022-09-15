import React from "react";
import AppBarComponent from "../components/AppBarComponent";
import ContactComponent from "../components/ContactComponent";
import ViewAllContactsComponent from "../components/ViewAllContactsComponent";

const HomePage = () => {
  return (
    <div>
      <AppBarComponent />
      <ViewAllContactsComponent />
    </div>
  );
};

export default HomePage;
