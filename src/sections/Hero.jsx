import React from "react";
import Button from "../components/Button";
import AnimatedBorderButton from "../components/animatedBorderButton";
import {
  ArrowRight,
  Download,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

const Hero = () => {
  const socialLinks = [
  {
    icon: FaGithub,
    link: "https://github.com/your-github",
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

      {/* Floating Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${
                15 + Math.random() * 20
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

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
          {/* Right Column - Profile Image */}
          <div className="relative animate-fade-in animation-delay-300">
              {/* Profile Image */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-primary/10 blur-2xl animate-pulse"/>
              <div className="relative max-w-md mx-auto">
                <div className="relative glass rounded-3xl p-2 glow-border">
                  <img src="/profile-photo.png" alt="Garv Agarwal" className="w-full aspect-[4/5] object-cover rounded-2xl"/>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
)}

export default Hero;