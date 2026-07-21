import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun, Moon, Heart, Music, X, Send, Copy, Share2,
  ChevronDown, ZoomIn, Check
} from "lucide-react";
import heroBg from "../../backgroung_image.webp";

// ─── GLOBAL KEYFRAMES ────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes goldenGlow {
    0%,100% { filter: drop-shadow(0 0 8px #FFD700) drop-shadow(0 0 16px #FF8C00); }
    50%      { filter: drop-shadow(0 0 14px #FFD700) drop-shadow(0 0 28px #FF8C00); }
  }
  @keyframes lightRay {
    0%,100% { opacity: 0.1; }
    50%      { opacity: 0.35; }
  }
  @keyframes omFloat {
    0%,100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-18px) scale(1.06); }
  }
  @keyframes swingBell {
    0%      { transform: rotate(0deg); }
    15%     { transform: rotate(-18deg); }
    30%     { transform: rotate(14deg); }
    45%     { transform: rotate(-10deg); }
    60%     { transform: rotate(7deg); }
    75%     { transform: rotate(-4deg); }
    100%    { transform: rotate(0deg); }
  }
  @keyframes floatDown {
    0%   { transform: translate3d(0, -5vh, 0) rotate(0deg); }
    25%  { transform: translate3d(30px, 25vh, 0) rotate(90deg); }
    50%  { transform: translate3d(-25px, 55vh, 0) rotate(180deg); }
    75%  { transform: translate3d(18px, 80vh, 0) rotate(270deg); }
    100% { transform: translate3d(0, 110vh, 0) rotate(360deg); }
  }
  @keyframes divaFlicker {
    0%,100% { transform: scaleY(1) scaleX(1); }
    30%     { transform: scaleY(1.15) scaleX(0.9); }
    60%     { transform: scaleY(0.9) scaleX(1.1); }
  }
  @keyframes firefly {
    0%,100% { transform: translate3d(0, 0, 0) scale(0.8); opacity: 0; }
    50%     { transform: translate3d(20px, -30px, 0) scale(1.2); opacity: 0.8; }
  }
  @keyframes shimmerText {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .golden-glow    { animation: goldenGlow 3s ease-in-out infinite; will-change: filter; }
  .bell-ring      { animation: swingBell 0.7s ease-in-out 3; transform-origin: top center; }
  .deva-font      { font-family: 'Noto Serif Devanagari', serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,215,0,0.3); border-radius: 4px; }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const THOUGHTS = [
  "नाम घेतल्याने मन शुद्ध होते.",
  "विठ्ठल भक्तांच्या प्रत्येक संकटात सोबत असतो.",
  "भक्ती हेच जीवनाचे खरे सौंदर्य आहे.",
  "विठ्ठल नाम हेच सर्वश्रेष्ठ धन आहे.",
  "पांडुरंगाचे नाम हे मुक्तीचे द्वार आहे.",
  "संतांच्या पावलांनी चालत राहिल्यास मोक्ष मिळतो."
];

const SANT_VACHAN = [
  { sant: "संत ज्ञानेश्वर माऊली",  vachan: "जो जे वांछील तो ते लाहो। प्राणिजात।।",                              icon: "📿" },
  { sant: "संत तुकाराम महाराज",     vachan: "विठ्ठल नाम हेच अमृत आहे. भक्तीमध्येच खरी शक्ती आहे।।",            icon: "🪔" },
  { sant: "संत नामदेव महाराज",      vachan: "नाम विठोबाचे घेतो, संसार तरतो।। नाम जपता सहज, जगाचे जाते विस्मरण।।", icon: "🌸" },
  { sant: "संत एकनाथ महाराज",      vachan: "हरी नामाचा महिमा, सांगता न पुरे कदा।। भक्तीभाव हाच सर्वश्रेष्ठ मार्ग।।", icon: "🔔" }
];

const ABHANG = [
  "सुंदर ते ध्यान उभे विटेवरी",
  "ज्ञानोबा माऊली तुकाराम",
  "पांडुरंग पांडुरंग पांडुरंग",
  "कर कटावरी ठेवुनी उभे",
  "विठ्ठल विठ्ठल जय हरी विठ्ठल",
  "भक्तांसाठी धावे पांडुरंग",
  "नामाचा गजर करा गजर",
  "वारकऱ्यांचा पांडुरंग",
  "आषाढी एकादशी पवित्र दिन",
  "चंद्रभागेच्या तीरावरी"
];

const GALLERY = [
  { id: "1652604244126-dc7d76c5639e", label: "पांडुरंग मंदिर" },
  { id: "1616262569508-d0a93ed178c4", label: "विठ्ठल-रुक्मिणी" },
  { id: "1590906424086-3dbc808fd54b", label: "वारकरी" },
  { id: "1566915682737-3e97a7eed93b", label: "पालखी" },
  { id: "1616435577207-ca90abc6b732", label: "तुळशी-कमळ" },
  { id: "1578550611600-0eb8cdde069a", label: "दिया" },
  { id: "1474557157379-8aa74a6ef541", label: "कमळ" },
  { id: "1711547979445-a72c87dfd004", label: "दिंडी" }
];

const BLESSINGS = [
  { word: "सुख",       icon: "☀️", delay: 0    },
  { word: "समृद्धी",   icon: "🌾", delay: 0.1  },
  { word: "शांती",     icon: "🕊️", delay: 0.2  },
  { word: "आरोग्य",    icon: "💚", delay: 0.3  },
  { word: "यश",        icon: "⭐", delay: 0.4  },
  { word: "आनंद",      icon: "🌸", delay: 0.5  }
];

// ─── SVG: VITTHAL SILHOUETTE ─────────────────────────────────────────────────
function VitthalSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 220" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Cylindrical crown */}
      <rect x="36" y="8" width="28" height="10" rx="2"/>
      <rect x="41" y="3" width="5" height="9"  rx="1.5"/>
      <rect x="48" y="1" width="5" height="9"  rx="1.5"/>
      <rect x="55" y="3" width="5" height="9"  rx="1.5"/>
      {/* Head */}
      <ellipse cx="50" cy="28" rx="13" ry="14"/>
      {/* Earrings */}
      <circle cx="37" cy="30" r="2.5"/>
      <circle cx="63" cy="30" r="2.5"/>
      {/* Neck */}
      <rect x="45" y="40" width="10" height="7" rx="2"/>
      {/* Body / dhoti */}
      <path d="M32 47 Q50 43 68 47 L70 118 Q50 124 30 118 Z"/>
      {/* Necklace */}
      <path d="M38 50 Q50 56 62 50" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      {/* Left arm on waist */}
      <path d="M32 62 Q14 68 16 80 Q17 87 29 85 L32 74"/>
      {/* Right arm on waist */}
      <path d="M68 62 Q86 68 84 80 Q83 87 71 85 L68 74"/>
      {/* Legs */}
      <rect x="37" y="116" width="12" height="38" rx="4"/>
      <rect x="51" y="116" width="12" height="38" rx="4"/>
      {/* Vit (brick) */}
      <rect x="22" y="153" width="56" height="13" rx="3"/>
      {/* Feet */}
      <rect x="33" y="164" width="14" height="7" rx="3"/>
      <rect x="53" y="164" width="14" height="7" rx="3"/>
    </svg>
  );
}

function RukminiSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 210" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Crown with flowers */}
      <ellipse cx="40" cy="10" rx="14" ry="7"/>
      <circle cx="33" cy="5" r="3"/>
      <circle cx="40" cy="3" r="3"/>
      <circle cx="47" cy="5" r="3"/>
      {/* Head */}
      <ellipse cx="40" cy="27" rx="11" ry="13"/>
      <circle cx="40" cy="21" r="1.8"/>
      {/* Earrings */}
      <circle cx="29" cy="29" r="2"/>
      <circle cx="51" cy="29" r="2"/>
      {/* Neck */}
      <rect x="36" y="39" width="8" height="6" rx="2"/>
      <path d="M30 45 Q40 51 50 45" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      {/* Saree body */}
      <path d="M24 45 Q40 41 56 45 L58 152 Q40 158 22 152 Z"/>
      {/* Right arm blessing mudra */}
      <path d="M56 57 Q72 50 70 40 Q68 35 62 38 L58 50"/>
      {/* Left arm down */}
      <path d="M24 59 Q10 67 12 78 Q13 84 22 82 L24 70"/>
      {/* Feet */}
      <rect x="30" y="150" width="10" height="7" rx="3"/>
      <rect x="42" y="150" width="10" height="7" rx="3"/>
      {/* Base */}
      <rect x="18" y="156" width="44" height="11" rx="3"/>
    </svg>
  );
}

