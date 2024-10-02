import { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import './App.css'; 

function App() {
  const [messages, setMessages] = useState<Array<{ user: string, content: string }>>([]);
  const [messageInput, setMessageInput] = useState<string>("");

  // Function to handle message submission
  function sendMessage() {
    if (messageInput.trim() === "") return; // Don't send empty messages
    setMessages([...messages, { user: "You", content: messageInput }]);
    setMessageInput(""); 
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <div className="chat-container">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="logo">
              <img src="logo" alt="Logo" />
            </div>
            <div className="menu">
              <button>Main Dashboard</button>
              <button>Profile Settings</button>
              <button>History</button>
            </div>
          </div>

          {/* Main Chat Area */}
          <main className="chat-main">
            <div className="chat-header">
              <h2>NIST AI Chatbot</h2>
              <button onClick={signOut}>Sign out</button>
            </div>

            {/* Chat Box */}
            <div className="chat-box">
              {messages.map((message, index) => (
                <div key={index} className="chat-message">
                  <span className="message-user">{message.user}: </span>
                  <span className="message-content">{message.content}</span>
                </div>
              ))}
            </div>

            {/* Message Input Box */}
            <div className="chat-input">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message here..."
              />
              <button onClick={sendMessage}>Submit</button>
            </div>
          </main>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
