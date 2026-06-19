import React from "react";
import { motion } from "framer-motion";

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

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative py-32 bg-black text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-40 left-20 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Academic Timeline
          </h2>

          <p className="text-muted-foreground max-w-3xl mx-auto mt-6 text-lg">
          My educational journey that shaped my passion for technology,
          problem solving, and software development.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">

          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-primary/30 -translate-x-1/2 hidden md:block" />

          {roadmap.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              className="relative mb-20"
            >
              {/* Desktop Layout */}
              <div
                className={`hidden md:flex items-center ${
                  index % 2 === 0
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div className="w-[45%]">
                  <div className="bg-black/60 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(32,178,166,0.15)] hover:border-primary/50 transition-all duration-500">
                    <span className="text-primary font-semibold">
                      {item.year}
                    </span>

                    <h3 className="text-2xl font-bold mt-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 mt-2">
                      {item.subtitle}
                    </p>

                    <p className="text-gray-300 mt-5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Dot */}
              <div className="hidden md:block absolute left-1/2 top-10 -translate-x-1/2">
                <div className="w-6 h-6 rounded-full bg-primary shadow-[0_0_25px_rgba(32,178,166,0.8)] border-4 border-black" />
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden pl-12 relative">
                <div className="absolute left-0 top-4 w-5 h-5 rounded-full bg-primary shadow-[0_0_20px_rgba(32,178,166,0.8)]" />

                <div className="bg-black/60 backdrop-blur-xl border border-primary/20 rounded-2xl p-6">
                  <span className="text-primary font-semibold">
                    {item.year}
                  </span>

                  <h3 className="text-xl font-bold mt-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {item.subtitle}
                  </p>

                  <p className="text-gray-300 mt-4">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;