// ─── FLOATING PETALS ─────────────────────────────────────────────────────────
function FloatingPetals({ dark }: { dark: boolean }) {
  const petals = useMemo(() => Array.from({ length: 10 }, (_, i) => {
    const lightColors = ["#FF8C00", "#FFD700", "#FF6B35", "#FFA500", "#FFEC8B"];
    const darkColors  = ["#9B59B6", "#7B2FBE", "#C39BD3", "#6C3483", "#8E44AD"];
    return {
      id: i,
      size:     14 + (i * 7 % 18),
      left:     (i * 19 + 5) % 95,
      delay:    (i * 2.1) % 10,
      duration: 10 + (i * 1.5) % 8,
      color:    (dark ? darkColors : lightColors)[i % (dark ? darkColors : lightColors).length]
    };
  }), [dark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" style={{ willChange: "auto", contain: "strict" }}>
      {petals.map(p => (
        <div
          key={p.id}
          style={{
            position:        "absolute",
            width:           p.size,
            height:          p.size * 0.6,
            left:            `${p.left}%`,
            top:             "-8%",
            backgroundColor: p.color,
            opacity:         0.6,
            borderRadius:    "50% 50% 50% 50% / 60% 60% 40% 40%",
            animation:       `floatDown ${p.duration}s ${p.delay}s linear infinite`,
            willChange:      "transform",
            backfaceVisibility: "hidden"
          }}
        />
      ))}
      {/* Floating Om symbols */}
      {[15, 50, 80].map((left, i) => (
        <div
          key={`om-${i}`}
          className="absolute text-yellow-500/20 text-4xl select-none"
          style={{
            left:      `${left}%`,
            top:       `${25 + i * 25}%`,
            animation: `omFloat ${5 + i}s ${i * 1.2}s ease-in-out infinite`,
            willChange: "transform"
          }}
        >
          ॐ
        </div>
      ))}
    </div>
  );
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), 2000);
    const t2 = setTimeout(onDone, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0600 0%, #0d0300 100%)" }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      {/* Sparkle particles */}
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-yellow-400"
          style={{
            width:     1 + (i % 3),
            height:    1 + (i % 3),
            left:      `${(i * 13 + 5) % 100}%`,
            top:       `${(i * 17 + 8) % 100}%`,
            opacity:   0.2 + (i % 5) * 0.1,
            animation: `omFloat ${3 + (i % 4)}s ${(i % 5) * 0.4}s ease-in-out infinite`
          }}
        />
      ))}

      {/* Temple doors */}
      <div className="absolute inset-0 flex">
        {/* Left door */}
        <motion.div
          className="flex-1 h-full"
          style={{
            background: "linear-gradient(135deg, #2d1200 0%, #1a0800 60%, #0d0300 100%)",
            borderRight: "1px solid rgba(255,215,0,0.25)"
          }}
          animate={open ? { x: "-100%" } : { x: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="h-full flex flex-col justify-between py-12 pr-8 pl-4 items-end opacity-30">
            {[0,1,2,3].map(i => (
              <div key={i} className="w-8 h-1 bg-yellow-700 rounded"/>
            ))}
          </div>
        </motion.div>
        {/* Right door */}
        <motion.div
          className="flex-1 h-full"
          style={{
            background: "linear-gradient(225deg, #2d1200 0%, #1a0800 60%, #0d0300 100%)",
            borderLeft: "1px solid rgba(255,215,0,0.25)"
          }}
          animate={open ? { x: "100%" } : { x: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="h-full flex flex-col justify-between py-12 pl-8 pr-4 opacity-30">
            {[0,1,2,3].map(i => (
              <div key={i} className="w-8 h-1 bg-yellow-700 rounded"/>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Centre content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="text-[100px] leading-none golden-glow"
          style={{ color: "#FFD700" }}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: "backOut" }}
        >
          ॐ
        </motion.div>
        <motion.p
          className="deva-font text-yellow-200 text-2xl tracking-widest mt-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          जय हरी विठ्ठल
        </motion.p>
        <motion.div
          className="flex gap-3 mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {[0, 0.22, 0.44].map((d, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-yellow-500"
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, delay: d, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── SCROLL PROGRESS ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        if (barRef.current) barRef.current.style.width = `${pct}%`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50" style={{ contain: "layout style" }}>
      <div
        ref={barRef}
        className="h-full"
        style={{ width: "0%", background: "linear-gradient(90deg, #FF6B35, #FFD700, #FF8C00)", willChange: "width", transition: "width 80ms linear" }}
      />
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const h = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        ticking = false;
      });
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className="fixed top-[3px] left-0 right-0 z-40 flex items-center justify-between px-6 md:px-14 py-3 transition-all duration-500"
      style={{
        background:    scrolled ? "rgba(13,4,0,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom:  scrolled ? "1px solid rgba(255,215,0,0.1)" : "none"
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl golden-glow" style={{ color: "#FFD700" }}>ॐ</span>
        <span className="deva-font text-yellow-200 text-base hidden sm:block tracking-wide">आषाढी एकादशी</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="deva-font text-yellow-500/50 text-sm hidden md:block">जय हरी विठ्ठल</span>
        <button
          onClick={onToggle}
          className="p-2 rounded-full transition-all duration-300 hover:scale-110"
          style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.2)" }}
          title={dark ? "सूर्यप्रकाश" : "रात्र दृश्य"}
        >
          {dark
            ? <Sun  size={17} className="text-yellow-300"/>
            : <Moon size={17} className="text-yellow-300"/>
          }
        </button>
      </div>
    </nav>
  );
}

// ─── BELL SOUND GENERATOR (Traditional Temple Ghanta) ─────────────────────────
function playBellSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = ctx.currentTime;
    const duration = 4.0;

    // Master compressor to prevent clipping
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-12, now);
    compressor.knee.setValueAtTime(10, now);
    compressor.ratio.setValueAtTime(4, now);
    compressor.connect(ctx.destination);

    // Convolver for metallic reverb-like effect
    const convGain = ctx.createGain();
    convGain.gain.setValueAtTime(0.15, now);
    convGain.connect(compressor);

    // Temple bell has inharmonic partials — these frequencies create the
    // characteristic metallic "ghaaan" sound of a brass ghanta
    const partials = [
      { freq: 280,  gain: 0.30, decay: 3.5, type: "sine" as OscillatorType },    // Deep fundamental
      { freq: 283,  gain: 0.25, decay: 3.3, type: "sine" as OscillatorType },    // Slight detune for beating
      { freq: 560,  gain: 0.22, decay: 2.8, type: "sine" as OscillatorType },    // 2nd partial
      { freq: 563,  gain: 0.18, decay: 2.6, type: "sine" as OscillatorType },    // Beating pair
      { freq: 845,  gain: 0.14, decay: 2.2, type: "sine" as OscillatorType },    // 3rd partial (inharmonic)
      { freq: 1135, gain: 0.10, decay: 1.8, type: "sine" as OscillatorType },    // 4th partial
      { freq: 1428, gain: 0.07, decay: 1.4, type: "sine" as OscillatorType },    // 5th partial
      { freq: 1730, gain: 0.04, decay: 1.0, type: "sine" as OscillatorType },    // 6th (shimmer)
      { freq: 2200, gain: 0.03, decay: 0.7, type: "sine" as OscillatorType },    // High shimmer
    ];

    partials.forEach(p => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = p.type;
      osc.frequency.setValueAtTime(p.freq, now);
      // Slight pitch bend down on strike
      osc.frequency.setValueAtTime(p.freq * 1.008, now);
      osc.frequency.exponentialRampToValueAtTime(p.freq, now + 0.06);
      gain.gain.setValueAtTime(p.gain, now);
      // Sharp attack then long exponential decay (resonant bell)
      gain.gain.setTargetAtTime(p.gain * 0.7, now + 0.003, 0.01);
      gain.gain.setTargetAtTime(0.0001, now + 0.08, p.decay * 0.45);
      osc.connect(gain);
      gain.connect(compressor);
      // Also send to reverb
      const revSend = ctx.createGain();
      revSend.gain.setValueAtTime(0.08, now);
      osc.connect(revSend);
      revSend.connect(convGain);
      osc.start(now);
      osc.stop(now + duration);
    });

    // Strike impact — the metallic "thak" when the clapper hits
    const noiseLength = ctx.sampleRate * 0.04;
    const noiseBuffer = ctx.createBuffer(1, noiseLength, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseLength; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / noiseLength, 3);
    }
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    // Band-pass filter to shape the strike
    const strikeFilter = ctx.createBiquadFilter();
    strikeFilter.type = "bandpass";
    strikeFilter.frequency.setValueAtTime(1800, now);
    strikeFilter.Q.setValueAtTime(2, now);
    const strikeGain = ctx.createGain();
    strikeGain.gain.setValueAtTime(0.35, now);
    strikeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    noiseNode.connect(strikeFilter);
    strikeFilter.connect(strikeGain);
    strikeGain.connect(compressor);
    noiseNode.start(now);

    // Cleanup
    setTimeout(() => ctx.close(), (duration + 0.5) * 1000);
  } catch {
    // Web Audio not supported, silent fallback
  }
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [bellRinging, setBellRinging] = useState(false);
  const bellRef = useRef<SVGSVGElement>(null);

  const ringBell = () => {
    if (bellRinging) return;
    setBellRinging(true);
    playBellSound();

    // Restart CSS animation by removing class, forcing reflow, then re-adding
    const svg = bellRef.current;
    if (svg) {
      svg.classList.remove("bell-ring");
      void svg.offsetWidth; // force reflow
      svg.classList.add("bell-ring");
    }

    setTimeout(() => setBellRinging(false), 2200);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* BG image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="पांडुरंग वारी"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(13,4,0,0.72) 0%, rgba(13,4,0,0.42) 40%, rgba(13,4,0,0.92) 100%)"
        }}/>
      </div>

      {/* Light rays */}
      {[-60, -30, 0, 30, 60].map((angle, i) => (
        <div
          key={i}
          className="absolute top-0 left-1/2 pointer-events-none"
          style={{
            width: "2px", height: "55vh",
            background: "linear-gradient(180deg, rgba(255,215,0,0.4) 0%, transparent 100%)",
            transform:  `translateX(-50%) rotate(${angle}deg)`,
            transformOrigin: "top center",
            animation: `lightRay ${2.5 + i * 0.4}s ${i * 0.3}s ease-in-out infinite`
          }}
        />
      ))}

      {/* Temple bell */}
      <div className="absolute top-20 right-10 md:right-20 z-20">
        <button
          onClick={ringBell}
          className="group flex flex-col items-center gap-1"
          style={{ cursor: "pointer" }}
        >
          <svg
            ref={bellRef}
            width="38" height="52" viewBox="0 0 40 56" fill="#FFD700"
            className="drop-shadow-lg"
            style={{
              filter: bellRinging
                ? "drop-shadow(0 0 20px rgba(255,215,0,0.9))"
                : "drop-shadow(0 0 12px rgba(255,215,0,0.6))",
              transformOrigin: "top center",
              transition: "filter 0.3s ease"
            }}
          >
            <rect x="17" y="0" width="6" height="9" rx="2"/>
            <path d="M4 40 Q4 14 20 14 Q36 14 36 40 Z"/>
            <ellipse cx="20" cy="40" rx="16" ry="5"/>
            <ellipse cx="20" cy="49" rx="5" ry="6"/>
          </svg>
          <span className="deva-font text-yellow-400/50 text-xs group-hover:text-yellow-300 transition-colors">
            घंटा वाजवा
          </span>
        </button>
      </div>


      {/* Hero text */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pb-52 md:pb-64">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="text-5xl md:text-7xl mb-5"
        >🙏</motion.div>

        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="deva-font golden-glow font-bold leading-tight mb-6"
          style={{ color: "#FFD700", fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
        >
          आषाढी एकादशीच्या<br/>
          <span style={{ fontSize: "0.82em" }}>हार्दिक शुभेच्छा!</span>
        </motion.h1>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="deva-font text-lg md:text-xl leading-loose"
          style={{ color: "#FFF8DC" }}
        >
          <p>विठ्ठल नामाचा गजर,</p>
          <p>भक्तीचा सागर,</p>
          <p>आनंदाचा उत्सव...</p>
          <p className="mt-3">आजच्या या पवित्र दिवशी</p>
          <p>पांडुरंग तुमच्या जीवनात</p>
          <p style={{ color: "#FFD700" }}>सुख, समाधान, समृद्धी आणि आनंद</p>
          <p>भरभरून देवो.</p>
        </motion.div>

        {/* Scrolling marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 overflow-hidden py-3"
          style={{ borderTop: "1px solid rgba(255,215,0,0.3)", borderBottom: "1px solid rgba(255,215,0,0.3)" }}
        >
          <motion.p
            animate={{ x: [0, -1100] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap deva-font text-yellow-300 text-lg tracking-widest"
          >
            🔔 जय हरी विठ्ठल! 🙏 जय जय विठ्ठल! 🌸 पांडुरंग हरी! ✨ जय हरी विठ्ठल! 🔔 जय हरी विठ्ठल! 🙏 जय जय विठ्ठल! 🌸 पांडुरंग हरी! ✨
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="deva-font text-yellow-500/50 text-xs">खाली स्क्रोल करा</span>
        <ChevronDown size={18} className="text-yellow-500/50"/>
      </motion.div>
    </section>
  );
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="deva-font text-center text-2xl md:text-3xl font-bold mb-10"
      style={{ color: "#FFD700" }}
    >
      {children}
    </motion.h2>
  );
}

// ─── WISHES FROM ──────────────────────────────────────────────────────────────
function WishesFrom() {
  return (
    <section className="py-20 px-6 flex justify-center">
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-sm w-full text-center p-8 rounded-3xl"
        style={{
          background:    "rgba(255,140,0,0.07)",
          border:        "1px solid rgba(255,215,0,0.28)",
          backdropFilter:"blur(20px)",
          boxShadow:     "0 0 60px rgba(255,140,0,0.12), inset 0 0 60px rgba(255,215,0,0.03)"
        }}
      >
        {/* Corner ornaments */}
        {["top-3 left-4","top-3 right-4","bottom-3 left-4","bottom-3 right-4"].map((pos, i) => (
          <span key={i} className={`absolute ${pos} text-yellow-700/40 text-xl`}>✦</span>
        ))}

        {/* Photo circle */}
        <div className="relative mx-auto mb-5 w-28 h-28">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-6xl"
            style={{
              background: "linear-gradient(135deg, rgba(255,140,0,0.3), rgba(255,215,0,0.18))",
              border:     "3px solid rgba(255,215,0,0.55)",
              boxShadow:  "0 0 30px rgba(255,215,0,0.3)"
            }}
          >🙏</div>
          <div
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #FF8C00, #FFD700)" }}
          >
            <Heart size={13} className="text-white" fill="white"/>
          </div>
        </div>

        <p className="deva-font text-yellow-400/70 text-sm mb-2 tracking-wider">मनःपूर्वक शुभेच्छुक</p>
        <h2
          className="deva-font golden-glow font-bold text-3xl mb-1"
          style={{ color: "#FFD700" }}
        >
          श्री जनार्दन शेळके
        </h2>
        <p className="deva-font text-yellow-200/55 text-sm">व परिवार</p>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.4))" }}/>
          <span className="text-yellow-500 text-lg">✦</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,215,0,0.4), transparent)" }}/>
        </div>

        <p className="deva-font text-yellow-200/65 text-sm leading-relaxed">
          यांजकडून आपणास व आपल्या परिवारास आषाढी एकादशीच्या मनःपूर्वक शुभेच्छा!
        </p>

        <div className="mt-5 flex justify-center gap-3">
          {["🌸","🔔","🪔","🌸"].map((ic, i) => (
            <motion.span
              key={i}
              className="text-xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, delay: i * 0.35, repeat: Infinity }}
            >{ic}</motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── MESSAGE CARD ─────────────────────────────────────────────────────────────
function MessageCard() {
  return (
    <section className="py-10 px-6">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto text-center p-10 rounded-3xl relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,140,0,0.09) 0%, rgba(255,215,0,0.04) 100%)",
          border:     "1px solid rgba(255,215,0,0.22)",
          backdropFilter: "blur(15px)"
        }}
      >
        {["top-4 left-4","top-4 right-4","bottom-4 left-4","bottom-4 right-4"].map((pos, i) => (
          <span key={i} className={`absolute ${pos} text-yellow-700/35 text-2xl`}>✦</span>
        ))}

        <div className="text-4xl mb-6">🙏</div>
        <div className="deva-font text-lg md:text-xl leading-loose space-y-1" style={{ color: "#FFF8DC" }}>
          <p className="font-bold text-xl" style={{ color: "#FFD700" }}>आजचा दिवस भक्तीचा...</p>
          <p>श्रद्धेचा...</p>
          <p>नामस्मरणाचा...</p>
          <br/>
          <p>विठ्ठलाच्या चरणी</p>
          <p>आपल्या सर्व इच्छा पूर्ण होवोत.</p>
          <br/>
          <p>आपल्या जीवनात नेहमी</p>
          <p>
            <span style={{ color: "#FFD700" }}>आनंद, सुख, समृद्धी,</span>
          </p>
          <p><span style={{ color: "#FFD700" }}>आरोग्य आणि समाधान</span></p>
          <p>नांदो.</p>
          <br/>
          <p
            className="text-2xl font-bold golden-glow leading-relaxed"
            style={{ color: "#FFD700" }}
          >
            🙏 आषाढी एकादशीच्या<br/>मनःपूर्वक हार्दिक शुभेच्छा!
          </p>
        </div>
      </motion.div>
    </section>
  );
}

