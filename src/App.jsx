import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X, MousePointer2 } from "lucide-react";
import * as THREE from "three";

const projects = [
  { number:"01", title:"DecodeLabs · AWS", kicker:"CLOUD / INFRASTRUCTURE", description:"Four hands-on AWS builds spanning static hosting, compute, databases and serverless architecture.", stack:["S3","EC2","RDS","Lambda","Linux","IAM"], link:null },
  { number:"02", title:"OctaSynx AI Chatbot", kicker:"AI / RAG / FULL STACK", description:"A RAG-powered website assistant that crawls live content, retrieves relevant knowledge with hybrid search and answers with citations.", stack:["Next.js","FastAPI","Gemini","Supabase","pgvector","Vercel"], link:"https://ai-chatbot-lyart-mu.vercel.app/" },
  { number:"03", title:"Network Intrusion Detection", kicker:"AI / MACHINE LEARNING", description:"A classical AI and ML NIDS using rule-based reasoning, supervised learning, clustering and feature selection.", stack:["Python","KNN","Naive Bayes","Logistic Regression","K-Means","GA"], link:null },
  { number:"04", title:"Travel Mate", kicker:"FULL STACK / WEB", description:"A destination guide for searching hotels, discovering attractions, reading reviews and managing favourite destinations.", stack:["Flask","Python","MySQL","Jinja2","HTML","CSS"], link:"https://travel-mate-xi-rose.vercel.app/" },
  { number:"05", title:"CipherVault", kicker:"WEB / CYBERSECURITY", description:"A browser-based encryption tool for text and files using modern cryptography and client-side security APIs.", stack:["React","TypeScript","Vite","Tailwind CSS","Web Crypto API","AES-256-GCM","PBKDF2","LocalStorage","Vercel"], link:"https://cipher-vault-gk0emsrzt-asawir.vercel.app/" }
];

const skillGroups = [
  { label:"LANGUAGES", items:["Python","C++","JavaScript","TypeScript","Java"] },
  { label:"WEB", items:["HTML5","CSS3","React","Next.js","Vite","Tailwind CSS","Flask","APIs","Web Crypto API"] },
  { label:"DATA", items:["MySQL","MongoDB","SQLite","Supabase","LocalStorage"] },
  { label:"CLOUD", items:["AWS S3","EC2","RDS","Lambda","IAM","Vercel"] },
  { label:"AI / ML", items:["RAG","Gemini","KNN","Naive Bayes","K-Means"] },
  { label:"SECURITY / CRYPTO", items:["AES-256-GCM","PBKDF2"] },
  { label:"TOOLS", items:["Git","GitHub","Linux","VS Code"] }
];

