import React, { useCallback, useEffect, useState } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Gamepad2, Bot, Palette, Code, Mail,
  Briefcase, ExternalLink, User, Menu, X, Home, ChevronDown,
  GraduationCap, Award, Download, Cpu, Sparkles
} from 'lucide-react';

// --- CUSTOM TYPEWRITER HOOK ---
const useTypewriter = (words, speed = 150, deleteSpeed = 100) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? deleteSpeed : speed);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words, speed, deleteSpeed]);

  return text;
};

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const activeRole = useTypewriter(['Software Developer', 'Game Developer', 'UI/UX Expert', 'AI Explorer']);

  // --- FONT LOADING ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // --- PARTICLES CONFIG ---
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: { value: 100, density: { enable: true, area: 800 } },
      color: { value: ["#ffffff", "#cbd5e1"] },
      opacity: { value: 0.8, random: { enable: true, minimumValue: 0.1 }, animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false } },
      size: { value: 2, random: { enable: true, minimumValue: 1 } },
      links: { enable: true, distance: 150, color: "#cbd5e1", opacity: 0.15, width: 1 },
      move: { enable: true, speed: 0.6, direction: "none", random: false, straight: false, outModes: { default: "out" } }
    },
    detectRetina: true,
  };

  // --- NAVIGATION LINKS ---
  const navLinks = [
    { name: "Home", id: "hero", icon: <Home size={18} /> },
    { name: "About", id: "about", icon: <User size={18} /> },
    { name: "Skills", id: "skills", icon: <Cpu size={18} /> },
    { name: "Experience", id: "experience", icon: <Briefcase size={18} /> },
    { name: "Education", id: "education", icon: <GraduationCap size={18} /> },
    { name: "Projects", id: "projects", icon: <Code size={18} /> },
    { name: "Contact", id: "contact", icon: <Mail size={18} /> },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsNavOpen(false);
  };

  return (
    <div className="font-['Nunito'] bg-slate-50 text-slate-900 selection:bg-purple-500 selection:text-white">

      {/* --- NAVIGATION BAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer" onClick={() => scrollToSection('hero')}>
            PM.
          </span>

          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => scrollToSection(link.id)} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                {link.icon} {link.name}
              </button>
            ))}
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isNavOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-b border-slate-200 overflow-hidden">
              <div className="flex flex-col p-4 gap-4">
                {navLinks.map((link) => (
                  <button key={link.name} onClick={() => scrollToSection(link.id)} className="flex items-center gap-3 text-lg font-medium text-slate-700 p-2 hover:bg-slate-50 rounded-lg">
                    <span className="text-blue-500">{link.icon}</span> {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f172a] to-[#000000] z-0"></div>
        <div className="absolute inset-0 z-0">
          <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="h-full w-full" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mt-10">
          {/* Profile Placeholder */}
          <motion.div whileHover={{ scale: 1.05 }} className="mx-auto mb-8 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 p-1 shadow-2xl shadow-purple-500/30">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
               <User className="w-16 h-16 text-slate-400" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
            It's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Patrick Muraya</span>
          </h1>

          <div className="h-8 md:h-12 mb-8">
            <span className="text-xl md:text-3xl font-light text-slate-300">
              I am a <span className="font-semibold text-cyan-400">{activeRole}</span>
              <span className="animate-pulse text-cyan-400">|</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <SocialButton href="https://github.com/" icon={<Github />} label="GitHub" dark />
            <SocialButton href="https://linkedin.com/" icon={<Linkedin />} label="LinkedIn" dark />
            <SocialButton href="mailto:patrick@example.com" icon={<Mail />} label="Email" dark />
          </div>

          <div className="flex justify-center">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-105 backdrop-blur-sm cursor-not-allowed" title="Download currently unavailable">
                <Download size={20} />
                Download CV
            </button>
          </div>

          <motion.button onClick={() => scrollToSection('about')} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 hover:text-white">
            <ChevronDown size={32} />
          </motion.button>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col gap-24 md:gap-32">

        {/* ABOUT SECTION */}
        <Section id="about" title="About Me" icon={<User />}>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow duration-300">
            <p className="text-lg leading-relaxed text-slate-600">
              Hello! I'm Patrick, a multidisciplinary developer bridging the gap between <strong className="text-blue-600">complex backend logic</strong> and <strong className="text-purple-600">immersive user experiences</strong>. My background in game development gives me a unique perspective on performance and interactivity in web apps.
            </p>
            <p className="text-lg leading-relaxed text-slate-600 mt-4">
              I thrive in environments where code meets creativity. Whether I'm architecting a scalable API, tweaking shader code for a game, or designing a pixel-perfect UI, I bring a holistic approach to every project.
            </p>
          </div>
        </Section>

        {/* SKILLS SECTION (Separated) */}
        <Section id="skills" title="Tech Stack & Skills" icon={<Cpu />}>
          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SkillPill icon={<Code />} label="Software" color="bg-blue-50 text-blue-600" />
              <SkillPill icon={<Gamepad2 />} label="Game Dev" color="bg-purple-50 text-purple-600" />
              <SkillPill icon={<Palette />} label="UI/UX" color="bg-pink-50 text-pink-600" />
              <SkillPill icon={<Bot />} label="AI Agents" color="bg-emerald-50 text-emerald-600" />
              <SkillPill icon={<Code />} label="React & Next.js" color="bg-cyan-50 text-cyan-600" />
              <SkillPill icon={<Gamepad2 />} label="Unity & C#" color="bg-slate-100 text-slate-600" />
              <SkillPill icon={<Palette />} label="Figma" color="bg-orange-50 text-orange-600" />
              <SkillPill icon={<Bot />} label="Python & LLMs" color="bg-yellow-50 text-yellow-600" />
            </div>
          </div>
        </Section>

        {/* EXPERIENCE SECTION */}
        <Section id="experience" title="Experience" icon={<Briefcase />}>
          <div className="space-y-8 border-l-2 border-slate-200 ml-3 pl-8 py-2">
            <TimelineItem
              role="Senior Software Developer"
              company="Tech Solutions Ltd"
              date="2023 - Present"
              desc="Leading frontend migration to React/Next.js. Improved performance by 40%."
            />
            <TimelineItem
              role="Game Developer"
              company="Indie Studio"
              date="2021 - 2023"
              desc="Developed gameplay mechanics for Unity 2D platformers. Managed asset pipelines."
            />
            <TimelineItem
              role="UI/UX Designer"
              company="Freelance"
              date="2019 - 2021"
              desc="Designed responsive websites and conducted user research for local businesses."
            />
          </div>
        </Section>

        {/* EDUCATION SECTION */}
        <Section id="education" title="Education" icon={<GraduationCap />}>
          <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-blue-600">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Bachelor of Science in Computer Science</h3>
                <p className="text-blue-600 font-semibold">Kenyatta University, Kenya</p>
              </div>
              <span className="mt-2 md:mt-0 px-3 py-1 bg-slate-100 text-slate-600 text-sm font-bold rounded-full w-fit">
                Graduated 2023
              </span>
            </div>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Focused on Software Engineering, Data Structures, and Artificial Intelligence.
              Active member of the University Tech Club and Lead Developer for the final year capstone project.
            </p>
          </div>
        </Section>

        {/* CERTIFICATES SECTION */}
        <Section id="certificates" title="Certifications" icon={<Award />}>
          <div className="grid md:grid-cols-2 gap-6">
            <CertificateCard
              title="Google UX Design Professional Certificate"
              issuer="Google (Coursera)"
              date="2024"
            />
            <CertificateCard
              title="Unity Certified Associate: Game Developer"
              issuer="Unity Technologies"
              date="2023"
            />
            <CertificateCard
              title="Meta Front-End Developer Professional Certificate"
              issuer="Meta (Coursera)"
              date="2023"
            />
            <CertificateCard
              title="AWS Certified Cloud Practitioner"
              issuer="Amazon Web Services"
              date="2022"
            />
          </div>
        </Section>

        {/* PROJECTS SECTION */}
        <Section id="projects" title="Selected Projects" icon={<Code />}>
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              title="AI Chat Assistant"
              desc="Smart chatbot using OpenAI API for real-time code debugging."
              tags={['React', 'Node.js', 'OpenAI']}
              color="blue"
            />
            <ProjectCard
              title="Neon Racer"
              desc="High-speed endless runner built in Unity with procedural generation."
              tags={['Unity', 'C#', '3D Modeling']}
              color="purple"
            />
            <ProjectCard
              title="FinTrack Kenya"
              desc="Mobile-first finance tracker with MPESA payment integration."
              tags={['React Native', 'Firebase']}
              color="emerald"
            />
            <ProjectCard
              title="Design System V1"
              desc="Comprehensive UI kit for rapid prototyping and accessible design."
              tags={['Figma', 'Storybook']}
              color="pink"
            />
          </div>
        </Section>

        {/* CONTACT SECTION */}
        <Section id="contact" title="Get in Touch" icon={<Mail />}>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl text-center shadow-2xl text-white relative overflow-hidden">
            {/* Decorative Sparkles */}
            <Sparkles className="absolute top-4 left-4 text-yellow-400 opacity-20" size={40} />
            <Sparkles className="absolute bottom-4 right-4 text-purple-400 opacity-20" size={40} />

            <h3 className="text-2xl md:text-3xl font-bold mb-4">Let's build something amazing.</h3>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              I'm currently available for freelance work and full-time positions.
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:patrick@example.com" className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-full font-bold transition-all shadow-lg shadow-blue-500/30">
                <Mail size={20} />
                Say Hello
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-all border border-white/10">
                <Linkedin size={20} />
                LinkedIn
              </a>
            </div>
          </div>
        </Section>

      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="flex justify-center gap-6 mb-8">
          <SocialButton href="#" icon={<Github />} label="" dark />
          <SocialButton href="#" icon={<Linkedin />} label="" dark />
          <SocialButton href="mailto:patrick@example.com" icon={<Mail />} label="" dark />
        </div>
        <p className="text-sm opacity-60">© {new Date().getFullYear()} Patrick Muraya • Kenya 🇰🇪</p>
      </footer>

    </div>
  );
}

