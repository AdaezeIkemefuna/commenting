import { createContext, useState } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [displayModal, setDisplayModal] = useState(true);

  const setNameHandler = (e) => {
    e.preventDefault();
    if (name !== "") {
      localStorage.setItem("username", name);
      setDisplayModal(false);
    } else {
      alert("Please enter a name to continue");
    }
  };

  const contextData = {
    name,
    setNameHandler,
    setName,
    displayModal,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
