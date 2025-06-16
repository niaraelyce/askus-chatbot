import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load chat history on page load
  useEffect(() => {
    const stored = sessionStorage.getItem("chatHistory");
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  // Save chat history when messages change
  useEffect(() => {
    sessionStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },

          body: JSON.stringify({
            model: "gpt-4",
            max_tokens: 350,
            messages: [
              {
                role: "system",
                content:
                  "You are a culturally-aware, personable, and trauma-informed assistant trained to help marginalized communities understand programs, services, and resources in plain language. Be encouraging, warm, and informative — but keep answers short, easy to read, and well-structured. Use bold section titles (like **Eligibility**, **How to Apply**) when appropriate, and short bullet points or line breaks for clarity. Avoid jargon. Start answer prompts with phrases with 'We got you!', 'You deserve and are worthy of help.', as well as any phrasing that would welcome comfort and transparency to the end user. ",
              },
              ...messages,
              userMessage,
            ],
          }),
        }
      );

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const botReply = data.choices[0].message;
        setMessages((prev) => [...prev, botReply]);
      } else {
        console.error("OpenAI error:", data);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Hmm, something went wrong. Try again in a moment!",
          },
        ]);
      }
    } catch (err) {
      console.error("Request failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error. Please check your connection or API key.",
        },
      ]);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatLog}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#e6f4ea" : "#f0f0f0",
            }}
          >
            <span
              style={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{
                __html: msg.content.replace(
                  /\*\*(.*?)\*\*/g,
                  "<strong>$1</strong>"
                ),
              }}
            ></span>
          </div>
        ))}
      </div>
      <div style={styles.inputRow}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    background: "#fff",
    fontFamily: "Work Sans, sans-serif",
  },
  chatLog: {
    height: "300px",
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "10px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  message: {
    maxWidth: "75%",
    padding: "10px 15px",
    borderRadius: "12px",
    fontSize: "1rem",
    lineHeight: "1.4",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    color: "#222",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#2b5c06",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Chatbot;
