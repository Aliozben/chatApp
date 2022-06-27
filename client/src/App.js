import "./App.css";
import io from "socket.io-client";
import {useEffect, useState} from "react";

const socket = io("http://localhost:9001", {
  query: {
    username:
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ],
  },
});

const EMIT_TYPES = {
  FRIEND_LOGIN: "friend-login",
  NEW_MESSAGE: "new-message",
  FRIEND_LOGOF: "friend-logof",
  GET_OLD_MESSAGES: "get-old-messages",
};

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit(EMIT_TYPES.NEW_MESSAGE, {message});
  };

  useEffect(() => {
    socket.on(EMIT_TYPES.FRIEND_LOGIN, data => {
      setMessageReceived(`${data.username} loged in`);
    });
    socket.on(EMIT_TYPES.FRIEND_LOGOF, data => {
      setMessageReceived(`${data.username} loged off`);
    });
    socket.on(EMIT_TYPES.NEW_MESSAGE, data => {
      setMessageReceived(`${data.username}: ${data.data.message}`);
    });
    socket.on(EMIT_TYPES.GET_OLD_MESSAGES, data => {
      let message = "";
      console.log(data);
      data.forEach(element => {
        message += `-${element.owner}: ${element.message} | `;
      });
      setMessageReceived(message);
    });
  }, [socket]);
  
  return (
    <div className="App">
      <input
        placeholder="Message..."
        onChange={event => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
