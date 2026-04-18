import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

export default function Portfolio() {
  const [dark, setDark] = useState(true);

  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");

  const roles = ["Web Developer", "Data Analyst", "React Developer"];

  // Promise-based typing function
  const typeLine = (text, setter, speed = 120) => {
    return new Promise((resolve) => {
      let i = 0;

      const interval = setInterval(() => {
        setter(text.slice(0, i + 1));
        i++;

        if (i === text.length) {
          clearInterval(interval);
          resolve(); // move to next line
        }
      }, speed);
    });
  };

  useEffect(() => {
    const startTyping = async () => {
      await typeLine(roles[0], setLine1);
      await typeLine(roles[1], setLine2);
      await typeLine(roles[2], setLine3);
    };

    startTyping();
  }, []);

  return (
    <div className={dark ? "app dark" : "app light"}>
      {/* Background */}
      <div className="bg"></div>

      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">MyPortfolio</h1>

        <div className="nav-links">
  <a href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#projects">Projects</a>
  <a href="#profiles">Profiles</a>
  <a href="#contact">Contact</a>
</div>

        <button className="toggle" onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="title"
        >
          Hi, I'm Tyr
        </motion.h1>

        <div className="typing">
          <div>{line1}</div>
          <div>{line2}</div>
          <div>{line3}</div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <div>
          <h2>About Me</h2>
          <p>I build modern web apps and analyze data.</p>
        </div>

        <div className="skills" style={{ perspective: 1000 }}>
          {["React", "Node.js", "Python", "C++"].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ rotateX: 10, rotateY: 10, scale: 1.1 }}
              className="card"
            >
              {s}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects">
        <h2>Projects</h2>

        <div className="grid">
          {["Food App", "Weather API", "Portfolio"].map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="card"
            >
              <h3>{p}</h3>
              <p>Advanced modern project.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Profiles */}
<section id="profiles" className="profiles">
  <h2>Profiles</h2>

  <div className="profiles-grid">
    <a
      href="https://www.linkedin.com/in/yagneshwar-reddy-00ba163a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
      target="_blank"
      rel="noopener noreferrer"
      className="profile-card"
    >
      <h3>LinkedIn</h3>
      <p>Connect with me professionally.</p>
    </a>

    <a
      href="https://github.com/yagnesh471"
      target="_blank"
      rel="noopener noreferrer"
      className="profile-card"
    >
      <h3>GitHub</h3>
      <p>Check out my repositories and code.</p>
    </a>

    <a
      href="https://leetcode.com/polly55"
      target="_blank"
      rel="noopener noreferrer"
      className="profile-card"
    >
      <h3>LeetCode</h3>
      <p>View my problem-solving profile.</p>
    </a>
  </div>
</section>
      

      {/* Contact */}
      <section id="contact" className="contact">
        <h2>Contact</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Name" />
          <input placeholder="Email" type="email" />
          <textarea placeholder="Message" />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
}
