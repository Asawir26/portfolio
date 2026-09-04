import React, { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Github, Linkedin, Mail, Cloud, BrainCircuit,
  Code2, Database, Terminal, Server, Sparkles, Menu, X,
  ExternalLink, Send, Cpu, Globe2
} from "lucide-react";

const projects = [
  {
    number: "01",
    title: "DecodeLabs · AWS",
    kicker: "CLOUD / INFRASTRUCTURE",
    description:
      "A collection of four hands-on AWS projects covering static hosting, compute, databases and serverless architecture.",
    stack: ["S3", "EC2", "RDS", "Lambda", "Linux", "IAM"],
    link: "https://github.com/Asawir26/DecodeLabs-Internship",
    tone: "navy",
    icon: Cloud,
  },
  {
    number: "02",
    title: "OctaSynx AI Chatbot",
    kicker: "AI / RAG / FULL STACK",
    description:
      "A RAG-powered website assistant that crawls real site content, retrieves relevant knowledge with hybrid search and generates grounded answers with citations.",
    stack: ["Next.js", "FastAPI", "Gemini", "Supabase", "pgvector", "Vercel"],
    link: "https://ai-chatbot-lyart-mu.vercel.app/",
    tone: "cream",
    icon: BrainCircuit,
  },
  {
    number: "03",
    title: "Network Intrusion Detection",
    kicker: "AI / MACHINE LEARNING",
    description:
      "A classical AI and ML NIDS built to distinguish normal traffic from attacks using rule-based reasoning, supervised learning, clustering and feature selection.",
    stack: ["Python", "KNN", "Naive Bayes", "Logistic Regression", "K-Means", "GA"],
    link: null,
    tone: "navy",
    icon: Cpu,
  },
  {
    number: "04",
    title: "Travel Mate",
    kicker: "FULL STACK / WEB",
    description:
      "A destination guide system for searching hotels, discovering nearby attractions, reading reviews and managing favourite travel destinations.",
    stack: ["Flask", "Python", "MySQL", "Jinja2", "HTML", "CSS"],
    link: "https://github.com/Anas348/Travel-Mate",
    tone: "cream",
    icon: Globe2,
  },
];

const skillGroups = [
  { label: "LANGUAGES", items: ["Python", "C++", "JavaScript", "Java"], icon: Code2 },
  { label: "WEB", items: ["HTML5", "CSS3", "React", "Next.js", "Flask", "APIs"], icon: Globe2 },
  { label: "DATA", items: ["MySQL", "MongoDB", "SQLite", "Supabase"], icon: Database },
  { label: "CLOUD", items: ["AWS S3", "EC2", "RDS", "Lambda", "IAM", "Vercel"], icon: Cloud },
  { label: "AI / ML", items: ["RAG", "Gemini", "KNN", "Naive Bayes", "K-Means"], icon: BrainCircuit },
  { label: "TOOLS", items: ["Git", "GitHub", "Linux", "VS Code"], icon: Terminal },
];

function AnimeCat({ className = "" }) {
  return (
    <div className={`cat ${className}`} aria-hidden="true">
      <div className="cat-ear left" />
      <div className="cat-ear right" />
      <div className="cat-head">
        <span className="cat-eye left-eye" />
        <span className="cat-eye right-eye" />
        <span className="cat-nose" />
        <span className="cat-mouth" />
        <span className="cat-blush left-blush" />
        <span className="cat-blush right-blush" />
      </div>
      <div className="cat-body" />
      <div className="cat-tail" />
    </div>
  );
}

function TinyRobot() {
  return (
    <div className="robot" aria-hidden="true">
      <div className="robot-antenna" />
      <div className="robot-head">
        <span /><span />
        <i />
      </div>
      <div className="robot-body"><b /><b /><b /></div>
      <div className="robot-leg l" /><div className="robot-leg r" />
    </div>
  );
}

function LaptopIllustration() {
  return (
    <div className="laptop-art" aria-hidden="true">
      <div className="laptop-screen">
        <div className="code-line w1" /><div className="code-line w2" />
        <div className="code-line w3" /><div className="code-line w4" />
        <div className="screen-star">✦</div>
      </div>
      <div className="laptop-base" />
    </div>
  );
}