function Scene({ progress, mouseX, mouseY }) {
  const group = useRef();
  const blob = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progress.get();
    const mx = mouseX.get();
    const my = mouseY.get();
    group.current.rotation.y += delta * 0.07;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (p - .5) * .42 + my * .14, .035);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, mx * .12, .035);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, Math.sin(p * Math.PI * 2) * .9 + mx * .35, .035);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.cos(p * Math.PI * 1.5) * .28 + my * .2, .035);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, p * 1.6, .035);
    if (blob.current) {
      blob.current.rotation.x += delta * .18;
      blob.current.rotation.z += delta * .13;
      blob.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.25) * .045 + p * .12);
    }
    if (ringA.current) { ringA.current.rotation.z -= delta * .2; ringA.current.rotation.y += delta * .1; }
    if (ringB.current) { ringB.current.rotation.x += delta * .08; ringB.current.rotation.y -= delta * .13; }
    target.set(Math.sin(p * 5.5) * .7 + mx * .45, Math.cos(p * 4) * .25 + my * .25, 5.15 - p * 1.65);
    state.camera.position.lerp(target, .022);
    state.camera.lookAt(0, 0, 0);
  });

  return <group ref={group}>
    <Float speed={1.1} rotationIntensity={.45} floatIntensity={.55}>
      <mesh ref={blob}>
        <icosahedronGeometry args={[1.5, 5]} />
        <MeshDistortMaterial color="#111d3f" roughness={.28} metalness={.72} distort={.28} speed={1.1} transparent opacity={.58} />
      </mesh>
    </Float>
    <mesh ref={ringA} rotation={[Math.PI / 2.35, .25, 0]}><torusGeometry args={[2.12,.018,12,160]} /><meshBasicMaterial color="#9fbaff" transparent opacity={.6}/></mesh>
    <mesh ref={ringB} rotation={[.7, .4, 1]}><torusGeometry args={[2.62,.009,8,140]} /><meshBasicMaterial color="#d17aff" transparent opacity={.34}/></mesh>
    <mesh rotation={[1.2,.5,.2]}><torusGeometry args={[1.82,.006,8,120]} /><meshBasicMaterial color="#68e6dd" transparent opacity={.3}/></mesh>
    <Sparkles count={260} scale={[9,7,8]} size={1.5} speed={.28} color="#b7caff" />
    <pointLight position={[2.4,2.1,3]} intensity={7} distance={8} color="#789dff" />
    <pointLight position={[-2.7,-1,2]} intensity={8} distance={7} color="#bd65ff" />
    <pointLight position={[0,-2,-1]} intensity={4} distance={6} color="#54d8d1" />
  </group>;
}

function SceneCanvas({ progress, mouseX, mouseY }) {
  return <div className="scene-canvas">
    <Canvas camera={{position:[0,0,5.2],fov:48}} dpr={[1,1.7]} gl={{antialias:true,alpha:true}}>
      <ambientLight intensity={.35}/><Scene progress={progress} mouseX={mouseX} mouseY={mouseY}/>
    </Canvas>
    <div className="scene-vignette"/><div className="scene-grid"/>
    <div className="color-wash wash-one"/><div className="color-wash wash-two"/>
  </div>;
}

function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x,{stiffness:350,damping:28,mass:.35}), sy = useSpring(y,{stiffness:350,damping:28,mass:.35});
  const [active,setActive] = useState(false);
  useEffect(() => {
    const move = e => { x.set(e.clientX); y.set(e.clientY); };
    const over = e => { if (e.target.closest("a,button,.skill-pill,.project")) setActive(true); };
    const out = e => { if (e.target.closest("a,button,.skill-pill,.project")) setActive(false); };
    window.addEventListener("pointermove",move); document.addEventListener("pointerover",over); document.addEventListener("pointerout",out);
    return () => { window.removeEventListener("pointermove",move); document.removeEventListener("pointerover",over); document.removeEventListener("pointerout",out); };
  },[x,y]);
  return <motion.div className={`cursor ${active ? "cursor-active" : ""}`} style={{left:sx,top:sy}}><span/></motion.div>;
}

function Nav() {
  const [open,setOpen]=useState(false);
  const links=["about","experience","skills","work","contact"];
  return <header className="nav">
    <a href="#top" className="brand" onClick={()=>setOpen(false)}>ASAWIR</a>
    <nav className={open?"open":""}>{links.map(x=><a key={x} href={`#${x}`} onClick={()=>setOpen(false)}>{x}</a>)}</nav>
    <button className="menu" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
  </header>;
}

