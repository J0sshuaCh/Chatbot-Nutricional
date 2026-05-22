import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

export default function ChatbotPage() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! 👋 Soy tu Asistente de Nutrición Materno Infantil (ANMI). ¿En qué puedo ayudarte hoy?",
      sender: "bot"
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return; // Evitar enviar vacíos

    const userMessage = { id: Date.now(), text: prompt, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const inputPrompt = prompt; // Guardamos el texto para enviarlo
    setPrompt(""); // Limpiamos input
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      if (!res.ok) {
        throw new Error('La respuesta de la red no fue OK');
      }

      const data = await res.json();

      const botMessage = { id: Date.now() + 1, text: data.text, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { id: Date.now(), text: "Lo siento, hubo un error de conexión.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center from-indigo-500 to-purple-700">

      {/* Contenedor principal */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-full min-h-[800px] w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Chatbot 🤖</h1>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-xl max-w-[80%] text-sm leading-relaxed text-left ${msg.sender === "user"
                    ? "bg-indigo-600 text-white" // Color Usuario
                    : "bg-gray-200 text-gray-800" // Color Bot
                  }`}
              >
                <ReactMarkdown
                  components={{
                    // Estilo para negritas (**texto**)
                    strong: ({ node, ...props }) => <span className="font-bold" {...props} />,
                    // Estilo para listas ( * elemento)
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside ml-1" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside ml-1" {...props} />,
                    // Estilo para elementos de lista
                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                    // Estilo para párrafos
                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input y Botón (Fijos abajo) */}
        <form onSubmit={handleSubmit} className="flex gap-2 border-t border-gray-300 pt-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 rounded-lg shadow-md transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "..." : "Enviar"}
          </button>
        </form>

        <Link
          to="/"
          className="inline-block mt-6 text-indigo-600 hover:text-indigo-800"
        >
          Volver al Menú Principal
        </Link>
      </div>

      <p className="text-white/80 mt-8 text-sm">
        Versión Beta — Proyecto ANMI
      </p>
    </div>
  );
}