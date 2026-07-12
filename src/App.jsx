import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import "./App.css";

export default function Portfolio() {
  /* ===========================
        Theme
  =========================== */

  const [dark, setDark] = useState(true);

  /* ===========================
        Hero Typing
  =========================== */

  const roles = [
    "Backend Developer",
    "Data Analyst",
    "AI Enthusiast",
  ];

  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  /* ===========================
        Contact Form
  =========================== */

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  /* ===========================
        Statistics
  =========================== */

  const stats = [
    {
      number: "100+",
      label: "LeetCode Problems",
    },
    {
      number: "3+",
      label: "Projects",
    },
    {
      number: "6+",
      label: "Technologies",
    },
    {
      number: "2+",
      label: "Years Learning",
    },
  ];

  /* ===========================
        Skills
  =========================== */

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "Framer Motion",
      ],
    },

    {
      title: "Backend",
      skills: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "JWT Authentication",
      ],
    },

    {
      title: "Databases",
      skills: [
        "MongoDB",
        "SQL",
      ],
    },

    {
      title: "Languages",
      skills: [
        "Java",
        "Python",
        "C++",
      ],
    },

    {
      title: "Tools",
      skills: [
        "Git",
        "GitHub",
        "Postman",
        "Netlify",
        "Render",
      ],
    },
  ];

  /* ===========================
        Projects
  =========================== */

  const projects = [
    {
      title: "FoodRush",

      subtitle: "Full Stack Food Delivery Platform",

      desc:
        "A production-ready MERN application featuring authentication, cart management, online ordering, payment flow, admin dashboard, and order tracking.",

      tech: [
        "React",
        "Node",
        "Express",
        "MongoDB",
      ],

      live: "https://foodrush07.netlify.app/",

      github: "https://github.com/yagnesh471",
    },

    {
      title: "PathPilot",

      subtitle: "AI Career Roadmap Generator",

      desc:
        "An AI-powered platform that generates personalized career roadmaps with secure history tracking and modern UI.",

      tech: [
        "React",
        "AI",
        "Node",
      ],

      live: "https://pathpilot07.netlify.app/",

      github: "https://github.com/yagnesh471",
    },

    {
      title: "Developer Portfolio",

      subtitle: "Responsive React Portfolio",

      desc:
        "Personal portfolio featuring animations, dark mode, project showcase, EmailJS integration and responsive design.",

      tech: [
        "React",
        "CSS",
        "Framer Motion",
      ],

      live: "https://myportfoliotyr.netlify.app/",

      github: "https://github.com/yagnesh471",
    },
  ];

  /* ===========================
        Coding Profiles
  =========================== */

  const profiles = [
    {
      title: "GitHub",
      desc: "Explore my repositories and open-source work.",
      link: "https://github.com/yagnesh471",
    },

    {
      title: "LinkedIn",
      desc: "Connect with me professionally.",
      link:
        "https://www.linkedin.com/in/yagneshwar-reddy-00ba163a3",
    },

    {
      title: "LeetCode",
      desc: "100+ coding problems solved.",
      link: "https://leetcode.com/241fa04562",
    },

    {
      title: "CodeChef",
      desc: "Competitive programming profile.",
      link:
        "https://www.codechef.com/users/vu2_241fa04562",
    },

    {
      title: "HackerRank",
      desc: "Programming certifications and practice.",
      link:
        "https://www.hackerrank.com/profile/vu_241fa04562",
    },

    {
      title: "HackerEarth",
      desc: "Coding challenges and contests.",
      link:
        "https://www.hackerearth.com/@yagneshwar2/",
    },
  ];

  /* ===========================
        Typing Animation
  =========================== */

  useEffect(() => {
    const typing = setTimeout(() => {
      if (charIndex < roles[roleIndex].length) {
        setCurrentRole(
          prev => prev + roles[roleIndex][charIndex]
        );
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentRole("");
          setCharIndex(0);
          setRoleIndex(
            prev => (prev + 1) % roles.length
          );
        }, 1500);
      }
    }, 90);

    return () => clearTimeout(typing);
  }, [charIndex, roleIndex]);

  /* ===========================
        Success Message Timer
  =========================== */

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  /* ===========================
        EmailJS
  =========================== */

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

      e.target.reset();

      setSuccess("Message sent successfully!");
    } catch (err) {
      setErrorMsg(
        "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className={dark ? "app dark" : "app light"}>
    {/* ================= Background ================= */}

    <div className="bg"></div>

    {/* ================= Navbar ================= */}

    <nav className="navbar">
      <motion.h1
        className="logo"
        whileHover={{ scale: 1.05 }}
      >
        MyPortfolio
      </motion.h1>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#profiles">Profiles</a>
        <a href="#contact">Contact</a>
      </div>

      <button
        className="toggle"
        onClick={() => setDark(!dark)}
      >
        {dark ? "☀️" : "🌙"}
      </button>
    </nav>

    {/* ================= Hero ================= */}

    <section id="home" className="hero">

      <motion.p
        className="hero-tag"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        👋 Welcome to my portfolio
      </motion.p>

      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Hi, I'm <span>Yagnesh</span>
      </motion.h1>

      <motion.h2
        className="hero-role"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {currentRole}
        <span className="cursor">|</span>
      </motion.h2>

      <motion.p
        className="hero-desc"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Computer Science student at Vignan University
        passionate about building modern full-stack
        applications, extracting insights through data
        analytics, and developing AI-powered solutions.
        I enjoy creating scalable software that solves
        real-world problems.
      </motion.p>

      {/* ================= Buttons ================= */}

      <div className="hero-buttons">

        <a
          href="/resume.pdf"
          className="primary-btn"
          target="_blank"
        >
          📄 Download Resume
        </a>

        <a
          href="#projects"
          className="secondary-btn"
        >
          🚀 View Projects
        </a>

      </div>

      {/* ================= Stats ================= */}

      <div className="stats-grid">

        {stats.map((item, index) => (

          <motion.div
            key={index}
            className="stat-card"
            whileHover={{
              scale: 1.05,
              y: -8
            }}
          >

            <h2>{item.number}</h2>

            <p>{item.label}</p>

          </motion.div>

        ))}

      </div>

      {/* ================= Scroll Indicator ================= */}

      <motion.div
        className="scroll-down"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5
        }}
      >
        ↓ Scroll Down
      </motion.div>

    </section>

        {/* ================= About ================= */}

    <section id="about" className="about">

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <motion.p
        className="about-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        I'm a Computer Science student at Vignan University
        with a passion for building scalable backend systems,
        full-stack web applications, and AI-powered solutions.

        I enjoy solving real-world problems through clean,
        efficient code and continuously expanding my
        knowledge of modern technologies.
      </motion.p>

      {/* ================= Info Cards ================= */}

      <div className="about-grid">

        <motion.div
          className="about-card"
          whileHover={{ y: -8 }}
        >
          <h3>🎓 Education</h3>

          <p>
            <strong>B.Tech - Computer Science</strong>
          </p>

          <p>Vignan University</p>

          <p>2024 - 2028</p>

        </motion.div>

        <motion.div
          className="about-card"
          whileHover={{ y: -8 }}
        >
          <h3>💻 What I Do</h3>

          <ul>

            <li>Full Stack Web Apps</li>

            <li>Database Design</li>

            <li>Data Analytics</li>

            <li>AI-powered Applications</li>

          </ul>

        </motion.div>

        <motion.div
          className="about-card"
          whileHover={{ y: -8 }}
        >
          <h3>🚀 Currently Learning</h3>

          <ul>

            <li>System Design</li>

            <li>Advanced DSA</li>

            <li>Cloud Deployment</li>

          </ul>

        </motion.div>

      </div>

      {/* ================= Highlights ================= 

      <div className="highlights">

        <motion.div
          className="highlight-card"
          whileHover={{ scale: 1.05 }}
        >
          <h2>100+</h2>

          <span>LeetCode Problems Solved</span>

        </motion.div>

        <motion.div
          className="highlight-card"
          whileHover={{ scale: 1.05 }}
        >
          <h2>3+</h2>

          <span>Projects Completed</span>

        </motion.div>

        <motion.div
          className="highlight-card"
          whileHover={{ scale: 1.05 }}
        >
          <h2>6+</h2>

          <span>Technologies Used</span>

        </motion.div>

      </div>==================*/}

    </section>

        {/* ================= Skills ================= */}

    <section id="skills" className="skills">

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Technical Skills
      </motion.h2>

      <motion.p
        className="section-desc"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Technologies I use to build scalable applications,
        modern web experiences, and data-driven solutions.
      </motion.p>

      <div className="category-grid">

        {skillCategories.map((category, index) => (

          <motion.div
            key={index}
            className="category-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -10,
              scale: 1.02
            }}
            transition={{
              duration: 0.4
            }}
            viewport={{ once: true }}
          >

            <h3>{category.title}</h3>

            <div className="skills-list">

              {category.skills.map((skill, i) => (

                <motion.div
                  key={i}
                  className="skill-chip"
                  whileHover={{
                    scale: 1.08
                  }}
                >
                  {skill}
                </motion.div>

              ))}

            </div>

          </motion.div>

        ))}

      </div>

      {/* ================= Core Expertise =================

      <div className="expertise">

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Core Expertise
        </motion.h3>

        <div className="progress-container">

          <div className="progress-item">
            <span>Backend Development</span>

            <div className="progress-bar">

              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                whileInView={{ width: "90%" }}
                transition={{ duration: 1 }}
              />

            </div>
          </div>

          <div className="progress-item">
            <span>React Development</span>

            <div className="progress-bar">

              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                whileInView={{ width: "85%" }}
                transition={{ duration: 1 }}
              />

            </div>
          </div>

          <div className="progress-item">
            <span>Data Analytics</span>

            <div className="progress-bar">

              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                whileInView={{ width: "80%" }}
                transition={{ duration: 1 }}
              />

            </div>
          </div>

          <div className="progress-item">
            <span>Problem Solving</span>

            <div className="progress-bar">

              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                whileInView={{ width: "88%" }}
                transition={{ duration: 1 }}
              />

            </div>
          </div>

        </div>

      </div>

    </section>  ================ */}

        {/* ================= Projects ================= */}

    <section id="projects" className="projects">

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Featured Projects
      </motion.h2>

      <motion.p
        className="section-desc"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        A collection of projects showcasing my skills in
        full-stack development, backend engineering,
        AI integration, and modern web technologies.
      </motion.p>

      <div className="projects-grid">

        {projects.map((project, index) => (

          <motion.div
            key={index}
            className="project-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -10,
              scale: 1.02
            }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >

            <div className="project-header">

              <h3>{project.title}</h3>

              <span className="project-badge">
                Featured
              </span>

            </div>

            <h4 className="project-subtitle">
              {project.subtitle}
            </h4>

            <p className="project-desc">
              {project.desc}
            </p>

            <div className="tech-stack">

              {project.tech.map((tech, i) => (

                <span
                  key={i}
                  className="tech-badge"
                >
                  {tech}
                </span>

              ))}

            </div>

            <div className="project-actions">

              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="live-btn"
              >
                🚀 Live Demo
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-btn"
              >
                💻 GitHub
              </a>

            </div>

          </motion.div>

        ))}

      </div>

      {/* ================= Project Highlights ================= 

      <div className="project-highlights">

        <motion.div
          className="highlight-box"
          whileHover={{ scale: 1.05 }}
        >
          <h3>FoodRush</h3>

          <p>
            MERN-based food delivery platform with
            authentication, admin dashboard,
            payments, and order tracking.
          </p>

        </motion.div>

        <motion.div
          className="highlight-box"
          whileHover={{ scale: 1.05 }}
        >
          <h3>PathPilot</h3>

          <p>
            AI-powered career roadmap generator
            providing personalized learning paths.
          </p>

        </motion.div>

        <motion.div
          className="highlight-box"
          whileHover={{ scale: 1.05 }}
        >
          <h3>Portfolio</h3>

          <p>
            Modern React portfolio featuring
            animations, dark mode,
            responsive design, and EmailJS.
          </p>

        </motion.div>

      </div>

    </section>==========================*/}
        {/* ================= Profiles ================= */}

    <section id="profiles" className="profiles">

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Profiles
      </motion.h2>

      <motion.p
        className="section-desc"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Explore my coding journey, open-source work,
        competitive programming, and professional network.
      </motion.p>

      <div className="profiles-grid">

        {profiles.map((profile, index) => (

          <motion.div
            key={index}
            className="profile-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -10,
              scale: 1.03
            }}
            transition={{
              duration: 0.35
            }}
            viewport={{ once: true }}
          >

            <div className="profile-icon">

              {profile.title === "GitHub" && "💻"}
              {profile.title === "LinkedIn" && "💼"}
              {profile.title === "LeetCode" && "🧩"}
              {profile.title === "CodeChef" && "👨‍🍳"}
              {profile.title === "HackerRank" && "🏆"}
              {profile.title === "HackerEarth" && "🌍"}

            </div>

            <h3>{profile.title}</h3>

            <p>{profile.desc}</p>

            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-btn"
            >
              Visit Profile →
            </a>

          </motion.div>

        ))}

      </div>

      {/* ================= Achievements ================= */}

      <motion.div
        className="achievement-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >

        <h3>Highlights</h3>

        <div className="achievement-grid">

          <div className="achievement-card">
            <h2>100+</h2>
            <p>LeetCode Problems Solved</p>
          </div>


          <div className="achievement-card">
            <h2>3+</h2>
            <p>Projects Built</p>
          </div>

          <div className="achievement-card">
            <h2>6+</h2>
            <p>Technologies Used</p>
          </div>

        </div>

      </motion.div>

    </section>

    {/* ================= Contact ================= */}

    <section id="contact" className="contact">

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Let's Connect
      </motion.h2>

      <motion.p
        className="section-desc"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        Have an opportunity, project, or just want to say hello?
        Feel free to reach out.
      </motion.p>

      <form onSubmit={handleSubmit} className="contact-form">

        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
        />

        <textarea
          name="message"
          rows="6"
          placeholder="Your Message"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="send-btn"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success && (
          <p className="success-msg">
            {success}
          </p>
        )}

        {errorMsg && (
          <p className="error-msg">
            {errorMsg}
          </p>
        )}

      </form>

    </section>

        {/* ================= Footer ================= */}

    <footer className="footer">

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Let's Build Something Amazing 🚀
      </motion.h2>

      <p className="footer-text">
        Thanks for visiting my portfolio. Whether you have an
        opportunity, project idea, or just want to connect,
        I'd love to hear from you.
      </p>

      {/* Contact Cards */}

      <div className="footer-grid">

        <motion.a
          whileHover={{ y: -5 }}
          href="tel:+917671904792"
          className="footer-card"
        >
          <h3>📞 Phone</h3>
          <span>+91 76719 04792</span>
        </motion.a>

        <motion.a
          whileHover={{ y: -5 }}
          href="mailto:yagnesh471@gmail.com"
          className="footer-card"
        >
          <h3>📧 Email</h3>
          <span>yagnesh471@gmail.com</span>
        </motion.a>

        <motion.a
          whileHover={{ y: -5 }}
          href="https://wa.me/917671904792"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-card"
        >
          <h3>💬 WhatsApp</h3>
          <span>Chat with me</span>
        </motion.a>

        <motion.a
          whileHover={{ y: -5 }}
          href="https://instagram.com/yagnesh_.471"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-card"
        >
          <h3>📷 Instagram</h3>
          <span>@yagnesh_.471</span>
        </motion.a>

      </div>

      {/* Quick Links */}

      <div className="footer-links">

        <a href="#home">Home</a>

        <a href="#about">About</a>

        <a href="#skills">Skills</a>

        <a href="#projects">Projects</a>

        <a href="#profiles">Profiles</a>

        <a href="#contact">Contact</a>

      </div>

      {/* Copyright */}

      <p className="copyright">
        © {new Date().getFullYear()} Yagnesh. All Rights Reserved.
      </p>
      <p className="made-by">
          Built with <span className="heart">❤</span> by Yagnesh
      </p>

    </footer>

    {/* Scroll To Top */}

    <motion.button
      className="scroll-top"
      whileHover={{
        scale: 1.1
      }}
      whileTap={{
        scale: 0.95
      }}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      ↑
    </motion.button>

  </div>
);
}
