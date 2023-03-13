import AuthContext from "../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import ably from "../components/Ably";
import axios from "axios";

export default function CommentBox() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const timestamp = Date.now();
  var channel = ably.channels.get("comments");
  const name = localStorage.getItem("username");

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
        // Subscribe to channel
        channel.subscribe("add_comment", (message) => {
          console.log(message);
        });
      });
    });
  });
  console.log(comments);
  return (
    <div>
      <h1>Join The conversation</h1>

      <div>
        {comments.map((e, index) => {
          return (
            <div key={index}>
              <img src={e.avatar} alt="alt" width="20px" height="20px" />
              <span>{e.name}</span>
              <span>{e.comment}</span>
            </div>
          );
        })}
      </div>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value.trim())}
        />
        <button>send</button>
      </form>
    </div>
  );
}