function PixelArt({ type = "cat" }) {
  const art = type === "heart"
    ? [
      "01100110",
      "11111111",
      "11111111",
      "01111110",
      "00111100",
      "00011000",
    ]
    : [
      "011000110",
      "111001111",
      "111111111",
      "110111011",
      "111111111",
      "011101110",
      "001000100",
    ];

  return (
    <div className={`pixel-art pixel-${type}`} aria-hidden="true">
      {art.flatMap((row, y) => [...row].map((cell, x) => (
        cell === "1" ? <i key={`${y}-${x}`} style={{ gridColumn: x + 1, gridRow: y + 1 }} /> : null
      )))}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["about", "skills", "work", "contact"];

  return (
    <header className="nav-wrap">
      <a className="brand" href="#top" onClick={() => setOpen(false)}>
        <span className="brand-mark">A</span>
        <span>ASAWIR</span>
      </a>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        {links.map((id) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{id}</a>
        ))}
      </nav>

      <div className="nav-right">
        <span className="availability"><i /> available for opportunities</span>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}

function SectionLabel({ number, children, light = false }) {
  return (
    <div className={`section-label ${light ? "light" : ""}`}>
      <span>{number}</span>
      <span className="label-line" />
      <span>{children}</span>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0, y = 40, once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function DigitalFlower() {
  return (
    <motion.div
      className="digital-flower"
      initial={{ opacity: 0, scale: 0.72 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="flower-glow" />
      <div className="flower-bloom">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className={`flower-petal petal-${i + 1}`} />
        ))}
        <span className="flower-core" />
      </div>
      <div className="flower-scan" />
      <span className="flower-label">DIGITAL BLOOM</span>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="hero page-section" id="top">
      <div className="hero-noise" />
      <DigitalFlower />
      <div className="orbit orbit-one"><span /></div>
      <div className="orbit orbit-two"><span /></div>
      <div className="hero-star star-a">✦</div>
      <div className="hero-star star-b">·</div>
      <motion.div
        className="hero-cat"
        animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <AnimeCat />
      </motion.div>

      <div className="hero-copy">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
        >
          COMPUTER SCIENCE · CLOUD · AI
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .9, delay: .1 }}
        >
          Where logic<br />
          <em>meets creativity.</em>
        </motion.h1>
        <motion.div
          className="hero-name"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .8, delay: .35 }}
        >
          <span>I'm</span> Asawir Asif
        </motion.div>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .8, delay: .5 }}
        >
          I build thoughtful digital experiences at the intersection of
          software, cloud technology and a little bit of imagination.
        </motion.p>
        <motion.a
          href="#work"
          className="hero-cta"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7, delay: .65 }}
        >
          explore my work <ArrowUpRight size={18} />
        </motion.a>
      </div>

      <div className="hero-laptop"><LaptopIllustration /></div>
      <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
    </section>
  );
}

