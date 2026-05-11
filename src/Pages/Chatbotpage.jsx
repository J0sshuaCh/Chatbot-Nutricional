
import React from 'react';
import { Link } from 'react-router-dom'; 

function ChatbotPage() {
  return (
    <div>
      <h1>Chatbot 🤖</h1>
      <p>Aquí irá toda la funcionalidad de tu chatbot.</p>
      
      
      <br />
      <Link to="/">Volver al Menú Principal</Link>
    </div>
  );
}

export default ChatbotPage;