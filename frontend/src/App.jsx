import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [inputMsg, setInputMsg] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8082");
    newSocket.onopen = (message) => {
      console.log("Connection established", message.data);
      newSocket.send("Hello Server from frontend !");
      setSocket(newSocket);
    };
    newSocket.onmessage = (message) => {
      setMessage(message.data);
      console.log("Message received:", message.data);
    };
    console.log("socket < ", socket);
    
    return () => newSocket.close();
  }, []);

  return (
    <main>
      <h1>Messages : </h1>
      <input onChange={(e)=> setInputMsg(e.target.value)} />  
      <button onClick={() => socket.send(inputMsg)}>Send</button>
      <p>{message}</p>
    </main>
  );
}

export default App;
