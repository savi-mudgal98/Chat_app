import './App.css';
import React from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const API= process.env.API_URL || "http://localhost:3001";
const socket = io.connect(API);

function App() {
  
  const[username,setUsername]= React.useState("");
  const [room, setRoom]= React.useState("");
  const [showChat, setShowChat] = React.useState(false);

  const joinRoom=()=> {

    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  
  
  return (
    <div className="App">
         {!showChat ? (
        <div className="joinChatContainer">
      <h2>Join a chat</h2>
      <input type="text"
       placeholder="John..."
       onChange={(event) => {
        setUsername(event.target.value);}}
       />

      <input type="text" 
      placeholder="Room ID"
      onChange={(event) => {
        setRoom(event.target.value);
      }}
      />
      <button onClick={joinRoom}>Join a room</button>
        </div>
      
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>

  );
}

export default App;
