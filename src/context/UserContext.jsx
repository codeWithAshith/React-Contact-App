import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [contacts, setContacts] = useState([]);

  const searchContact = (userName) => {
    return contacts.reduce((acc, curr) => {
      if (curr.name === userName) {
        acc = curr;
      }
      return acc;
    }, {});
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        searchContact,
        setContacts,
        contacts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
