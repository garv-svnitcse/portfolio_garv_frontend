import React, { useEffect, useRef } from "react";
import Button from "../components/Button";
import AnimatedBorderButton from "../components/AnimatedBorderButton";
import {
  ArrowRight,
  Download,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const Canvas3DSpace = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const particleCount = 80;
    const maxDepth = 1000;

    // Initialize particles in 3D coordinate space
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        z: Math.random() * maxDepth,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
      });
    }

    // Mouse coordinates to control rotation
    let rotateX = 0;
    let rotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;

    const handleMouseMove = (e) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      targetRotateY = (x / window.innerWidth) * 0.25; // rotate around Y axis
      targetRotateX = (y / window.innerHeight) * 0.25; // rotate around X axis
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth easing for rotation angles
      rotateX += (targetRotateX - rotateX) * 0.05;
      rotateY += (targetRotateY - rotateY) * 0.05;

      const cosX = Math.cos(rotateX);
      const sinX = Math.sin(rotateX);
      const cosY = Math.cos(rotateY);
      const sinY = Math.sin(rotateY);

      particles.forEach((p) => {
        // Move particle forward in Z
        p.z -= p.speed;

        // Reset if it gets past screen
        if (p.z <= 0) {
          p.z = maxDepth;
          p.x = (Math.random() - 0.5) * 800;
          p.y = (Math.random() - 0.5) * 800;
        }

        // Apply 3D Rotations
        // 1. Rotate around Y (horizontal)
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        // 2. Rotate around X (vertical)
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // 3D projection formulas
        const focalLength = 350;
        const scale = focalLength / (focalLength + z2);

        if (z2 + focalLength > 0) {
          const screenX = x1 * scale + width / 2;
          const screenY = y2 * scale + height / 2;

          if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
            const alpha = Math.max(0.1, (1 - z2 / maxDepth) * 0.6);
            const radius = p.size * scale * 1.5;

            ctx.beginPath();
            ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(32, 178, 166, ${alpha})`;
            ctx.fill();

            if (z2 < maxDepth * 0.25) {
              ctx.beginPath();
              ctx.arc(screenX, screenY, radius * 2.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(32, 178, 166, ${alpha * 0.12})`;
              ctx.fill();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const ProfileCard3D = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D card tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 });

  // Glossy sheen reflection offset
  const sheenX = useSpring(useTransform(x, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 120, damping: 20 });
  const sheenY = useSpring(useTransform(y, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 120, damping: 20 });

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative max-w-md mx-auto cursor-pointer"
    >
      <div 
        className="relative glass rounded-3xl p-2 glow-border overflow-hidden transition-all duration-300 group hover:shadow-[0_0_40px_rgba(32,178,166,0.3)]"
        style={{ transform: "translateZ(30px)" }}
      >
        <img 
          src="/profile-photo.png" 
          alt="Garv Agarwal" 
          className="w-full aspect-[4/5] object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
          style={{ transform: "translateZ(10px)" }}
        />
        {/* Dynamic Sheen overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent mix-blend-overlay rounded-2xl"
          style={{
            transform: "translateZ(15px)",
            left: sheenX,
            top: sheenY,
            opacity: useTransform(x, (val) => (val === 0 ? 0 : 0.6)),
          }}
        />
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const socialLinks = [
    {
      icon: FaGithub,
      link: "https://github.com/garv-svnitcse",
    },
    {
      icon: FaLinkedin,
      link: "https://linkedin.com/in/your-linkedin",
    },
    {
      icon: FaInstagram,
      link: "https://instagram.com/your-instagram",
    },
  ];
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />

      {/* Interactive 3D Canvas Space Background */}
      <Canvas3DSpace />

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE */}
          <div className="space-y-8">
            
            {/* Badge */}
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Software Engineer • ML Engineer • DSA Enthusiast
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                Building
                <span className="text-primary glow-text">
                  {" "}
                  Scalable
                </span>
                <br />
                Backend Systems &
                <br />
                <span className="font-serif italic font-normal text-primary glow-text">
                  AI Solutions.
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                I'm Garv Agarwal, a software engineer specializing in
                FastAPI, Machine Learning, Data Structures & Algorithms,
                and modern backend development.

                I enjoy solving complex problems, designing efficient
                algorithms, and building scalable applications that
                transform ideas into real-world products.
              </p>
            </div>


            {/* Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <Button size="lg">
                Contact Me
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <a href="/updatedresumegarv.pdf" download>
                <AnimatedBorderButton>
                  <Download className="w-5 h-5" />
                  Download CV
                </AnimatedBorderButton>
              </a>
            </div>
            
            {/* Social Links */}

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Follow me:
              </span>

              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          {/* Right Column - Profile Image with 3D Tilt */}
          <div className="relative animate-fade-in animation-delay-300">
              {/* Profile Image Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-primary/10 blur-2xl animate-pulse"/>
              <ProfileCard3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;