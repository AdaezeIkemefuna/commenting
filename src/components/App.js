import CommentBox from "./CommentBox";
import Modal from "./Modal";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Picture from "./Picture";

export default function App() {
  const { displayModal } = useContext(AuthContext);
  return (
    <>
      {displayModal && <Modal />}
      <Picture />
      <CommentBox />
    </>
  );
}
