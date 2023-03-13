import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Modal() {
  const { name, setNameHandler, setName } = useContext(AuthContext);
  return (
    <div className="backdrop">
      <div className="modal__center">
        <>
          <h1>Please Enter Your Name:</h1>
          <form onSubmit={setNameHandler}>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button>Go</button>
          </form>
        </>
      </div>
    </div>
  );
}