function Label({n,children}) { return <div className="label"><span>{n}</span><i/>{children}</div>; }
function Reveal({children,className="",delay=0}) { return <motion.div className={className} initial={{opacity:0,y:55,filter:"blur(10px)"}} whileInView={{opacity:1,y:0,filter:"blur(0px)"}} viewport={{once:true,amount:.22}} transition={{duration:.8,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>; }

function Experience() {
  return <section className="content experience" id="experience">
    <div className="experience-orb"><span/></div>
    <Reveal><Label n="03">EXPERIENCE</Label></Reveal>
    <div className="experience-grid">
      <Reveal className="experience-title" delay={.05}><p className="eyebrow">CURRENTLY</p><h2>Building at<br/><em>OctaSynx.</em></h2></Reveal>
      <Reveal className="experience-card" delay={.12}>
        <div className="exp-top"><span>2026 — PRESENT</span><b>INTERNSHIP</b></div>
        <h3>AI Engineer Intern</h3>
        <p>Working at OctaSynx on AI-powered product experiences, intelligent systems and the engineering work that connects retrieval, agents and real-world web products.</p>
        <div className="exp-tags"><span>AI ENGINEERING</span><span>RAG</span><span>LLM SYSTEMS</span><span>WEB</span></div>
        <div className="exp-line"><i/><span>learning · building · shipping</span></div>
      </Reveal>
    </div>
  </section>;
}


function ArtConstellation() {
  const canvasRef = useRef(null);
  const [strokes, setStrokes] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const activeStroke = useRef([]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = 'rgba(196, 216, 245, .82)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    strokes.forEach(stroke => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      stroke.slice(1).forEach(pt => ctx.lineTo(pt.x, pt.y));
      ctx.stroke();
    });
    if (activeStroke.current.length > 1) {
      const stroke = activeStroke.current;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      stroke.slice(1).forEach(pt => ctx.lineTo(pt.x, pt.y));
      ctx.stroke();
    }
  };

  useEffect(() => {
    redrawCanvas();
    const resize = () => redrawCanvas();
    window.addEventListener('resize', resize);
    const observer = canvasRef.current?.parentElement ? new ResizeObserver(resize) : null;
    if (observer && canvasRef.current?.parentElement) observer.observe(canvasRef.current.parentElement);
    return () => {
      window.removeEventListener('resize', resize);
      observer?.disconnect();
    };
  }, [strokes]);

  const toPoint = e => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const begin = e => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDrawing(true);
    activeStroke.current = [toPoint(e)];
    redrawCanvas();
  };

  const move = e => {
    if (!drawing) return;
    const next = toPoint(e);
    const last = activeStroke.current[activeStroke.current.length - 1];
    if (Math.hypot(next.x - last.x, next.y - last.y) < 4) return;
    activeStroke.current.push(next);
    redrawCanvas();
  };

  const finish = () => {
    if (!drawing) return;
    const stroke = activeStroke.current;
    if (stroke.length > 1) setStrokes(prev => [...prev, stroke]);
    setDrawing(false);
    activeStroke.current = [];
    const all = [...strokes, stroke].filter(x => x.length > 1);
    const canvas = canvasRef.current;
    const w = canvas?.getBoundingClientRect().width || 1;
    const h = canvas?.getBoundingClientRect().height || 1;
    const sampled = [];
    all.forEach(path => {
      const step = Math.max(1, Math.floor(path.length / 18));
      path.forEach((pt, i) => {
        if (i % step === 0 || i === path.length - 1) {
          sampled.push({ x: (pt.x / w) * 100, y: (pt.y / h) * 100 });
        }
      });
    });
    setPoints(sampled.slice(-120));
  };

  const clear = () => {
    setStrokes([]);
    setPoints([]);
    activeStroke.current = [];
  };

  const links = [];
  points.forEach((a, i) => {
    let nearest = [];
    points.forEach((b, j) => {
      if (i === j) return;
      const dx = a.x - b.x, dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 13) nearest.push({ j, distance });
    });
    nearest.sort((x, y) => x.distance - y.distance).slice(0, 2).forEach(({j}) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!links.some(l => l.key === key)) links.push({ key, a, b: points[j] });
    });
  });

  return <section className="art-block snap" id="art">
    <div className="art-shell">
      <Reveal><Label n="06">A LITTLE ART</Label><h2>Draw something.<br/><em>I'll turn it into a constellation.</em></h2><p className="section-intro">A tiny corner for the part of me that still likes to make things by hand.</p></Reveal>
      <Reveal className="art-card" delay={.08}>
        <div className="draw-panel">
          <div className="art-panel-head"><span>01 / DRAW</span><button type="button" onClick={clear}>CLEAR</button></div>
          <canvas ref={canvasRef} onPointerDown={begin} onPointerMove={move} onPointerUp={finish} onPointerCancel={finish} onPointerLeave={e => drawing && move(e)} />
          <span className="draw-hint">use your mouse or finger · doodle anything</span>
        </div>
        <div className="constellation-panel">
          <div className="art-panel-head"><span>02 / CONSTELLATION</span><span className="live-dot">LIVE</span></div>
          <div className="constellation-stage">
            {points.length ? <svg viewBox="0 0 100 100" preserveAspectRatio="none">{links.map(l => <line key={l.key} x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} />)}{points.map((p,i) => <circle key={i} cx={p.x} cy={p.y} r=".8" />)}</svg> : <div className="constellation-empty"><span>✦</span><small>your drawing<br/>will live here</small></div>}
          </div>
        </div>
      </Reveal>
    </div>
  </section>;
}

