import CommentBox from "./CommentBox";
import Comments from "./AllComments";
import Modal from "./Modal";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function App() {
  const { displayModal } = useContext(AuthContext);
  return (
    <>
      {displayModal && <Modal />}
      <CommentBox />
    </>
  );
}
