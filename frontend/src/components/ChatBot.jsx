import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatBot.css";

export default function ChatBot() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0); 
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState({});
  const [messages, setMessages] = useState([
    { text: "👋 Bonjour ! Commençons 👇", sender: "bot" },
    { text: "👤 Quel est votre nom ?", sender: "bot" }
  ]);
  const [typing, setTyping] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showChoices, setShowChoices] = useState(false);

  const chatRef = useRef();

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages, typing]);

  const steps = [
    { key: "name", question: "👤 Quel est votre nom ?" },
    { key: "email", question: "📧 Votre email ?" },
    { key: "tel", question: "📱 Téléphone ?" }
  ];

  const isValidEmail = (email) => email.includes("@");

  /* BOT */
  const botReply = (text, delay = 500) => {
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { text, sender: "bot" }]);
      setTyping(false);
    }, delay);
  };

  /* STEP FLOW */
  const nextStepHandler = (value) => {
    const newAnswers = { ...answers, [steps[step].key]: value };

    setMessages(prev => [...prev, { text: value, sender: "user" }]);

    const next = step + 1;

    if (next < steps.length) {
      setStep(next);
      botReply(steps[next].question);
    } else {
      // ✅ بعد الأسئلة → choices
      botReply("🎯 Que souhaitez-vous faire maintenant ?");
      setShowChoices(true);
      setStep("done");
    }

    setAnswers(newAnswers);
    setInput("");
  };

  const handleSubmit = () => {
    if (!input.trim()) return;

    if (steps[step]?.key === "email" && !isValidEmail(input)) {
      setMessages(prev => [
        ...prev,
        { text: input, sender: "user" },
        { text: "❌ Email invalide", sender: "bot" }
      ]);
      return;
    }

    nextStepHandler(input);
  };

  /* CHOICES */
  const handleChoice = (choice) => {
    setMessages(prev => [...prev, { text: choice, sender: "user" }]);

    if (choice === "📝 Demande") {
      botReply("🚀 Redirection vers formulaire...");
      setTimeout(() => navigate("/demande"), 1200);
      setFinished(true);
    }

    if (choice === "💼 Offres") {
      botReply("⚠️ Vous devez créer un compte.");
      setTimeout(() => navigate("/register"), 1200);
      setFinished(true);
    }

    if (choice === "🔐 Login") {
      botReply("🔐 Redirection...");
      setTimeout(() => navigate("/login"), 1200);
      setFinished(true);
    }
  };

  /* RESET */
  const resetChat = () => {
    setStep(0);
    setAnswers({});
    setMessages([
      { text: "👋 Bonjour ! Commençons 👇", sender: "bot" },
      { text: "👤 Quel est votre nom ?", sender: "bot" }
    ]);
    setFinished(false);
    setShowChoices(false);
  };

  return (
    <div className="chatbot">

      {!open && (
        <div className="chat-toggle" onClick={() => setOpen(true)}>
          💬
        </div>
      )}

      {open && (
        <div className="chat-box">

          <div className="chat-header">
            🤖 Assistant
            <span onClick={() => setOpen(false)}>✕</span>
          </div>

          <div className="chat-messages" ref={chatRef}>

            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {typing && <div className="msg bot typing">...</div>}

            {/* CHOICES */}
            {showChoices && !finished && (
              <div className="chat-options">
                <button onClick={() => handleChoice("📝 Demande")}>
                  📝 Faire un Demande
                </button>

                <button onClick={() => handleChoice("💼 Offres")}>
                  💼 voir les Offres
                </button>

                <button onClick={() => handleChoice("🔐 Login")}>
                  🔐 Creé un compte
                </button>
              </div>
            )}

            {/* RESET */}
            {finished && (
              <div className="chat-options">
                <button onClick={resetChat}>🔄 Nouveau chat</button>
              </div>
            )}

          </div>

          {/* INPUT */}
          {!finished && !showChoices && (
            <div className="chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Votre réponse..."
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button onClick={handleSubmit}>Envoyer</button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}