function About() {
  return (
    <section className="about page-section" id="about">
      <Reveal className="about-illustration" y={55}>
        <div className="window">
          <div className="window-bar"><i /><i /><i /></div>
          <div className="window-body">
            <span className="terminal-prompt">$ whoami</span>
            <strong>asawir</strong>
            <span className="terminal-prompt">$ currently</span>
            <strong>learning + building</strong>
            <span className="terminal-prompt">$ mood</span>
            <strong>curious ✦</strong>
          </div>
        </div>
        <TinyRobot />
        <div className="plant"><i /><i /><i /></div>
      </Reveal>

      <Reveal className="about-copy" delay={0.08}>
        <SectionLabel number="02">A LITTLE ABOUT ME</SectionLabel>
        <h2>A developer with a<br /><em>creative streak.</em></h2>
        <p>
          I'm Asawir, a Computer Science student at FAST University with a
          growing obsession for cloud technology, AI and building things that
          feel as good as they function.
        </p>
        <p>
          I enjoy moving between the logical side of software and the visual
          side of design — turning ideas into useful, thoughtful digital
          experiences. I'm especially interested in cloud computing and
          exploring how intelligent systems can become part of everyday products.
        </p>
        <div className="about-note">
          <Sparkles size={17} />
          <span>Currently learning, experimenting & building.</span>
        </div>
      </Reveal>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills page-section" id="skills">
      <Reveal className="skills-head" y={40}>
        <SectionLabel number="03" light>MY TOOLKIT</SectionLabel>
        <h2>Things I like<br /><em>to build with.</em></h2>
        <p>Not a list of percentages. Just the tools that have been part of my learning and building journey.</p>
      </Reveal>

      <Reveal className="skill-orbit" y={50} delay={0.08}>
        <div className="toolkit-pixel toolkit-pixel-cat"><PixelArt type="cat" /></div>
        <div className="toolkit-pixel toolkit-pixel-heart"><PixelArt type="heart" /></div>
        <div className="toolkit-sticker">✦ tiny toolkit ✦</div>
        <div className="skill-center">
          <span>AS</span>
          <small>BUILD / LEARN / REPEAT</small>
        </div>
        <motion.div
          className="skill-rotator"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <div className="skill-ring ring-a" />
          <div className="skill-ring ring-b" />
          {["Python", "AWS", "React", "Git", "AI", "Linux"].map((x, i) => (
            <span key={x} className={`floating-skill s${i + 1}`}>{x}</span>
          ))}
        </motion.div>
      </Reveal>

      <div className="skill-groups">
        {skillGroups.map(({ label, items, icon: Icon }, i) => (
          <Reveal key={label} className="skill-group" delay={i * 0.05} y={25}>
            <div className="skill-group-title"><Icon size={17} /> {label}</div>
            <div className="skill-pills">{items.map((item) => <span key={item}>{item}</span>)}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const Icon = project.icon;
  const isCream = project.tone === "cream";

  return (
    <motion.article
      className={`project-card ${isCream ? "cream-card" : "navy-card"}`}
      initial={{ opacity: 0, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .16 }}
      transition={{ duration: .75, delay: index * .08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, scale: 1.018, rotate: index % 2 === 0 ? -0.35 : 0.35 }}
    >
      <div className="project-top">
        <span>{project.number}</span>
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div className="project-content">
        <p className="project-kicker">{project.kicker}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-stack">{project.stack.map((s) => <span key={s}>{s}</span>)}</div>
      </div>
      {project.link ? (
        <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
          view project <ExternalLink size={16} />
        </a>
      ) : (
        <span className="project-link muted-link">university project <Sparkles size={15} /></span>
      )}
      {project.title.includes("Network") && <div className="pixel-cat"><AnimeCat /></div>}
    </motion.article>
  );
}

function Work() {
  return (
    <section className="work page-section" id="work">
      <div className="work-intro">
        <Reveal y={25} className="work-intro-label">
          <SectionLabel number="04">SELECTED WORK</SectionLabel>
        </Reveal>
        <Reveal y={35}>
          <h2>A few things I've<br /><em>built so far.</em></h2>
        </Reveal>
        <Reveal className="work-intro-copy" y={35} delay={0.08}>
          <p>From cloud infrastructure to intelligent systems and full-stack web apps.</p>
        </Reveal>
      </div>
      <div className="projects">
        {projects.map((p, i) => <ProjectCard project={p} index={i} key={p.title} />)}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:asawirhy123@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="contact page-section" id="contact">
      <motion.div
        className="contact-decoration"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 0.35, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9 }}
      ><TinyRobot /><AnimeCat /></motion.div>
      <Reveal y={25}><SectionLabel number="05" light>LET'S CONNECT</SectionLabel></Reveal>
      <div className="contact-grid">
        <Reveal y={45}>
          <h2>Have an idea?<br /><em>Let's talk.</em></h2>
          <p className="contact-copy">
            Whether it's a project, an opportunity or just a conversation about
            technology — my inbox is open.
          </p>
          <div className="contact-links">
            <a href="mailto:asawirhy123@gmail.com"><Mail size={18} /> asawirhy123@gmail.com</a>
            <a href="https://github.com/Asawir26" target="_blank" rel="noreferrer"><Github size={18} /> github.com/Asawir26</a>
            <a href="https://linkedin.com/in/asawir-binte-asif-468142335" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
          </div>
        </Reveal>

        <Reveal y={45} delay={0.1}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              your name
              <input name="name" required placeholder="How should I call you?" />
            </label>
            <label>
              your email
              <input name="email" type="email" required placeholder="you@example.com" />
            </label>
            <label>
              your message
              <textarea name="message" required rows="5" placeholder="Tell me what's on your mind..." />
            </label>
            <button type="submit">{sent ? "opening your mail app..." : "send message"} <Send size={16} /></button>
            <small>This form uses your email client — no portfolio backend required.</small>
          </form>
        </Reveal>
      </div>

      <footer>
        <span>© 2026 ASAWIR ASIF</span>
        <span>MADE WITH LOGIC & A LITTLE MAGIC ✦</span>
      </footer>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Contact />
      </main>
    </>
  );
}
