import React, { useState, useEffect } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [stompClient, setStompClient] = useState(null);
    useEffect(() => {
        const socket = new SockJS("http:/localhost:8080/ws");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe("/topic/messages", (message) => {
                const receivedMessage = JSON.parse(message.body);
                // setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                console.log("receivedMessage", receivedMessage);
            });
        });
        setStompClient(client);
        return () => {
            client.disconnect();
        };
    }, []);
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };
    const sendMessage = () => {
        if (message.trim()) {
            const chatMessage = {
                message: message,
            };
            stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
        }
    };

    return (
        <div className="App">
            <div>
                {messages.map((msg, index) => {
                    <h1 key={index}>{msg.content}</h1>;
                })}
            </div>
            <div>
                <input type="text" onInput={(e) => handleMessageChange(e)} />
                <button onClick={() => sendMessage()} disabled={!message.trim()}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default App;
