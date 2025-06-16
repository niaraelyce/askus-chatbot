import React from "react";
import Chatbot from "./Chatbot";

function App() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <img
          src="/images/logo-dark.png"
          alt="WeGotUs Logo"
          style={styles.logo}
        />
        <h1 style={styles.title}>AskUs AI-Powered Assistant</h1>
        <p style={styles.subtitle}>
          AskUs uses AI to provide real-time answers for underserved
          communities. All responses are plain language and culturally aware.
        </p>
        <a href="https://wegotus.org" style={styles.cta}>
          ← Back to Main Site
        </a>
      </header>

      <main style={styles.main}>
        <Chatbot />
      </main>

      <footer style={styles.footer}>
        <p>
          Built with ❤️ by WeGotUs. Need more help?{" "}
          <a href="https://wegotus.org/contact" style={styles.link}>
            Contact Us
          </a>
        </p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'DM Sans', 'Work Sans', sans-serif",
    background: "#000000",
    color: "#1f1f1f",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 20px",
  },
  header: {
    textAlign: "center",
    marginTop: "40px",
  },
  logo: {
    height: "100px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "4.2rem",
    color: "#f4b400",
    fontFamily: "Caveat Brush",
    marginBottom: "0.3rem",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#ffff",
    marginBottom: "1rem",
    fontWeight: 400,
  },
  cta: {
    display: "inline-block",
    fontSize: "0.9rem",
    backgroundColor: "#2b5c06",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    textDecoration: "none",
    marginTop: "10px",
    fontFamily: "'DM Sans', sans-serif",
  },
  main: {
    width: "300%",
    maxWidth: "900px",
    margin: "40px auto",
  },
  footer: {
    marginTop: "auto",
    padding: "20px 0",
    fontSize: "0.85rem",
    color: "#666",
    textAlign: "center",
    fontFamily: "'Work Sans', sans-serif",
  },
  link: {
    color: "#2b5c06",
    textDecoration: "underline",
  },
};

export default App;
