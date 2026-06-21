import { FaJava, FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { 
  SiTailwindcss, 
  SiFastapi, 
  SiPython, 
  SiMongodb, 
  SiCplusplus, 
  SiJavascript, 
  SiC, 
  SiExpress, 
  SiPandas, 
  SiNumpy,
  SiScikitlearn,
  SiStreamlit
} from 'react-icons/si';
import { DiNodejsSmall } from 'react-icons/di';
import { AiOutlineBarChart } from 'react-icons/ai'; 
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Skills() {
  const skills = [
    { icon: <SiC />, name: "C" },
    { icon: <SiCplusplus />, name: "C++" },
    { icon: <FaJava />, name: "Java" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3Alt />, name: "CSS" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiExpress />, name: "Express.js" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiPandas />, name: "Pandas" },
    { icon: <SiNumpy />, name: "NumPy" },
    { icon: <AiOutlineBarChart />, name: "Matplotlib" },
    { icon: <SiScikitlearn />, name: "Scikit-Learn" },
    { icon: <SiStreamlit />, name: "Streamlit" }
  ];

  const repeated = [...skills, ...skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [active]);

  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = x.get() + SPEED * dir * dt;
      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }
      x.set(next);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, x]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-primary/10 text-foreground overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500" />
      </div>

      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My Skills
      </motion.h2>
      <motion.p
        className="mt-2 mb-8 text-muted-foreground text-base sm:text-lg z-10 font-medium"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Modern Applications | Data Science & ML | Modern Technologies
      </motion.p>

      <div className="relative w-full overflow-hidden py-10 px-4">
        {/* Shadow Overlays to create a fade-off effect on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          ref={trackRef}
          className="flex gap-8"
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
        >
          {repeated.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-6 min-w-[140px] aspect-square rounded-2xl glass-strong border border-white/5 backdrop-blur-md shadow-lg transition-all duration-500 hover:border-primary/50 hover:bg-primary/10 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(32,178,166,0.25)] hover:rotate-0 hover:skew-0 cursor-pointer group"
              style={{
                transform: "perspective(800px) rotateX(12deg) rotateY(-10deg) skewX(-4deg)",
                transformStyle: "preserve-3d",
              }}
              aria-label={s.name}
              title={s.name}
            >
              <div 
                className="text-5xl text-[#1cd8d2] group-hover:text-primary transition-colors duration-300 group-hover:scale-115"
                style={{ transform: "translateZ(20px)" }}
              >
                {s.icon}
              </div>
              <p 
                className="text-xs font-mono tracking-wider font-semibold text-slate-400 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white mt-4 transition-colors"
                style={{ transform: "translateZ(10px)" }}
              >
                {s.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}