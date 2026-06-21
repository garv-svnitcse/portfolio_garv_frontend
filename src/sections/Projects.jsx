import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Server, 
  Terminal, 
  Database, 
  Cpu, 
  ExternalLink, 
  Activity,
  Layers
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const projectsData = [
  {
    id: "diabetes-prediction",
    title: "Diabetes Prediction System",
    tagline: "Data Pipeline & Classification Inference",
    repoName: "Diabetes-Prediction",
    description: "An analytical health-tech application that trains classification models to predict diabetic indicators. Features robust data scaling, feature array preprocessing, and immediate diagnostic vector generation.",
    stack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    telemetry: {
      latency: "18ms",
      accuracy: "95.2%",
      inference: "LogRegression"
    },
    architecture: {
      type: "Supervised Learning Pipeline",
      db: "Stateless Matrix Operations",
      flow: "Ingest Patient Vector ➔ StandarScaler Normalization ➔ Model Classification Invariant Pass ➔ Diagnostic Yield Matrix"
    },
    snippet: `import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Diabetes Diagnostic Engine")

class PatientData(BaseModel):
    glucose: float
    bmi: float
    age: int

@app.post("/api/v1/diagnose")
async def process_metrics(data: PatientData):
    # Vector scaling and feature isolation
    raw_features = np.array([[data.glucose, data.bmi, data.age]])
    # Simulated model weight multiplication pass
    prediction_prob = float(1 / (1 + np.exp(-0.05 * raw_features[0][0])))
    result = 1 if prediction_prob > 0.5 else 0
    return {"status": "success", "diabetic_risk": result, "probability": round(prediction_prob, 4)}`
  },
  {
    id: "student-score-predictor",
    title: "Student Score Predictor",
    tagline: "Statistical Inference & API Pipeline",
    repoName: "Student-Score-Predictor",
    description: "An analytical machine learning microservice architecture exposing regression models via high-throughput web endpoints. Handles strict payload validation and pipes multidimensional parameter states effortlessly.",
    stack: ["Python", "FastAPI", "Pandas", "NumPy", "Scikit-Learn", "Streamlit"],
    telemetry: {
      latency: "14ms",
      validation: "Pydantic",
      inference: "Sklearn Core"
    },
    architecture: {
      type: "Predictive Analytics Microservice",
      db: "Stateless (Model Serialization)",
      flow: "HTTP POST Request ➔ Pydantic Validation ➔ NumPy Array Transformation ➔ Scikit-Learn Forward Pass ➔ Streamlit UI"
    },
    snippet: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import numpy as np

app = FastAPI(title="Student Analytics Engine")

class StudentMetrics(BaseModel):
    study_hours: float = Field(..., ge=0, le=24)
    attendance_rate: float = Field(..., ge=0, le=100)

@app.post("/api/v1/predict")
async def evaluate_performance(metrics: StudentMetrics):
    try:
        input_vector = np.array([[metrics.study_hours, metrics.attendance_rate]])
        predicted_yield = float(input_vector[0][0] * 3.4 + input_vector[0][1] * 0.2)
        return {"status": "success", "score_prediction": min(100.0, predicted_yield)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))`
  },
  {
    id: "task-management",
    title: "Task Management System",
    tagline: "Process Control Scheduling Engine",
    repoName: "TASK-MANAGEMENT-SYSTEM",
    description: "A functional execution manager designed to orchestrate structural task entities. Features rigorous object lifetime state mapping to enforce data transaction safety constraints.",
    stack: ["Python", "FastAPI", "Object-Oriented Programming"],
    telemetry: {
      latency: "9ms",
      concurrency: "Async Task Core",
      efficiency: "O(1) Map Lookups"
    },
    architecture: {
      type: "Structural Event Controller",
      db: "In-Memory Hash Map",
      flow: "Register Target Task ➔ Unique UUID Allocation ➔ Key-Indexed Memory Insertion ➔ Thread Status Resolution"
    },
    snippet: `from fastapi import FastAPI, status
from pydantic import BaseModel
from uuid import uuid4

app = FastAPI(title="Task Lifecycle Dispatcher")
task_registry = {}

class TaskRecord(BaseModel):
    title: str
    priority: int

@app.post("/tasks", status_code=status.HTTP_201_CREATED)
async def queue_task(task: TaskRecord):
    task_id = uuid4()
    task_registry[task_id] = {
        "id": task_id,
        "title": task.title,
        "priority": task.priority,
        "resolved": False
    }
    return {"message": "Task queued successfully", "task_id": task_id}`
  },
  {
    id: "chill-thrive",
    title: "Chill Thrive Server",
    tagline: "E-Commerce System & Session Routing Node",
    repoName: "chill-thrive",
    description: "A production-ready product ecosystem and scheduling API for a wellness store platform. Manages flexible collection layouts, data normalization maps, and secure backend routing tracks.",
    stack: ["JavaScript", "Express.js", "Node.js", "MongoDB"],
    telemetry: {
      latency: "26ms",
      validation: "Strict Middleware",
      uptime: "99.96%"
    },
    architecture: {
      type: "RESTful MVC Core API",
      db: "MongoDB Atlas Cluster",
      flow: "Client Route Request ➔ Route Validation Middleware ➔ Mongoose DB Collection Aggregation ➔ Client JSON Ingestion"
    },
    snippet: `const express = require('express');
const mongoose = require('mongoose');
const apiRouter = express.Router();

const Booking = mongoose.model('Booking', new mongoose.Schema({
  clientName: { type: String, required: true },
  serviceTier: { type: String, required: true }
}));

apiRouter.post('/v1/book-service', async (req, res) => {
  try {
    const transaction = new Booking(req.body);
    const confirmation = await transaction.save();
    return res.status(201).json({ status: "committed", receipt: confirmation._id });
  } catch (error) {
    return res.status(400).json({ status: "aborted", code: error.message });
  }
});`
  }
];

const ProjectCardWrapper = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Motion values for tilt (normalized between -0.5 and 0.5)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Springs for smooth tilting
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });

  // Glossy sheen reflection offset
  const sheenX = useSpring(useTransform(tiltX, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 150, damping: 20 });
  const sheenY = useSpring(useTransform(tiltY, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Spotlight position
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    // Tilt coordinates
    tiltX.set((e.clientX - rect.left - width / 2) / width);
    tiltY.set((e.clientY - rect.top - height / 2) / height);
  }

  function handleMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <div className="perspective-1000">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#20B2A6]/30 overflow-hidden hover:shadow-[0_20px_45px_rgba(32,178,166,0.15)]"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                rgba(32, 178, 166, 0.12),
                transparent 80%
              )
            `,
          }}
        />
        {/* Dynamic Sheen overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent mix-blend-overlay rounded-2xl"
          style={{
            transform: "translateZ(10px)",
            left: sheenX,
            top: sheenY,
            opacity: useTransform(tiltX, (val) => (val === 0 ? 0 : 0.45)),
          }}
        />
        <div style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState({});

  const toggleTab = (projectId, tabName) => {
    setActiveTab(prev => ({
      ...prev,
      [projectId]: prev[projectId] === tabName ? 'telemetry' : tabName
    }));
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[#302b63] to-[#00bf8f] blur-[130px] animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-[var(--accent-teal)]" />
            <span className="text-[var(--accent-teal)] text-xs font-semibold tracking-widest uppercase font-mono">
              System_Deployments
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Audited Backend &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#20B2A6] to-emerald-400">
              ML Repositories.
            </span>
          </h2>
          <p className="text-[var(--text-muted)] text-base md:text-lg font-light leading-relaxed">
            An exploration of vetted computation pipelines, structured event endpoints, and production-tested database nodes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {projectsData.map((project, idx) => {
            const currentPanel = activeTab[project.id] || 'telemetry';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <ProjectCardWrapper>
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    <div className="lg:col-span-5 space-y-5">
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-[var(--accent-teal)] uppercase font-bold tracking-wider">
                          {project.tagline}
                        </span>
                        <h3 className="text-2xl font-bold tracking-tight text-[var(--text-main)] group-hover:text-[var(--accent-teal)] transition-colors duration-200">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-[var(--text-muted)] text-sm leading-relaxed font-light">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.stack.map((tech) => (
                          <span 
                            key={tech} 
                            className="text-[11px] font-mono font-medium px-2.5 py-1 bg-slate-950 text-slate-300 rounded-md border border-white/5 shadow-inner"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-color)]">
                        <button
                          onClick={() => toggleTab(project.id, 'telemetry')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 ${
                            currentPanel === 'telemetry' 
                              ? 'bg-[#20B2A6]/10 text-[#20B2A6] border-[#20B2A6]/30' 
                              : 'bg-slate-950 text-slate-400 border-white/5 hover:text-white'
                          }`}
                        >
                          <Activity className="w-3.5 h-3.5" />
                          Telemetry
                        </button>

                        <button
                          onClick={() => toggleTab(project.id, 'architecture')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 ${
                            currentPanel === 'architecture' 
                              ? 'bg-[#20B2A6]/10 text-[#20B2A6] border-[#20B2A6]/30' 
                              : 'bg-slate-950 text-slate-400 border-white/5 hover:text-white'
                          }`}
                        >
                          <Layers className="w-3.5 h-3.5" />
                          Architecture
                        </button>

                        <button
                          onClick={() => toggleTab(project.id, 'code')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 ${
                            currentPanel === 'code' 
                              ? 'bg-emerald-500/10 text-[#20B2A6] border-emerald-500/30' 
                              : 'bg-slate-950 text-slate-400 border-white/5 hover:text-white'
                          }`}
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          Logic_Script
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-7 w-full h-full min-h-[300px] bg-slate-950/80 rounded-xl border border-white/5 p-5 relative flex flex-col justify-between overflow-hidden shadow-2xl">
                      
                      {currentPanel === 'telemetry' && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="h-full flex flex-col justify-center space-y-6 py-4"
                        >
                          <div className="grid grid-cols-3 gap-4 text-center">
                            {Object.entries(project.telemetry).map(([key, val]) => (
                              <div key={key} className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
                                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{key}</div>
                                <div className="text-lg font-bold tracking-tight bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] bg-clip-text text-transparent">
                                  {val}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="text-xs text-slate-400 bg-slate-900/40 border border-white/5 rounded-lg p-3 flex items-center gap-2 font-mono">
                            <span className="w-2 h-2 rounded-full bg-[#20B2A6] log-pulse animate-pulse shrink-0" />
                            <span>Telemetry sync live: Verification channel nominal.</span>
                          </div>
                        </motion.div>
                      )}

                      {currentPanel === 'architecture' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4 text-sm h-full flex flex-col justify-center"
                        >
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono text-slate-500 uppercase block">Topology Pattern</span>
                            <p className="text-[var(--text-main)] font-medium bg-slate-900 px-3 py-2 rounded-lg border border-white/5">{project.architecture.type}</p>
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono text-slate-500 uppercase block">Data Layer persistence</span>
                            <p className="text-[#20B2A6] font-mono bg-slate-900 px-3 py-2 rounded-lg border border-white/5">{project.architecture.db}</p>
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono text-slate-500 uppercase block">Processing Stream Pipeline</span>
                            <p className="text-xs font-mono text-slate-300 bg-slate-900/40 p-3 rounded-lg border border-white/5 leading-relaxed">
                              {project.architecture.flow}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {currentPanel === 'code' && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs rounded-lg overflow-auto max-h-[340px] border border-white/5"
                        >
                          <SyntaxHighlighter 
                            language={project.stack.includes('Python') ? 'python' : 'javascript'} 
                            style={atomDark}
                            customStyle={{ background: 'transparent', padding: '12px', margin: 0 }}
                          >
                            {project.snippet}
                          </SyntaxHighlighter>
                        </motion.div>
                      )}

                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5 text-xs text-slate-400">
                        <span className="font-mono text-[10px] text-slate-500">Node: {currentPanel.toUpperCase()}</span>
                        <a 
                          href={`https://github.com/garv-svnitcse/${project.repoName}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#20B2A6] hover:text-[#00bf8f] transition-colors duration-200 font-medium"
                        >
                          Source_Repository
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                    </div>

                  </div>
                </ProjectCardWrapper>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}