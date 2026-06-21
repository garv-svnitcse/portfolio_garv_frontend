import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const roadmap = [
  {
    year: "2013 - 2023",
    title: "Secondary Education",
    subtitle: "Nopany High School | Kolkata | West Bengal",
    description:
      "Built a strong academic foundation and developed curiosity for technology and innovation.",
  },
  {
    year: "2023 - 2025",
    title: "Higher Secondary Education",
    subtitle: "Maharishi Arvind Public School | Kota | Rajasthan",
    description:
      "Focused on Mathematics, Physics, and Computer Science while strengthening analytical and logical reasoning skills.",
  },
  {
    year: "2025 - Present",
    title: "B.Tech in Computer Science & Engineering",
    subtitle: "SVNIT Surat | Gujarat",
    description:
      "Pursuing undergraduate studies with interests in software engineering, backend development, machine learning, and problem solving.",
  },
];

const CanvasCodeBokeh = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const glyphs = ["{ }", "</>", "0", "1", "x", "y", "a = b", "++", "[ ]", "=>", "sys.io"];
    const particles = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 5 + 1.2, // depth factor
        text: glyphs[Math.floor(Math.random() * glyphs.length)],
        fontSize: Math.random() * 12 + 10,
        speed: Math.random() * 0.12 + 0.04,
        opacity: Math.random() * 0.35 + 0.05,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speed * (6.5 - p.z);
        if (p.y < -50) {
          p.y = height + 50;
          p.x = Math.random() * width;
        }

        const blur = (p.z - 1) * 1.8;
        ctx.filter = blur > 0.5 ? `blur(${blur}px)` : "none";
        
        ctx.fillStyle = `rgba(32, 178, 166, ${p.opacity / (p.z * 0.4)})`;
        ctx.font = `bold ${p.fontSize / (p.z * 0.7)}px Courier New, monospace`;
        ctx.fillText(p.text, p.x, p.y);
      });

      ctx.filter = "none";
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-30" />;
};

const RoadmapCard = ({ item, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    x.set((e.clientX - rect.left - width / 2) / width);
    y.set((e.clientY - rect.top - height / 2) / height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="perspective-1000 w-full md:w-[45%]">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative bg-card/60 backdrop-blur-xl border border-border/40 hover:border-primary/60 rounded-3xl p-8 shadow-[0_15px_35px_rgba(32,178,166,0.08)] hover:shadow-[0_25px_50px_rgba(32,178,166,0.2)] transition-all duration-300"
      >
        <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold font-mono border border-primary/20">
            {item.year}
          </span>

          <h3 className="text-2xl font-bold mt-4 text-foreground">
            {item.title}
          </h3>

          <p className="text-sm font-medium text-muted-foreground mt-1">
            {item.subtitle}
          </p>

          <p className="text-sm text-muted-foreground/90 mt-4 leading-relaxed font-light">
            {item.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-32 bg-background text-foreground overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-40 left-20 w-80 h-80 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Bokeh Code Background */}
      <CanvasCodeBokeh />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-24 max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase font-mono">
              Academic_Roadmap
            </span>
            <span className="h-px w-8 bg-primary" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-400 to-[#1cd8d2]">
            Academic Timeline
          </h2>

          <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
            My educational journey that shaped my passion for technology, problem solving, and software development.
          </p>
        </div>

        {/* 3D Isometric Timline Container */}
        <div 
          className="relative max-w-6xl mx-auto px-4"
          style={{
            perspective: "1200px",
          }}
        >
          <div
            className="relative"
            style={{
              transform: "rotateX(15deg) rotateY(-5deg) rotateZ(-2deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* SVG Center Line (Vertical Road Path) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 hidden md:block pointer-events-none">
              <svg 
                className="w-full h-full" 
                preserveAspectRatio="none"
                viewBox="0 0 4 1000"
              >
                {/* Track Base */}
                <path
                  d="M 2 0 L 2 1000"
                  fill="none"
                  stroke="rgba(32, 178, 166, 0.15)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Glowing Flowing Line on Scroll */}
                <motion.path
                  d="M 2 0 L 2 1000"
                  fill="none"
                  stroke="url(#neonGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{
                    pathLength: scrollYProgress,
                  }}
                />
                <defs>
                  <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#20b2a6" />
                    <stop offset="50%" stopColor="#00bf8f" />
                    <stop offset="100%" stopColor="#1cd8d2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Mobile Left Line */}
            <div className="absolute left-4 top-0 bottom-0 w-[3px] md:hidden pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 3 1000">
                <path d="M 1.5 0 L 1.5 1000" fill="none" stroke="rgba(32, 178, 166, 0.15)" strokeWidth="3" />
                <motion.path
                  d="M 1.5 0 L 1.5 1000"
                  fill="none"
                  stroke="#20b2a6"
                  strokeWidth="3"
                  style={{
                    pathLength: scrollYProgress,
                  }}
                />
              </svg>
            </div>

             {roadmap.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative mb-24 md:mb-16">
                  {/* Desktop Layout (Alternate sides) - Animated entrance */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -80 : 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
                    className={`hidden md:flex items-center w-full ${
                      isEven ? "justify-start" : "justify-end"
                    }`}
                  >
                    <RoadmapCard item={item} index={index} />
                  </motion.div>

                  {/* Desktop Connecting Node Center Dot - Animated scale pop */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.2 }}
                    className="hidden md:block absolute left-1/2 top-12 -translate-x-1/2 z-25 pointer-events-none"
                  >
                    <div className="w-6 h-6 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(32,178,166,0.8)]">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    </div>
                  </motion.div>

                  {/* Mobile Layout - Animated entrance */}
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="md:hidden pl-10 relative"
                  >
                    {/* Connecting dot */}
                    <div className="absolute left-1.5 top-8 w-5 h-5 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(32,178,166,0.8)] z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>

                    <div className="w-full">
                      <RoadmapCard item={item} index={index} />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;