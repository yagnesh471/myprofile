import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import "./App.css";

export default function Portfolio() {
  const [dark, setDark] = useState(true);

  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const roles = ["Backend Developer", "Data Analyst"];

  const skills = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQL",
    "Python3",
    "Java",
    "C++",
    "Git",
  ];

  const projects = [
    {
      title: "Online Food Delivery",
      desc: "A full stack food ordering web app with login, cart, payment and tracking.",
      link: "https://foodrush07.netlify.app/",
    },
    {
      title: "Portfolio",
      desc: "My personal portfolio built with React and animations.",
      link: "https://myportfoliotyr.netlify.app/",
    },
    {
      title: "PathPilot",
      desc: "AI-powered career roadmap generator with secure history tracking.",
      link: "https://pathpilot07.netlify.app/",
    },
  ];

  const profiles = [
    {
      title: "LinkedIn",
      desc: "Connect with me professionally.",
      link: "https://www.linkedin.com/in/yagneshwar-reddy-00ba163a3",
    },
    {
      title: "GitHub",
      desc: "Check out my repositories.",
      link: "https://github.com/yagnesh471",
    },
    {
      title: "LeetCode",
      desc: "View my problem solving skills.",
      link: "https://leetcode.com/241fa04562",
    },
    {
      title: "CodeChef",
      desc: "View my problem solving skills.",
      link: "https://www.codechef.com/users/vu2_241fa04562",
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
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#profiles">Profiles</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="toggle" onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </nav>

      <section id="home" className="hero">
        <motion.h1
          className="title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Hi, I'm Yagnesh
        </motion.h1>

        <div className="typing">
          <div>{line1}</div>
          <div>{line2}</div>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About Me</h2>

        <p>
          Backend Developer skilled in Node.js and MongoDB, with a
          strong interest in data analysis and building efficient,
          real-world applications.
        </p>
      </section>

      <section id="skills" className="skills">
        <h2 style={{ marginTop: "60px" }}>Skills</h2>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-card"
              whileHover={{ y: -4 }}
            >
              <h3>{skill}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="projects">
        <h2>Projects</h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              whileHover={{ y: -4 }}
            >
              <h3>{project.title}</h3>
              <p>{project.desc}</p>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                Open →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="profiles" className="profiles">
        <h2>Profiles</h2>

        <div className="profiles-grid">
          {profiles.map((profile, index) => (
            <motion.div
              key={index}
              className="profile-card"
              whileHover={{ y: -4 }}
            >
              <h3>{profile.title}</h3>
              <p>{profile.desc}</p>

              <a
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                Open →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Contact</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_name"
            placeholder="Name"
            required
          />

          <input
            type="email"
            name="user_email"
            placeholder="Email"
            required
          />

          <textarea
            name="message"
            placeholder="Message"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>

          {success && <p style={{ color: "#00ffae" }}>{success}</p>}
          {errorMsg && <p style={{ color: "#ff6b6b" }}>{errorMsg}</p>}
        </form>
      </section>
      <footer className="footer">
  <h3>Contact Details</h3>

  <p>
  📞{" "}
  <a href="tel:+917671904792">
    +91 76719 04792
  </a>
</p>
        
<p>
  💬{" "}
  <a
    href="https://wa.me/7671904792"
    target="_blank"
    rel="noopener noreferrer"
  >
    7671904792
  </a>
</p>
  <p>
    📧{" "}
    <a href="mailto:yagnesh471@gmail.com">
      yagnesh471@gmail.com
    </a>
  </p>

  <p>
    ig:{" "}
    <a
      href="https://instagram.com/yagnesh_.471"
      target="_blank"
      rel="noopener noreferrer"
    >
      @yagnesh_.471
    </a>
  </p>

  <p className="copyright">
    © 2026 yagnesh. All Rights Reserved.
  </p>
</footer>
    </div>
  );
}
