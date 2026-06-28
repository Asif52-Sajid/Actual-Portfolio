"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Award, Layers, ChevronLeft, ChevronRight, Globe, Code2, Download, CheckCircle2, Copy, Send } from "lucide-react";

// Interactive Project Card Component with Built-in Image Slider and Condition-Based Links
function ProjectCard({ project }: { project: any }) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents link navigation when clicking carousel arrows
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents link navigation when clicking carousel arrows
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  // Helper to conditionally wrap elements in a link if it exists
  const LinkWrapper = ({ children }: { children: React.ReactNode }) => {
    if (project.link) {
      return (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block overflow-hidden relative">
          {children}
        </a>
      );
    }
    return <div className="relative overflow-hidden">{children}</div>;
  };

  return (
    <div className="border border-[#0d2827]/10 bg-white/70 backdrop-blur-md overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl group">
      
      {/* Photo Carousel Frame - Clickable if link exists */}
      <LinkWrapper>
        <div className="relative w-full aspect-[16/10] bg-[#e3f2ed] border-b border-[#0d2827]/10">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImgIdx}
              src={project.images[currentImgIdx]}
              alt={`${project.title} screenshot ${currentImgIdx + 1}`}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </AnimatePresence>

          {project.images.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 text-[#0d2827] border border-[#0d2827]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm hover:bg-white rounded-full z-20"
              >
                <ChevronLeft size={14} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 text-[#0d2827] border border-[#0d2827]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm hover:bg-white rounded-full z-20"
              >
                <ChevronRight size={14} />
              </button>
            </>
          )}
        </div>
      </LinkWrapper>

      {/* Main Metadata Text Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#0d2827] transition-colors">
            {project.link ? (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 hover:text-teal-700 group-hover:text-teal-700"
              >
                {project.title} <ExternalLink size={15} className="text-teal-600/50" />
              </a>
            ) : (
              <span className="flex items-center justify-between">
                {project.title}
              </span>
            )}
          </h3>
          <p className="text-sm text-[#2c4e4c] mt-2 font-sans leading-relaxed line-clamp-3 font-medium">
            {project.desc}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[#0d2827]/5">
          {project.tech.map((t: string) => (
            <span key={t} className="text-[11px] font-mono px-2 py-0.5 bg-[#eaf6f2] border border-[#14b8a6]/20 text-teal-800 font-bold rounded-md">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("asifhossan525@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const layoutContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const popIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 16 } }
  };

  const focusContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const focusItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const skillsData = [
    { name: "Python / Django", percentage: 100 },
    { name: "Tailwind CSS / HTML5", percentage: 100 },
    { name: "React.js / Next.js", percentage: 95 },
    { name: "MongoDB / MySQL", percentage: 95 },
    { name: "REST APIs & Git Workflow", percentage: 90 },
    { name: "Node.js / Express", percentage: 85 }
  ];

  // Embedded verified live production paths to project registry arrays
  const dynamicProjectList = [
    { 
      title: "BookStore App", 
      category: "Full-Stack",
      desc: "A full-stack bookstore platform engineered for smooth catalog navigation, quick content rendering, and asynchronous checking loops.", 
      tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS"],
      images: ["/images/bookstore-1.png", "/images/bookstore-2.png", "/images/bookstore-3.png"],
      link: "https://book-store-app-kappa-flax.vercel.app/"
    },
    { 
      title: "Farm Fusion", 
      category: "Full-Stack",
      desc: "An agriculture ecosystem enabling micro-farmers to present harvest metrics and run direct commerce cleanly and reliably.", 
      tech: ["Python", "Django", "HTML5", "CSS3"],
      images: ["/images/farmfusion-1.png", "/images/farmfusion-2.png", "/images/farmfusion-3.png"]
    },
    { 
      title: "Restaurant-App", 
      category: "Backend",
      desc: "An optimized guest menu layout system built with interactive booking loops and clean responsive interface states.", 
      tech: ["JavaScript", "HTML5", "CSS3"],
      images: ["/images/rest-1.png", "/images/rest-2.png", "/images/rest-3.png"],
      link: "https://resturant-app-lemon.vercel.app/"
    },
    {
      title: "Organic Food Store",
      category: "Frontend",
      desc: "A store where the user can see and order the organic food.",
      tech: ["HTML", "CSS", "JavaScript"],
      images: ["/images/organic-1.png", "/images/organic-2.png"]
    },
    {
      title: "Portfolio",
      category: "Frontend",
      desc: "A personal portfolio for the user.",
      tech: ["HTML", "CSS", "JavaScript"],
      images: ["/images/port-1.png", "/images/port-2.png", "/images/port-3.png"],
      link: "https://portfolio-steel-nu-22.vercel.app/"
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? dynamicProjectList 
    : dynamicProjectList.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#f2f9f6] via-[#eaf6f2] to-[#f2f9f6] text-[#0d2827] p-4 md:p-8 lg:p-12 flex flex-col justify-center max-w-7xl mx-auto relative selection:bg-[#14b8a6] selection:text-white overflow-x-hidden">
      
      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-teal-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-mint-400/15 blur-[100px] pointer-events-none" />

      <motion.div 
        variants={layoutContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
      >
        {/* ================= LEFT SIDEBAR ================= */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
          
          <motion.div variants={popIn} className="border border-[#0d2827]/10 bg-white/80 backdrop-blur-md p-6 shadow-sm rounded-2xl relative">
            
            <div className="relative w-full aspect-[16/10] sm:aspect-square lg:aspect-[4/3] xl:aspect-square overflow-hidden border border-[#0d2827]/10 mb-6 rounded-xl bg-[#e3f2ed]">
              <img 
                src="/images/profile.png" 
                alt="Asiful Islam Sajid Profile Picture"
                className="w-full h-full object-cover object-top brightness-[0.98]"
              />
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#0d2827]">Asiful Islam Sajid</h1>
            <p className="text-sm uppercase tracking-widest font-mono text-teal-600 font-bold mt-1">Software Engineer</p>
            
            <p className="text-base text-[#2c4e4c] mt-4 leading-relaxed font-sans font-medium border-l-2 border-[#14b8a6] pl-3">
              Motivated Software Engineer pursuing a BSc in Computer Science. Proficient in responsive web design, JavaScript frameworks, and API integration.
            </p>

            <div className="mt-6 pt-6 border-t border-[#0d2827]/10 space-y-3 font-mono text-xs text-[#2c4e4c]">
              <div className="flex items-center gap-2 hover:text-teal-700 transition-colors"><Mail size={14} /> asifhossan525@gmail.com</div>
              <div className="flex items-center gap-2"><Phone size={14} /> 01862871766</div>
              <div className="flex items-center gap-2"><MapPin size={14} /> Dhaka, Bangladesh</div>
            </div>

            <div className="mt-6">
              <a 
                href="/resume.pdf/Main CV.pdf" 
                download="Asiful_Islam_Sajid_CV.pdf"
                className="w-full flex items-center justify-center gap-2 bg-[#0d2827] text-white hover:bg-teal-950 px-4 py-3 rounded-xl text-sm font-bold tracking-wider uppercase transition-all shadow-md shadow-teal-950/10 hover:-translate-y-0.5 cursor-pointer"
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </motion.div>

          <motion.div variants={popIn} className="border border-[#0d2827]/10 bg-white/80 backdrop-blur-md p-5 space-y-3.5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-[#0d2827] font-mono text-xs uppercase tracking-widest font-bold">
              <Globe size={14} className="text-teal-600" />
              <span>Language Proficiency</span>
            </div>
            <div className="space-y-2.5 font-mono text-xs text-[#2c4e4c]">
              <div className="flex justify-between items-center bg-[#f2f9f6] p-2.5 border border-teal-500/10 rounded-lg">
                <span className="font-bold">English Language</span>
                <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-bold">C2 Proficient</span>
              </div>
              <div className="flex justify-between items-center bg-[#f2f9f6] p-2.5 border border-teal-500/10 rounded-lg">
                <span className="font-bold">Bengali Language</span>
                <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-bold">Native Speaker</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={popIn} className="border border-[#0d2827]/10 bg-white/80 backdrop-blur-md p-5 space-y-4 shadow-sm rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-500/10 flex items-center justify-center text-teal-700 rounded-lg"><GraduationCap size={15} /></div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-[#0d2827]">Academic Track</h4>
                <p className="text-xs text-gray-500 font-medium">Univ. of Asia Pacific (2022-Pres.)</p>
              </div>
            </div>
            <div className="text-xs font-mono bg-[#f2f9f6] border border-[#0d2827]/10 p-2.5 rounded-xl flex items-center justify-between font-bold text-[#0d2827]">
              <span className="flex items-center gap-1.5"><Award size={13} className="text-teal-600" /> 2x Dean's Award Recipient</span>
            </div>
          </motion.div>
        </div>

        {/* ================= RIGHT MAIN PANEL ================= */}
        <div className="lg:col-span-8 space-y-6">
          
          <motion.div variants={popIn} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Availability", value: "Available for Work" },
              { label: "Architecture Quality", value: "Clean Architecture" },
              { label: "Database Layers", value: "SQL & NoSQL Structures" },
              { label: "Git Strategy", value: "Agile" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/80 border border-[#0d2827]/10 p-4 shadow-sm rounded-xl backdrop-blur-md text-center flex flex-col justify-center items-center">
                <div className="text-[10px] font-mono uppercase tracking-wider text-teal-600 font-bold">{stat.label}</div>
                <div className="text-xs font-bold text-[#0d2827] mt-1.5 tracking-tight leading-snug">{stat.value}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={popIn} className="border border-[#0d2827]/10 bg-white/80 backdrop-blur-md p-6 shadow-sm rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-[#0d2827] font-mono text-xs uppercase tracking-widest font-bold">
              <Briefcase size={14} className="text-teal-600" />
              <span>Employment Timeline</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="text-lg font-bold text-[#0d2827]">Frontend Web Developer Intern</h3>
                <p className="text-sm text-teal-600 font-mono font-semibold mt-0.5">Eutropia-IT Solution</p>
              </div>
              <span className="text-xs font-mono font-bold bg-[#f2f9f6] border border-[#0d2827]/10 px-2.5 py-1 text-teal-800 rounded">
                Feb 2026 - Present
              </span>
            </div>
          </motion.div>

          {/* Project Showroom */}
          <div className="space-y-4">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-[#0d2827]/10 pb-2">
              <h2 className="text-xs font-bold uppercase tracking-widest font-mono text-teal-600/80 ml-1">Project Showroom</h2>
              
              <div className="flex flex-wrap bg-[#e3f2ed] p-1 rounded-xl border border-[#0d2827]/5 gap-1 font-mono text-[11px] font-bold">
                {["All", "Full-Stack", "Frontend", "Backend"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeFilter === filter 
                        ? "bg-[#0d2827] text-white shadow-sm" 
                        : "text-[#2c4e4c] hover:text-[#0d2827]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {filteredProjects.length === 0 && (
              <p className="text-xs font-mono text-[#3b5e5c] italic pl-1 pt-2">No projects matching this filter yet.</p>
            )}
          </div>

          {/* Quick-Hire Contact Panel Component */}
          <motion.div variants={popIn} className="border border-[#0d2827]/10 bg-gradient-to-br from-white to-[#f7fdfb] backdrop-blur-md p-6 shadow-sm rounded-2xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-[0.02] text-[#0d2827] transform translate-x-4 translate-y-4 pointer-events-none">
              <Send size={160} />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#0d2827] font-mono text-xs uppercase tracking-widest font-bold">
                <Send size={14} className="text-teal-600" />
                <span>Quick Engagement</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1 max-w-md">
                <h3 className="text-base font-bold text-[#0d2827]">Have an engineering project or open role?</h3>
                <p className="text-xs text-[#3d6663] leading-relaxed font-medium">
                  Bypass standard forms and get in touch directly. Click below to copy my primary engineering address instantly.
                </p>
              </div>

              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-2 border border-[#0d2827]/10 hover:border-[#0d2827]/30 bg-white px-4 py-2.5 rounded-xl text-xs font-mono font-bold text-[#0d2827] shadow-sm hover:shadow active:scale-98 transition-all cursor-pointer"
                >
                  <Copy size={14} className={copied ? "text-emerald-600" : "text-teal-600"} />
                  {copied ? "Address Copied!" : "Copy Email Address"}
                </button>

                <a
                  href="mailto:asifhossan525@gmail.com"
                  className="flex items-center justify-center gap-2 bg-[#0d2827] hover:bg-teal-950 text-white px-4 py-2.5 rounded-xl text-xs font-mono font-bold shadow-sm transition-all cursor-pointer"
                >
                  <Mail size={14} />
                  Open Direct Mail
                </a>
              </div>
            </div>
          </motion.div>

          {/* Technical Skills */}
          <motion.div variants={popIn} className="border border-[#0d2827]/10 bg-white/80 backdrop-blur-md p-6 shadow-sm rounded-2xl">
            <div className="flex items-center gap-2 mb-6 text-[#0d2827] font-mono text-xs uppercase tracking-widest font-bold">
              <Layers size={14} className="text-teal-600" />
              <span>Technical Skill</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {skillsData.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center font-mono text-xs font-bold">
                    <span className="text-[#0d2827]">{skill.name}</span>
                    <span className="text-teal-700 bg-teal-50 px-1.5 py-0.5 border border-teal-200/50 rounded">{skill.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#e3f2ed] rounded-full overflow-hidden border border-[#0d2827]/5">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-teal-400 to-[#14b8a6] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.05 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Focus Areas */}
          <motion.div 
            variants={focusContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="border border-[#0d2827]/10 bg-white/80 backdrop-blur-md p-6 shadow-sm rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-4 text-[#0d2827] font-mono text-xs uppercase tracking-widest font-bold">
              <Code2 size={14} className="text-teal-600" />
              <span>Development Focus Areas</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-[#2c4e4c]">
              {[
                { title: "UI/UX Architecture", text: "Crafting modern, accessible user interfaces built cleanly using reusable components and responsive grid layouts." },
                { title: "API Integration", text: "Managing safe asynchronous execution, end-to-end data pipelines, and crisp interface hydration rules." },
                { title: "Database Schema", text: "Structuring strict, performant records and scalable models across relational structures and document layers." }
              ].map((focus, idx) => (
                <motion.div 
                  key={idx}
                  variants={focusItemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 bg-[#f2f9f6] border border-teal-500/10 rounded-xl hover:border-teal-400/50 hover:bg-white transition-all shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="font-bold text-[#0d2827] mb-2 flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-teal-500" />
                      {focus.title}
                    </div>
                    <p className="text-[#3b5e5c] leading-relaxed font-medium text-[11px]">
                      {focus.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>

      <footer className="mt-12 pt-6 border-t border-[#0d2827]/10 flex flex-col sm:flex-row justify-between text-[10px] font-mono text-teal-600/60 font-bold">
        <span>© 2026 Asiful Islam Sajid</span>
        <span>Personal Portfolio</span>
      </footer>
    </main>
  );
}