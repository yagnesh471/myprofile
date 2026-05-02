import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import "./App.css";

export default function Portfolio() {
  const [dark, setDark] = useState(true);

  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const roles = ["Data Analyst", "Backend Developer"];

  const projects = [
    {
      title: "Online Food Delivery",
      desc: "A full stack food ordering web app with login, cart, payment and tracking.",
      link: "https://transcendent-kataifi-a749b4.netlify.app/",
    },
    {
      title: "Weather API",
      desc: "A weather monitoring app using API integration and dynamic UI updates.",
      link: "https://your-weather-project-link.com",
    },
    {
      title: "Portfolio",
      desc: "My personal portfolio built with React, animations and theme switching.",
      link: "https://myportfoliotyr.netlify.app/",
    },
    {
    title: "PathPilot",
    desc: "AI-powered career roadmap generator with secure user-based history tracking.",
    link: "https://pathpilot07.netlify.app/", // replace with your actual link
  },
  ];

  const typeLine = (text, setter, speed = 120) => {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        setter(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(interval);
          resolve();
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

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccess("");
      setErrorMsg("");

      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY
      );

      setSuccess("Message sent successfully!");
      e.target.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setErrorMsg("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={dark ? "app dark" : "app light"}>
      <div className="bg"></div>

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

      <section id="home" className="hero">
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="title">
          Hi, I'm Yagnesh
        </motion.h1>

        <div className="typing">
          <div>{line1}</div>
          <div>{line2}</div>
          <div>{line3}</div>
        </div>
      </section>

      <section id="about" className="about">
        <div>
          <h2>About Me</h2>
          <p>I build modern web apps and analyze data.</p>
        </div>

        <div className="skills">
  {["HTML5","CSS3","JavaScript","Node.js","Express.js","React","SQL","MongoDB","C","Python", "C++","Java"].map((s, i) => (
    <motion.div
      key={i}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="card"
    >
      {s}
    </motion.div>
  ))}
</div>
      </section>

      <section id="projects" className="projects">
        <h2>Projects</h2>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.a key={i} href={project.link} target="_blank" rel="noopener noreferrer" className="project-card">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

      <section id="profiles" className="profiles">
        <h2>Profiles</h2>

        <div className="profiles-grid">
          <a href="https://www.linkedin.com/in/yagneshwar-reddy-00ba163a3" target="_blank" className="profile-card">
            <h3>LinkedIn</h3>
            <p>Connect with me professionally.</p>
          </a>

          <a href="https://github.com/yagnesh471" target="_blank" className="profile-card">
            <h3>GitHub</h3>
            <p>Check out my repositories.</p>
          </a>

          <a href="https://leetcode.com/polly55" target="_blank" className="profile-card">
            <h3>LeetCode</h3>
            <p>View my problem solving.</p>
          </a>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Contact</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="user_name" placeholder="Name" required />
          <input type="email" name="user_email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" required />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>

          {success && <p style={{ color: "#00ffae" }}>{success}</p>}
          {errorMsg && <p style={{ color: "#ff6b6b" }}>{errorMsg}</p>}
        </form>
      </section>
    </div>
  );
}
