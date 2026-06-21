import { Code2, Lightbulb, Rocket, Award, GraduationCap } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Dev",
    description: "Architecting interactive web experiences using robust React ecosystem practices alongside efficient API backends.",
  },
  {
    icon: Rocket,
    title: "Algorithms & Logic",
    description: "Deeply passionate about optimizing space and time complexity using data structures to tackle advanced computing challenges.",
  },
  {
    icon: Lightbulb,
    title: "Data & ML Automation",
    description: "Developing intelligent computational solutions by combining analytical Python libraries with modern frontend frameworks.",
  },
];

// Premium interactive card wrapper featuring dynamic cursor gradient mapping and 3D tilt
const SpotlightCard = ({ children, delay }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Motion values for tilt (normalized between -0.5 and 0.5)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Springs for smooth tilting
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Spotlight position
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    // Tilt calculations
    const curX = e.clientX - rect.left - width / 2;
    const curY = e.clientY - rect.top - height / 2;
    tiltX.set(curX / width);
    tiltY.set(curY / height);
  }

  function handleMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <div className="perspective-1000">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent-teal)]/30 overflow-hidden hover:shadow-[0_0_35px_rgba(32,178,166,0.15)]"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                250px circle at ${mouseX}px ${mouseY}px,
                rgba(32, 178, 166, 0.12),
                transparent 80%
              )
            `,
          }}
        />
        <div style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const About = () => {
  const stats = [
    { label: "Zonal Rank (CodeCode)", value: "4th" },
    { label: "Core Technologies Stacked", value: "15+" },
    { label: "Engineering Track", value: "B.Tech CSE" },
  ];

  return (
    <section 
      id="about" 
      className="py-24 md:py-32 relative bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden transition-colors duration-500"
    >
      {/* Aesthetic Background Ambient Blur Shapes matching Skills Section */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] blur-[140px] animate-pulse" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#302b63] blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Core Bio Text */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <span className="h-px w-8 bg-[var(--accent-teal)]" />
              <span className="text-[var(--accent-teal)] text-xs font-semibold tracking-widest uppercase font-mono">
                About Me
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              Bridging robust logical design with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-teal)] to-emerald-500">
                fluid interface engineering.
              </span>
            </motion.h2 >

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-5 text-[var(--text-muted)] text-base md:text-lg font-light leading-relaxed"
            >
              <p>
                I am a Computer Science and Engineering undergraduate student at{" "}
                <span className="text-[var(--text-main)] font-medium">SVNIT Surat</span>. Driven by 
                deep structural reasoning and backend automation, my process revolves around architecting 
                cleanly isolated APIs and coupling them with interactive UI layers.
              </p>
              <p>
                From constructing scalable systems utilizing JavaScript, Node, and Express to scripting analytical 
                dashboards powered by Python frameworks like FastAPI and Streamlit, I enjoy tackling problems end-to-end. 
                My focus remains centered around developing maintainable systems that map complex datasets into highly reactive products.
              </p>
            </motion.div>

            {/* Premium Integrated Statistics Counter Component */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--border-color)]"
            >
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--accent-teal)]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Premium Focus Feature Cards */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-center">
            {/* Live Institution Indicator Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 rounded-2xl bg-[var(--bg-card)] p-5 border border-[var(--border-color)] shadow-2xl"
            >
              <div className="p-3 rounded-xl bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs text-[var(--text-muted)] uppercase font-mono tracking-wider">Education</h4>
                <p className="text-[var(--text-main)] font-semibold text-base mt-0.5">Sardar Vallabhbhai National Institute of Technology</p>
                <p className="text-xs text-[var(--accent-teal)] font-medium mt-0.5">B.Tech in Computer Science & Engineering (2025 - 2029)</p>
              </div>
            </motion.div>

            {/* Interactive Spotlight Cards */}
            {highlights.map((item, idx) => (
              <SpotlightCard key={idx} delay={0.1 * (idx + 1)}>
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] group-hover:scale-110 transition-all duration-300 shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1 text-[var(--text-main)] group-hover:text-[var(--accent-teal)] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;