import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Cpu, Eye, Mic, Code2, ExternalLink,
  ChevronUp, Github, Download, Globe, Sparkles, Command, Play, Pause, Monitor
} from 'lucide-react';
import ClickSpark from './ClickSpark';
import GlitchText from './GlitchText';
import logo from './logo.png';
import LogoLoop from './LogoLoop';
import demoVideo from './Glitch - Made with Clipchamp.mp4';
import { SiElectron, SiReact, SiNodedotjs } from 'react-icons/si';
import { Analytics } from '@vercel/analytics/react';

// --- UI Components ---


const TypewriterEffect = ({ text, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30 + Math.random() * 50); // Random typing speed
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className={`${className} font-mono`}>
      {displayedText}
      <span className="animate-pulse text-primary">_</span>
    </span>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
        y: isVisible ? 0 : 20
      }}
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[60] p-4 rounded-full bg-primary/20 backdrop-blur-xl border border-white/10 text-primary hover:bg-primary/30 transition-all hover:scale-110 group ${!isVisible ? 'pointer-events-none' : ''}`}
    >
      <div className="absolute inset-0 bg-primary opacity-20 blur-lg rounded-full group-hover:opacity-40 transition-opacity" />
      <ChevronUp size={24} className="relative z-10" />
    </motion.button>
  );
};

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{
        type: "tween",
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easeOut curve
      }}
      className="fixed w-full top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            <img src={logo} alt="AI Companion Logo" className="relative w-full h-full object-contain rounded-full" />
          </div>
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={false}
            className="font-bold text-xl tracking-tight"
          >
            GLITCH
          </GlitchText>
        </a>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          {['Demo', 'Features', 'Capabilities', 'Tech Stack'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-primary transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/KirthanNB/AI-Companion"
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 border border-white/5 hover:border-white/20"
          >
            <Github size={16} />
            <span className="hidden sm:inline">Star</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
      <div className="absolute right-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-secondary opacity-20 blur-[100px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-400 font-medium backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              v1.0.5 Now Available
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight max-w-4xl"
          >
            The AI That Lives On <br />
            <span className="gradient-text">Your Desktop</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Your intelligent, proactive, and charming desktop assistant.
            Powered by <span className="text-white font-semibold">Gemini</span> (Google Live) working together to see, speak, and do.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <a
              href="https://github.com/KirthanNB/AI-Companion/releases/download/v1.0.5/AI-Desktop-Companion-Setup-Glitch-v.1.0.5.exe"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary px-8 font-medium text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,242,255,0.5),0_0_60px_rgba(112,0,255,0.3)]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
              <span className="flex items-center gap-2">
                <Download size={20} />
                Download for Windows
              </span>
            </a>

            <a
              href="https://github.com/KirthanNB/AI-Companion#readme"
              className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2 font-medium"
            >
              <ExternalLink size={18} />
              Documentation
            </a>
          </motion.div>

          {/* Floating Terminal Preview */}
          <motion.div
            style={{ y, opacity }}
            className="mt-20 w-full max-w-4xl perspective-1000"
          >
            <div className="relative bg-[#0a0a0a] rounded-xl border border-white/10 shadow-2xl overflow-hidden transform rotate-x-12">
              <div className="flex items-center px-4 py-3 bg-[#161616] border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="ml-4 text-xs text-gray-500 font-mono flex items-center gap-2">
                  <Command size={12} />
                  ai-companion-agent
                </div>
              </div>
              <div className="p-6 font-mono text-sm text-left min-h-[240px]">
                <div className="flex gap-2 mb-4">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-400">user: "Create a React portfolio website"</span>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2 text-primary">
                    <span>●</span>
                    <span>AI Agent thinking...</span>
                  </div>
                  <div className="pl-4 border-l-2 border-white/10 space-y-1 text-gray-300">
                    <TypewriterEffect text="> Analyzing request parameters..." />
                    <br />
                    <TypewriterEffect text="> Scaffolding project structure with Vite..." />
                    <br />
                    <TypewriterEffect text="> Installing dependencies: react, tailwindcss, framer-motion..." />
                    <br />
                    <TypewriterEffect text="> Generating components: Hero, About, Projects..." />
                    <br />
                    <span className="text-green-400">✔ Project created successfully! Opening VS Code...</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CyberFeatures = () => {
  const features = [
    {
      title: "Neural Core",
      subtitle: "Gemini",
      desc: "The brain of the operation. With a 1M token context window, it doesn't just read your code—it understands your entire project architecture. It plans, reasons, and executes complex refactors in seconds.",
      icon: Cpu,
      color: "text-cyan-400",
      visual: (
        <div className="relative w-full h-64 bg-black/50 rounded-xl border border-cyan-500/30 overflow-hidden font-mono text-xs p-4">
          <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
          <div className="space-y-1 text-cyan-300/80">
            <div className="flex gap-2"><span className="text-cyan-500">const</span> <span>agent</span> = <span className="text-yellow-400">new</span> <span>GameAgent</span>();</div>
            <div className="flex gap-2"><span className="text-purple-400">await</span> <span>agent.analyze(</span><span className="text-green-400">"src/"</span><span>);</span></div>
            <div className="text-gray-500">// Analyzing dependency graph...</div>
            <div className="text-gray-500">// 45 files detected</div>
            <div className="text-gray-500">// Optimizing render cycles...</div>
            <div className="flex gap-2"><span className="text-cyan-500">return</span> <span>solution;</span></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
        </div>
      )
    },
    {
      title: "Computer Vision",
      subtitle: "Real-time Analysis",
      desc: "It sees what you see. Using advanced OCR and object detection, it can read error messages, identify UI buttons, and navigate visual interfaces just like a human would.",
      icon: Eye,
      color: "text-purple-400",
      visual: (
        <div className="relative w-full h-64 bg-black/50 rounded-xl border border-purple-500/30 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(168,85,247,0.1)_50%)] bg-[length:100%_4px]" />
          <div className="relative w-32 h-20 border-2 border-purple-500 rounded flex items-center justify-center">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-purple-500" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-purple-500" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-purple-500" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-purple-500" />
            <span className="text-purple-400 text-xs bg-purple-500/10 px-2 py-1">Button: "Deploy"</span>
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500/50 animate-[scan_2s_linear_infinite]" />
        </div>
      )
    },
    {
      title: "Voice Control",
      subtitle: "Google Live Synthesis",
      desc: "Talk naturally. No wake words, no rigid commands. Just fluid conversation powered by ultra-realistic voice synthesis that captures nuance and emotion. Google Live powers seamless AI voice and speech control.",
      icon: Mic,
      color: "text-green-400",
      visual: (
        <div className="relative w-full h-64 bg-black/50 rounded-xl border border-green-500/30 overflow-hidden flex items-center justify-center gap-1">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [20, Math.random() * 100 + 20, 20] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
              className="w-2 bg-green-500/50 rounded-full"
            />
          ))}
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            System Architecture
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              {/* Text Side */}
              <div className="flex-1 space-y-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 ${feature.color} text-sm font-mono`}>
                  <feature.icon size={14} />
                  {feature.subtitle}
                </div>
                <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Visual Side */}
              <div className="flex-1 w-full">
                <div className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${index % 2 === 0 ? 'from-cyan-500 to-blue-500' : 'from-purple-500 to-pink-500'} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000`} />
                  <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-2">
                    {feature.visual}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StackedCapabilities = () => {
  const cards = [
    {
      title: "Automated Coder",
      category: "Development",
      desc: "It doesn't just suggest code; it builds entire features. From scaffolding new projects to refactoring legacy codebases, the agent acts as a senior engineer in your terminal.",
      icon: Code2,
      bg: "from-blue-600/20 to-cyan-600/20",
      border: "border-blue-500/30",
      text: "text-blue-400"
    },
    {
      title: "Visual Assistant",
      category: "Perception",
      desc: "Equipped with state-of-the-art computer vision, it analyzes your screen in real-time. It can detect UI elements, read error logs, and verify visual changes instantly.",
      icon: Eye,
      bg: "from-purple-600/20 to-pink-600/20",
      border: "border-purple-500/30",
      text: "text-purple-400"
    },
    {
      title: "Browser Pilot",
      category: "Automation",
      desc: "A fully autonomous web agent. It can research documentation, scrape data, or interact with web applications to complete complex workflows without human intervention.",
      icon: Globe,
      bg: "from-orange-600/20 to-red-600/20",
      border: "border-orange-500/30",
      text: "text-orange-400"
    }
  ];

  return (
    <section id="capabilities" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Core Capabilities</h2>
          <p className="text-gray-400 text-xl max-w-2xl">
            Autonomous agents designed to handle specific domains of your workflow.
          </p>
        </div>

        <div className="relative">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`sticky top-32 mb-12 p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl`}
              style={{ top: 130 + index * 40, zIndex: index + 1 }}
            >
              <div className={`relative overflow-hidden rounded-[22px] bg-[#0a0a0a] border ${card.border} p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center`}>
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${card.bg} blur-[120px] opacity-40 rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2`} />

                {/* Icon Box */}
                <div className={`relative shrink-0 w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${card.text}`}>
                  <card.icon size={40} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1">
                  <span className={`inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-4 ${card.text}`}>
                    {card.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">{card.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                    {card.desc}
                  </p>
                </div>

                {/* Decorative Number */}
                <div className="absolute bottom-4 right-8 text-[120px] font-bold text-white/5 leading-none select-none font-mono">
                  0{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechStack = () => {
  const techLogos = [
    { node: <Sparkles size={32} className="text-blue-400" />, title: "Gemini", href: "https://deepmind.google/technologies/gemini/" },
    { node: <Mic size={32} className="text-green-400" />, title: "Google Live", href: "https://deepmind.google/technologies/gemini/" },
    { node: <SiElectron size={32} className="text-cyan-400" />, title: "Electron", href: "https://www.electronjs.org" },
    { node: <SiReact size={32} className="text-blue-500" />, title: "React", href: "https://react.dev" },
    { node: <SiNodedotjs size={32} className="text-green-500" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <Command size={32} className="text-orange-400" />, title: "Nut.js", href: "https://nutjs.dev" },
  ];

  return (
    <section id="tech-stack" className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-6 text-center mb-12">
        <p className="text-gray-500 font-medium tracking-widest uppercase text-sm">Powered by Modern Technology</p>
      </div>

      <div className="w-full">
        <LogoLoop
          logos={techLogos}
          speed={50}
          direction="left"
          logoHeight={48}
          gap={80}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#0a0a0a"
          ariaLabel="Technology partners"
        />
      </div>
    </section>
  );
};

const DemoSection = () => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      const newTime = clickPosition * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(clickPosition * 100);
    }
  };

  return (
    <section id="demo" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-primary opacity-10 blur-[150px]" />
      <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary opacity-15 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-400 font-medium backdrop-blur-sm mb-6">
            <Monitor size={16} />
            <span>See It In Action</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Watch GLITCH Work
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Experience the power of your AI desktop companion. See how it analyzes, codes, and interacts seamlessly.
          </p>
        </motion.div>

        {/* Video Container with Monitor Frame */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700" />

            {/* Monitor Frame */}
            <div className="relative bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Monitor Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <Monitor size={12} />
                  <span>GLITCH Demo</span>
                </div>
                <div className="w-16" /> {/* Spacer for balance */}
              </div>

              {/* Video Container */}
              <div
                className="relative aspect-video bg-black"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                <video
                  ref={videoRef}
                  src={demoVideo}
                  className="w-full h-full object-cover"
                  onEnded={handleVideoEnd}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  playsInline
                />

                {/* Center Play/Pause Button (smaller) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showControls || !isPlaying ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all cursor-pointer"
                  onClick={togglePlay}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlay}
                    className="relative w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.4)] hover:shadow-[0_0_50px_rgba(0,242,255,0.6)] transition-shadow"
                  >
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-md" />
                    {isPlaying ? (
                      <Pause size={22} className="relative z-10 text-white" />
                    ) : (
                      <Play size={22} className="relative z-10 text-white ml-0.5" />
                    )}
                  </motion.button>
                </motion.div>

                {/* Video Controls Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: showControls || !isPlaying ? 1 : 0, y: showControls || !isPlaying ? 0 : 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Progress Bar */}
                  <div
                    ref={progressRef}
                    className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer group/progress mb-3 hover:h-2 transition-all"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative transition-all"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Play/Pause Button */}
                      <button
                        onClick={togglePlay}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        {isPlaying ? (
                          <Pause size={16} className="text-white" />
                        ) : (
                          <Play size={16} className="text-white ml-0.5" />
                        )}
                      </button>

                      {/* Time Display */}
                      <span className="text-xs text-gray-300 font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    {/* Right side - can add volume, fullscreen etc later */}
                    <div className="text-xs text-gray-400 font-medium">
                      GLITCH Demo
                    </div>
                  </div>
                </motion.div>

                {/* Corner Decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50 pointer-events-none" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50 pointer-events-none" />
              </div>
            </div>

            {/* Monitor Stand */}
            <div className="relative mx-auto">
              <div className="w-24 h-8 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] mx-auto" />
              <div className="w-40 h-2 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] mx-auto rounded-b-full" />
            </div>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-16"
        >
          {[
            { icon: Eye, text: "Real-time Screen Analysis" },
            { icon: Code2, text: "Intelligent Code Generation" },
            { icon: Mic, text: "Natural Voice Interaction" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <item.icon size={18} className="text-primary" />
              <span className="text-gray-300 text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-white/10 bg-[#050505]">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-50" />
            <img src={logo} alt="GLITCH Logo" className="relative w-full h-full object-contain rounded-full" />
          </div>
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={false}
            className="font-bold text-lg tracking-tight"
          >
            GLITCH
          </GlitchText>
        </div>
        <div className="text-gray-500 text-sm">
          © 2025 GLITCH | AI Desktop Companion. Open Source Project.
        </div>
        <div className="flex gap-6">
          <a href="https://github.com/KirthanNB/AI-Companion" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="bg-dark text-white min-h-screen selection:bg-primary/30 font-sans">
        <ScrollToTop />
        <Navbar />
        <Hero />
        <DemoSection />
        <CyberFeatures />
        <StackedCapabilities />
        <TechStack />
        <Footer />
        <Analytics />
      </div>
    </ClickSpark>
  );
}

export default App;