// ─── DAILY THOUGHT ────────────────────────────────────────────────────────────
function DailyThought() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % THOUGHTS.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionTitle>✨ दैनिक विचार ✨</SectionTitle>
        <div
          className="relative min-h-36 flex items-center justify-center rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,140,0,0.1), rgba(255,215,0,0.04))",
            border:     "1px solid rgba(255,215,0,0.2)"
          }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5 }}
              className="deva-font text-xl md:text-2xl italic px-10 py-10 text-center"
              style={{ color: "#FFF8DC" }}
            >
              <span className="text-yellow-500 text-4xl leading-none mr-1">"</span>
              {THOUGHTS[idx]}
              <span className="text-yellow-500 text-4xl leading-none ml-1">"</span>
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {THOUGHTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === idx ? "#FFD700" : "rgba(255,215,0,0.3)",
                transform:  i === idx ? "scale(1.4)" : "scale(1)"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SANT VACHAN ──────────────────────────────────────────────────────────────
function SantVachan() {
  return (
    <section className="py-16 px-6">
      <SectionTitle>📖 संत वचन 📖</SectionTitle>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
        {SANT_VACHAN.map((s, i) => (
          <motion.div
            key={i}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-6 rounded-2xl relative overflow-hidden cursor-default"
            style={{
              background:     "linear-gradient(135deg, rgba(255,140,0,0.1), rgba(255,215,0,0.04))",
              border:         "1px solid rgba(255,215,0,0.2)",
              backdropFilter: "blur(10px)"
            }}
          >
            <div className="text-3xl mb-3">{s.icon}</div>
            <p className="deva-font text-lg italic leading-relaxed mb-4" style={{ color: "#FFF8DC" }}>
              "{s.vachan}"
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px" style={{ background: "rgba(255,215,0,0.3)" }}/>
              <p className="deva-font text-sm font-bold" style={{ color: "#FFD700" }}>{s.sant}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────
function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-16 px-6">
      <SectionTitle>🌸 भक्ती दर्शन 🌸</SectionTitle>
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {GALLERY.map((img, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.88, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.06, zIndex: 10 }}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            style={{ border: "1px solid rgba(255,215,0,0.18)" }}
            onClick={() => setActive(i)}
          >
            <img
              src={`https://images.unsplash.com/photo-${img.id}?w=400&h=400&fit=crop&auto=format`}
              alt={img.label}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-115"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <p className="deva-font text-white text-sm">{img.label}</p>
              <ZoomIn size={15} className="text-yellow-400 mt-1"/>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.96)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={() => setActive(null)}>
              <X size={32}/>
            </button>
            <motion.div
              initial={{ scale: 0.78 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.78 }}
              className="max-w-3xl w-full rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={`https://images.unsplash.com/photo-${GALLERY[active].id}?w=1200&h=750&fit=crop&auto=format`}
                alt={GALLERY[active].label}
                className="w-full object-cover"
              />
              <div className="p-4 text-center" style={{ background: "rgba(13,4,0,0.95)" }}>
                <p className="deva-font text-yellow-300 text-lg">{GALLERY[active].label}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── ABHANG SECTION ───────────────────────────────────────────────────────────
function AbhangSection() {
  return (
    <section className="py-16 px-6 overflow-hidden">
      <SectionTitle>🎶 अभंग 🎶</SectionTitle>
      {[false, true].map((reverse, row) => (
        <div key={row} className={`relative ${row ? "mt-4" : ""}`}>
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, var(--background), transparent)" }}/>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(270deg, var(--background), transparent)" }}/>
          <motion.div
            animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ duration: reverse ? 28 : 22, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 whitespace-nowrap"
          >
            {[...ABHANG, ...ABHANG].map((line, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3 rounded-full shrink-0"
                style={{
                  background: row
                    ? "linear-gradient(135deg, rgba(255,215,0,0.07), rgba(255,140,0,0.05))"
                    : "linear-gradient(135deg, rgba(255,140,0,0.11), rgba(255,215,0,0.06))",
                  border: `1px solid rgba(255,${row ? 215 : 140},0,0.18)`
                }}
              >
                <Music size={14} className="text-yellow-500 shrink-0"/>
                <span className="deva-font text-base" style={{ color: "#FFF8DC" }}>{line}</span>
              </div>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  );
}

// ─── BLESSINGS ────────────────────────────────────────────────────────────────
function BlessingsSection() {
  return (
    <section className="py-20 px-6">
      <SectionTitle>🙏 आशीर्वाद 🙏</SectionTitle>
      <p className="deva-font text-center text-yellow-200/60 mb-10 text-lg -mt-5">
        भगवान विठ्ठल आपल्या आयुष्यात...
      </p>
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4">
        {BLESSINGS.map((b, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: b.delay }}
            whileHover={{ scale: 1.06, y: -6 }}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl text-center"
            style={{
              background:  "linear-gradient(135deg, rgba(255,140,0,0.1), rgba(255,215,0,0.04))",
              border:      "1px solid rgba(255,215,0,0.2)",
              boxShadow:   "0 4px 30px rgba(255,140,0,0.05)",
              cursor:      "default"
            }}
          >
            <span className="text-4xl">{b.icon}</span>
            <span className="deva-font text-xl font-bold" style={{ color: "#FFD700" }}>{b.word}</span>
            <span className="deva-font text-yellow-200/55 text-sm">भरभरून देवो</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── SHARE WISH ───────────────────────────────────────────────────────────────
function ShareWish() {
  const [name, setName]       = useState("");
  const [msg, setMsg]         = useState("");
  const [wishes, setWishes]   = useState([
    { name: "रामदास पाटील",   msg: "पांडुरंगाच्या चरणी दंडवत! सर्वांना एकादशीच्या हार्दिक शुभेच्छा!" },
    { name: "सुनीता देशमुख",  msg: "विठ्ठल नामाचा गजर करत राहूया. जय हरी विठ्ठल!" }
  ]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && msg.trim()) {
      setWishes(prev => [{ name, msg }, ...prev]);
      setName(""); setMsg("");
    }
  };

  return (
    <section className="py-16 px-6">
      <SectionTitle>💬 आपल्या शुभेच्छा लिहा</SectionTitle>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <motion.form
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          onSubmit={submit}
          className="space-y-4 p-6 rounded-2xl"
          style={{
            background: "rgba(255,140,0,0.06)",
            border:     "1px solid rgba(255,215,0,0.2)"
          }}
        >
          {[
            { label: "आपले नाव", val: name, set: setName, ph: "नाव लिहा...", multi: false },
            { label: "शुभेच्छा संदेश", val: msg,  set: setMsg,  ph: "शुभेच्छा संदेश लिहा...", multi: true }
          ].map(({ label, val, set, ph, multi }) => (
            <div key={label}>
              <label className="block deva-font text-yellow-400 text-sm mb-2">{label}</label>
              {multi ? (
                <textarea
                  rows={4}
                  value={val}
                  onChange={e => set(e.target.value)}
                  placeholder={ph}
                  className="w-full px-4 py-3 rounded-xl resize-none outline-none deva-font transition-all"
                  style={{
                    background: "rgba(255,140,0,0.1)",
                    border:     "1px solid rgba(255,215,0,0.2)",
                    color:      "#FFF8DC",
                    fontSize:   "15px"
                  }}
                />
              ) : (
                <input
                  type="text"
                  value={val}
                  onChange={e => set(e.target.value)}
                  placeholder={ph}
                  className="w-full px-4 py-3 rounded-xl outline-none deva-font transition-all"
                  style={{
                    background: "rgba(255,140,0,0.1)",
                    border:     "1px solid rgba(255,215,0,0.2)",
                    color:      "#FFF8DC",
                    fontSize:   "15px"
                  }}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="deva-font w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[.97] transition-all"
            style={{ background: "linear-gradient(135deg, #FF8C00, #FFD700)", color: "#0d0400", fontSize: "15px" }}
          >
            <Send size={16}/> शुभेच्छा पाठवा
          </button>
        </motion.form>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4 max-h-96 overflow-y-auto pr-1"
          style={{ scrollbarWidth: "none" }}
        >
          <AnimatePresence>
            {wishes.map((w, i) => (
              <motion.div
                key={i}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(255,140,0,0.08)",
                  border:     "1px solid rgba(255,215,0,0.14)"
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(255,140,0,0.35), rgba(255,215,0,0.2))" }}>
                    🙏
                  </div>
                  <p className="deva-font font-bold text-yellow-300 text-sm">{w.name}</p>
                </div>
                <p className="deva-font text-yellow-100/80 text-sm leading-relaxed">{w.msg}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SHARE SECTION ────────────────────────────────────────────────────────────
function ShareSection() {
  const [copied, setCopied] = useState(false);

  const share = async (platform: string) => {
    const url  = window.location.href;
    const text = "आषाढी एकादशीच्या हार्दिक शुभेच्छा! 🙏 जय हरी विठ्ठल!";
    if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "copy") {
      try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch {}
    } else if (platform === "native" && navigator.share) {
      try { await navigator.share({ title: "आषाढी एकादशी शुभेच्छा", text, url }); } catch {}
    }
  };

  const BTNS = [
    { id: "whatsapp", label: "WhatsApp",        icon: "💬", color: "#25D366" },
    { id: "facebook", label: "Facebook",         icon: "📘", color: "#1877F2" },
    { id: "copy",     label: copied ? "कॉपी झाले!" : "लिंक कॉपी", icon: copied ? "✅" : "🔗", color: "#FF8C00" },
    { id: "native",   label: "शेअर करा",        icon: "📤", color: "#9B59B6" }
  ];

  return (
    <section className="py-16 px-6">
      <SectionTitle>📱 शुभेच्छा शेअर करा</SectionTitle>
      <p className="deva-font text-center text-yellow-200/55 mb-8 -mt-5">
        आपल्या प्रियजनांना आषाढी एकादशीच्या शुभेच्छा द्या
      </p>
      <div className="max-w-lg mx-auto grid grid-cols-2 gap-4">
        {BTNS.map((btn, i) => (
          <motion.button
            key={btn.id}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => share(btn.id)}
            className="deva-font flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold transition-all"
            style={{
              background: `${btn.color}1A`,
              border:     `1px solid ${btn.color}44`,
              color:       btn.color,
              fontSize:   "15px"
            }}
          >
            <span className="text-xl">{btn.icon}</span>
            {btn.label}
          </motion.button>
        ))}
      </div>
    </section>
  );
}

// ─── VISITOR COUNTER ──────────────────────────────────────────────────────────
function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem("ekadashi_visits") || "0");
    const base   = stored || 12500 + Math.floor(Math.random() * 600);
    const next   = base + 1;
    localStorage.setItem("ekadashi_visits", String(next));

    let cur = 0;
    const step = Math.ceil(next / 55);
    const t = setInterval(() => {
      cur = Math.min(cur + step, next);
      setCount(cur);
      if (cur >= next) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="py-6 text-center">
      <p className="deva-font text-yellow-500/55 text-sm mb-1">🙏 एकूण भेट दिलेले भक्त</p>
      <p className="deva-font text-3xl font-bold" style={{ color: "#FFD700" }}>
        {count.toLocaleString("en-IN")}
      </p>
    </div>
  );
}

// ─── DARK MODE FIREFLIES ──────────────────────────────────────────────────────
function Fireflies() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden" style={{ contain: "strict" }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width:           4 + (i % 3) * 2,
            height:          4 + (i % 3) * 2,
            left:            `${(i * 21 + 5) % 95}%`,
            top:             `${(i * 27 + 10) % 90}%`,
            background:      "radial-gradient(circle, #C39BD3 30%, rgba(195,155,211,0.3) 100%)",
            animation:       `firefly ${4 + (i % 5)}s ${(i % 6) * 0.7}s ease-in-out infinite`,
            willChange:      "transform, opacity",
            backfaceVisibility: "hidden"
          }}
        />
      ))}
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          borderTop:  "1px solid rgba(255,215,0,0.12)",
          background: "linear-gradient(180deg, transparent 0%, rgba(255,140,0,0.04) 100%)"
        }}/>
      <div className="relative">
        <div className="flex justify-center gap-5 mb-5 text-3xl">
          {["ॐ","🌸","🔔","🌸","ॐ"].map((s, i) => (
            <span
              key={i}
              className="text-yellow-600/35"
              style={{ animation: `omFloat ${3.5 + i * 0.5}s ${i * 0.4}s ease-in-out infinite` }}
            >{s}</span>
          ))}
        </div>
        <h3 className="deva-font text-2xl font-bold mb-2 golden-glow" style={{ color: "#FFD700" }}>
          जय हरी विठ्ठल!
        </h3>
        <p className="deva-font text-yellow-300 text-xl mb-3">ज्ञानोबा माऊली तुकाराम!</p>
        <p className="deva-font text-yellow-200/60">आषाढी एकादशीच्या हार्दिक शुभेच्छा.</p>
        <VisitorCounter/>
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,215,0,0.1)" }}>
          <p className="deva-font text-yellow-800/55 text-xs">
            🙏 पांडुरंग हरी • विठ्ठल रुक्मिणी माऊली 🙏
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [dark,    setDark   ] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onDone={() => setLoading(false)}/>}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-background relative">
          <ScrollProgress/>
          <FloatingPetals dark={dark}/>
          {dark && <Fireflies/>}
          <Navbar dark={dark} onToggle={() => setDark(d => !d)}/>

          <main>
            <HeroSection/>
            <WishesFrom/>
            <MessageCard/>
            <DailyThought/>
            <SantVachan/>
            <Gallery/>
            <AbhangSection/>
            <BlessingsSection/>
          </main>

          <Footer/>
        </div>
      )}
    </>
  );
}
