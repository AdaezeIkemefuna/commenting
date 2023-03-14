import { useState, useEffect } from "react";
import ably from "../components/Ably";
import axios from "axios";

export default function CommentBox() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const timestamp = new Date(Date.now());
  var channel = ably.channels.get("comments");
  const name = localStorage.getItem("username");
  let commentEnd = null;

  const addComment = async (e) => {
    e.preventDefault();

    // Retrieve a random image from the Dog API
    const avatar = await (
      await axios.get("https://dog.ceo/api/breeds/image/random")
    ).data.message;
    // Make sure name and comment boxes are filled
    if (comment) {
      const commentObject = { name, comment, timestamp, avatar };
      // Publish comment
      channel.publish("add_comment", commentObject);
      setComment("");
      channel.subscribe(function (msg) {
        setComments([...comments, msg.data]);
      });
    }
  };
  useEffect(() => {
    channel.once("attached", () => {
      channel.history((err, page) => {
        const historyMessages = Array.from(page.items, (item) => item.data);
        setComments(historyMessages);
      });
    });
  });
  console.log(comments);
  useEffect(() => {
    commentEnd.scrollIntoView({ behaviour: "smooth" });
  });
  return (
    <div className="home">
      <>
        <div className="comments">
          {comments.map((e, index) => {
            return (
              <div key={index} className="comment">
                <span>{e.name}</span>
                <span className="date">{e.timestamp.toString()}</span>
                <div>{e.comment}</div>
              </div>
            );
          })}
          <div
            ref={(element) => {
              commentEnd = element;
            }}
          ></div>
        </div>
        <form onSubmit={addComment} className="form">
          <input
            type="text"
            placeholder="Type here..."
            value={comment}
            onChange={(e) => setComment(e.target.value.trim())}
          />
          <button>send</button>
        </form>
      </>
    </div>
  );
}