function Project({p,i}) {
  return <motion.article className="project" initial={{opacity:0,y:55}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.7,delay:i*.06}} whileHover={{x:12}}>
    <div className="project-number">{p.number}</div>
    <div className="project-main"><span>{p.kicker}</span><h3>{p.title}</h3><p>{p.description}</p><div className="stack">{p.stack.map(s=><b key={s}>{s}</b>)}</div></div>
    {p.link?<a href={p.link} target="_blank" rel="noreferrer" className="project-arrow"><ArrowUpRight/></a>:<div className="project-arrow muted">✦</div>}
  </motion.article>;
}

export default function App() {
  const {scrollYProgress}=useScroll();
  const progress=useSpring(scrollYProgress,{stiffness:80,damping:22,restDelta:.001});
  const mouseX=useMotionValue(0), mouseY=useMotionValue(0);
  const [sent,setSent]=useState(false);
  useEffect(()=>{ const move=e=>{mouseX.set((e.clientX/window.innerWidth-.5)*2);mouseY.set((e.clientY/window.innerHeight-.5)*-2)}; window.addEventListener("pointermove",move); return()=>window.removeEventListener("pointermove",move)},[mouseX,mouseY]);
  const heroY=useTransform(progress,[0,.2],[0,-110]);
  const submit=e=>{e.preventDefault();const d=new FormData(e.currentTarget);const subject=encodeURIComponent(`Portfolio message from ${d.get("name")}`);const body=encodeURIComponent(`Name: ${d.get("name")}\nEmail: ${d.get("email")}\n\n${d.get("message")}`);window.location.href=`mailto:asawirhy123@gmail.com?subject=${subject}&body=${body}`;setSent(true)};

  return <div className="site">
    <SceneCanvas progress={progress} mouseX={mouseX} mouseY={mouseY}/><Cursor/>
    <motion.div className="scroll-progress" style={{scaleX:progress}}/><Nav/>
    <main>
      <section className="hero snap" id="top">
        <motion.div className="hero-copy" style={{y:heroY}}><p className="eyebrow">COMPUTER SCIENCE · CLOUD · AI</p><h1>Where logic<br/><em>meets creativity.</em></h1><div className="name">ASAWIR ASIF</div><p className="hero-sub">I build thoughtful digital experiences at the intersection of software, cloud technology and a little bit of imagination.</p><a href="#work" className="hero-cta">explore my work <ArrowUpRight size={17}/></a></motion.div>
        <div className="hero-side"><span>MOVE AROUND</span><MousePointer2 size={16}/><small>SCROLL TO ENTER</small></div><div className="hero-code">{`{`} <span>logic</span> + <span>imagination</span> {`}`}</div>
        <div className="hero-hint">01 <i/> 08</div>
      </section>

      <section className="content about snap" id="about"><div className="about-number">02</div><Reveal><Label n="02">A LITTLE ABOUT ME</Label><h2>A developer with a<br/><em>creative streak.</em></h2></Reveal><Reveal className="about-copy" delay={.1}><p>I'm Asawir, a Computer Science student at FAST University with a growing obsession for cloud technology, AI and building things that feel as good as they function.</p><p>I enjoy moving between the logical side of software and the visual side of design — turning ideas into useful, thoughtful digital experiences.</p><div className="signature">AS · BUILD / LEARN / REPEAT</div></Reveal></section>

      <Experience/>

      <section className="content skills snap" id="skills"><div className="skills-watermark">04</div><Reveal><Label n="04">THE TOOLKIT</Label><h2>What I build<br/><em>with.</em></h2><p className="section-intro">The languages, frameworks, platforms and systems I use to turn ideas into working products.</p></Reveal><div className="skill-grid">{skillGroups.map((g,i)=><Reveal key={g.label} className="skill-card" delay={i*.05}><div className="skill-card-head"><span className="skill-index">0{i+1}</span><small>{g.label}</small></div><div className="skill-items">{g.items.map((x,j)=><motion.span className="skill-pill" key={x} whileHover={{y:-3,scale:1.03}}>{x}</motion.span>)}</div></Reveal>)}</div></section>

      <section className="content studio snap" id="studio"><div className="studio-glow"/><Reveal><Label n="05">HOW I WORK</Label><h2>From idea to<br/><em>something real.</em></h2><p className="section-intro">I like the space where engineering, design and intelligent systems overlap. Every project is a small experiment in making technology feel more human.</p></Reveal><div className="studio-steps"><Reveal className="studio-step" delay={.05}><span>01</span><h3>Explore</h3><p>Understand the problem, the people and the experience before touching the code.</p></Reveal><Reveal className="studio-step" delay={.1}><span>02</span><h3>Shape</h3><p>Turn the idea into a visual system, architecture and interaction that make sense together.</p></Reveal><Reveal className="studio-step" delay={.15}><span>03</span><h3>Build</h3><p>Connect interfaces, APIs, data, cloud services and AI into something usable.</p></Reveal><Reveal className="studio-step" delay={.2}><span>04</span><h3>Refine</h3><p>Test, simplify, polish and ship — then keep learning from what happens next.</p></Reveal></div><div className="studio-signal"><span>FAST UNIVERSITY</span><i/><span>OCTASYNX</span><i/><span>AWS</span><i/><span>AI / WEB / CLOUD</span></div></section>

<ArtConstellation/>

<section className="content work snap" id="work"><Reveal><Label n="07">SELECTED WORK</Label><h2>A few things I've<br/><em>built so far.</em></h2></Reveal><div className="projects">{projects.map((p,i)=><Project key={p.title} p={p} i={i}/>)}</div></section>

      <section className="content contact snap" id="contact"><Reveal><Label n="08">LET'S CONNECT</Label></Reveal><div className="contact-grid"><Reveal><h2>Have an idea?<br/><em>Let's talk.</em></h2><p>Whether it's a project, an opportunity or just a conversation about technology — my inbox is open.</p><div className="contact-links"><a href="mailto:asawirhy123@gmail.com"><Mail size={17}/>asawirhy123@gmail.com</a><a href="https://github.com/Asawir26" target="_blank" rel="noreferrer"><Github size={17}/>github.com/Asawir26</a><a href="https://linkedin.com/in/asawir-binte-asif-468142335" target="_blank" rel="noreferrer"><Linkedin size={17}/>LinkedIn</a></div></Reveal><Reveal delay={.1}><form onSubmit={submit}><label>your name<input name="name" required placeholder="How should I call you?"/></label><label>your email<input name="email" type="email" required placeholder="you@example.com"/></label><label>your message<textarea name="message" rows="4" required placeholder="Tell me what's on your mind..."/></label><button>{sent?"opening your mail app...":"send message"}<ArrowUpRight size={16}/></button></form></Reveal></div><footer><span>© 2026 ASAWIR ASIF</span><span>MADE WITH LOGIC & A LITTLE MAGIC ✦</span></footer></section>
    </main>
  </div>;
}