// --- SUB-COMPONENTS ---

function Section({ id, title, icon, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function SkillPill({ icon, label, color }) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl ${color} transition-transform hover:-translate-y-1`}>
      <div className="mb-2 text-2xl">{icon}</div>
      <span className="font-bold text-sm">{label}</span>
    </div>
  );
}

function TimelineItem({ role, company, date, desc }) {
  return (
    <div className="relative">
      <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-blue-600 shadow-md"></span>
      <h3 className="text-xl font-bold text-slate-800">{role}</h3>
      <div className="flex items-center gap-2 text-sm text-slate-500 font-semibold mb-2">
        <span>{company}</span>
        <span>•</span>
        <span>{date}</span>
      </div>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function CertificateCard({ title, issuer, date }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
      <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
        <Award size={24} />
      </div>
      <div>
        <h3 className="font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500">{issuer}</p>
        <span className="text-xs font-mono text-slate-400 mt-1 block">{date}</span>
      </div>
    </div>
  );
}

function ProjectCard({ title, desc, tags, color }) {
  const colors = {
    blue: "border-blue-500 hover:shadow-blue-200",
    purple: "border-purple-500 hover:shadow-purple-200",
    emerald: "border-emerald-500 hover:shadow-emerald-200",
    pink: "border-pink-500 hover:shadow-pink-200",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white p-6 rounded-2xl border-l-4 shadow-md hover:shadow-xl transition-all duration-300 ${colors[color] || colors.blue}`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        <ExternalLink className="text-slate-400 hover:text-blue-600 cursor-pointer" size={20} />
      </div>
      <p className="text-slate-600 mb-6 h-12 overflow-hidden">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs font-bold text-slate-600 bg-slate-100 rounded-md">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function SocialButton({ href, icon, label, dark }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
        dark
          ? "bg-white/10 text-white hover:bg-white/20"
          : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      {icon}
      {label && <span>{label}</span>}
    </a>
  );
}