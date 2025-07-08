"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { submitContactForm } from "@/actions/contact"
import Image from "next/image"
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Brain,
  GraduationCap,
  ChevronRight,
  ExternalLink,
  Send,
  Star,
  Trophy,
  Target,
  Lightbulb,
  Rocket,
  Sun,
  Moon,
  Twitter,
  ArrowRight,
  DollarSign,
  Recycle,
  Wind,
  Loader2,
  X,
} from "lucide-react"

export default function Portfolio() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const skillsRef = useRef<HTMLDivElement>(null)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [counters, setCounters] = useState({ majorProjects: 0, totalProjects: 0, certifications: 0, awards: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Animated counter effect
  useEffect(() => {
    if (visibleElements.has("stats-section") && !hasAnimated) {
      setHasAnimated(true)

      // Animate major projects counter
      let majorProjectCount = 0
      const majorProjectInterval = setInterval(() => {
        majorProjectCount += 1
        setCounters((prev) => ({ ...prev, majorProjects: majorProjectCount }))
        if (majorProjectCount >= 4) clearInterval(majorProjectInterval)
      }, 100)

      // Animate total projects counter
      let totalProjectCount = 0
      const totalProjectInterval = setInterval(() => {
        totalProjectCount += 1
        setCounters((prev) => ({ ...prev, totalProjects: totalProjectCount }))
        if (totalProjectCount >= 6) clearInterval(totalProjectInterval)
      }, 80)

      // Animate certifications counter
      let certCount = 0
      const certInterval = setInterval(() => {
        certCount += 1
        setCounters((prev) => ({ ...prev, certifications: certCount }))
        if (certCount >= 11) clearInterval(certInterval)
      }, 60)

      // Animate awards counter
      let awardCount = 0
      const awardInterval = setInterval(() => {
        awardCount += 1
        setCounters((prev) => ({ ...prev, awards: awardCount }))
        if (awardCount >= 2) clearInterval(awardInterval)
      }, 200)
    }
  }, [visibleElements, hasAnimated])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const skills = [
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "TensorFlow",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    },
    {
      name: "Firebase",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    },
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "AWS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    },
  ]

  const journeySteps = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Academic Foundation",
      description: "Started B.Tech CSE journey with specialization in AI/ML",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Technical Mastery",
      description: "Mastered programming languages and frameworks, building strong foundation in software development",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI/ML Specialization",
      description: "Deep dive into Artificial Intelligence and Machine Learning, developing innovative solutions",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Recognition & Awards",
      description: "Won 1st Prize at ISTE National Convention for Eco Bins project, establishing credibility",
    },
    {
      icon: <ArrowRight className="w-6 h-6" />,
      title: "Continuous Innovation",
      description: "Currently developing multiple projects and exploring startup opportunities in AI/ML domain...",
    },
  ]

  const projects = [
    {
      title: "ViewPay - Ad-to-Cash Platform",
      category: "Fintech Startup",
      status: "Live",
      icon: <DollarSign className="w-8 h-8" />,
      problem: "Limited earning opportunities for users through digital engagement",
      solution: "Monetization platform that rewards users for watching ads with real money",
      outcome: "Self-sustaining platform benefiting both users and advertisers",
      tech: ["React.js", "Firebase", "AdSense", "Tailwind CSS"],
      highlights: [
        "Ad-to-Cash monetization model",
        "Personalized user dashboard",
        "Referral program with bonuses",
        "Email verification system",
        "Indian mobile number restriction",
        "Multiple UI themes (light/dark)",
      ],
      link: "https://www.viewpay.store/",
    },
    {
      title: "EcoBins - Smart Waste Management",
      category: "Sustainability",
      status: "Award Winner",
      icon: <Recycle className="w-8 h-8" />,
      problem: "Lack of waste sorting at source and low recycling awareness",
      solution: "Smart bins with sensors for automatic waste segregation and user education",
      outcome: "🥇 1st Prize at ISTE National Convention + Increased income & reduced resource waste",
      tech: ["IoT Sensors", "Mobile App", "System Design", "Business Model"],
      highlights: [
        "Smart waste detection & segregation",
        "Color-coded disposal system",
        "Mobile app integration",
        "User reward system for correct disposal",
        "Educational awareness module",
        "Sustainable habit encouragement",
      ],
      link: "#",
    },
    {
      title: "Air Quality Analyzer",
      category: "Environmental Tech",
      status: "Live",
      icon: <Wind className="w-8 h-8" />,
      problem: "Lack of real-time air quality awareness for health planning",
      solution: "Interactive tool for real-time AQI measurement and visualization",
      outcome: "Enhanced environmental awareness and data-driven health decisions",
      tech: ["Python", "Chart.js", "API Integration", "React"],
      highlights: [
        "Real-time AQI calculation",
        "Color-coded health zones",
        "City-wise AQI information",
        "Health advisory based on AQI levels",
        "Mobile-friendly responsive UI",
        "Government API integration",
      ],
      link: "https://github.com/PiyushMaurya6074/API-AQI-Air-Quality-Index-Analyzer",
    },
    {
      title: "Mental Health Chatbot",
      category: "Healthcare AI",
      status: "In Development",
      icon: <Brain className="w-8 h-8" />,
      problem: "Limited access to mental health support and stigma barriers",
      solution: "AI-powered confidential mental health support platform using NLP",
      outcome: "Empathetic AI responses for mental health crisis intervention",
      tech: ["Python", "NLP", "Sentiment Analysis", "Machine Learning"],
      highlights: [
        "Advanced NLP implementation",
        "Confidential support platform",
        "Crisis intervention capabilities",
        "Empathetic response generation",
        "Therapeutic conversation AI",
        "Mental health awareness",
      ],
      link: "#",
    },
  ]

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/piyush--maurya/",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      name: "GitHub",
      url: "https://github.com/piyushmaurya6074",
      icon: <Github className="w-5 h-5" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/PiyushMaur2004",
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      name: "Email",
      url: "mailto:piyushmaurya6074@gmail.com",
      icon: <Mail className="w-5 h-5" />,
    },
  ]

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setSubmitMessage("")

    const result = await submitContactForm(formData)

    setIsSubmitting(false)
    setSubmitMessage(result.message)

    if (result.success) {
      const form = document.getElementById("contact-form") as HTMLFormElement
      form?.reset()
      setTimeout(() => {
        setIsContactModalOpen(false)
        setSubmitMessage("")
      }, 2000)
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Fixed Header - Mobile Responsive */}
      <header
        className={`fixed top-0 w-full backdrop-blur-md z-50 border-b transition-colors duration-300 ${
          theme === "dark" ? "bg-black/80 border-gray-800" : "bg-white/80 border-gray-200"
        }`}
      >
        <nav className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="text-lg md:text-xl font-bold font-poppins tracking-wider">PIYUSH MAURYA</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-gray-500 transition-colors duration-300 font-medium uppercase tracking-wide text-sm ${
                    activeSection === item.toLowerCase() ? "text-gray-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Navigation - Simple buttons */}
            <div className="md:hidden flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection("projects")}
                className={`text-xs px-2 py-1 ${
                  theme === "dark"
                    ? "border-gray-600 hover:bg-gray-800 bg-transparent text-white"
                    : "border-gray-300 hover:bg-gray-100 bg-transparent text-black"
                }`}
              >
                Projects
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsContactModalOpen(true)}
                className={`text-xs px-2 py-1 ${
                  theme === "dark"
                    ? "border-gray-600 hover:bg-gray-800 bg-transparent text-white"
                    : "border-gray-300 hover:bg-gray-100 bg-transparent text-black"
                }`}
              >
                Contact
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`transition-colors duration-300 ${
                theme === "dark"
                  ? "border-gray-600 hover:bg-gray-800 bg-transparent text-white"
                  : "border-gray-300 hover:bg-gray-100 bg-transparent text-black"
              }`}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </nav>
      </header>

      {/* Modern Fixed Time Widget - Mobile Responsive */}
      <div className="fixed top-20 right-2 md:top-24 md:right-6 z-50">
        <div
          className={`backdrop-blur-xl rounded-xl md:rounded-2xl px-2 py-1 md:px-4 md:py-2 border transition-all duration-300 ${
            theme === "dark" ? "bg-black/40 border-white/20 text-white" : "bg-white/40 border-black/20 text-black"
          }`}
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            fontFamily: "monospace",
          }}
        >
          <div className="flex items-center space-x-1 md:space-x-2">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
            <span className="text-xs md:text-sm font-medium tracking-wider">
              <span className="hidden md:inline">LOCAL/</span>
              {currentTime.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in-up">
            {/* Profile Image with Scroll Animation */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div
                  className={`rounded-full overflow-hidden border-2 transition-all duration-300 ${
                    theme === "dark" ? "border-gray-400" : "border-gray-600"
                  }`}
                  style={{
                    width: Math.max(192 - scrollY * 0.1, 120),
                    height: Math.max(192 - scrollY * 0.1, 120),
                  }}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Piyush Maurya"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`absolute -bottom-2 -right-2 rounded-full p-2 ${
                    theme === "dark" ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  <Brain className="w-4 h-4" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold font-poppins mb-6 tracking-tight">
              PIYUSH MAURYA
            </h1>
            <div
              className={`text-lg md:text-xl lg:text-2xl mb-4 font-medium tracking-wide text-center ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              AI/ML SPECIALIST • B.TECH CSE UNDERGRADUATE • TECH INNOVATOR
            </div>
            <div
              className={`text-lg md:text-xl mb-12 max-w-4xl mx-auto font-medium leading-relaxed ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              TRANSFORMING IDEAS INTO INTELLIGENT SOLUTIONS THAT SOLVE REAL-WORLD PROBLEMS IN SUSTAINABILITY, MENTAL
              HEALTH, AND AUTOMATION.
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection("projects")}
                className={`px-8 py-3 text-lg font-medium uppercase tracking-wide transition-colors duration-300 ${
                  theme === "dark" ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Explore Work
              </Button>
              <Button
                onClick={() => setIsContactModalOpen(true)}
                variant="outline"
                className={`px-8 py-3 text-lg font-medium uppercase tracking-wide transition-colors duration-300 ${
                  theme === "dark"
                    ? "border-gray-600 hover:bg-gray-800 bg-transparent text-white"
                    : "border-gray-300 hover:bg-gray-100 bg-transparent text-black"
                }`}
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 mt-8">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(social.url, "_blank")}
                  className={`transition-all duration-300 hover:scale-110 ${
                    theme === "dark"
                      ? "border-gray-600 hover:bg-gray-800 bg-transparent text-white"
                      : "border-gray-300 hover:bg-gray-100 bg-transparent text-black"
                  }`}
                >
                  {social.icon}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Journey */}
      <section
        id="about"
        className={`py-20 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900/20" : "bg-gray-50/50"}`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black font-poppins text-center mb-8 tracking-tight">MY JOURNEY</h2>

          {/* About Paragraph */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              My journey in technology began with curiosity and evolved into a passion for creating intelligent
              solutions. As a B.Tech CSE student specializing in AI/ML, I've dedicated myself to bridging the gap
              between theoretical knowledge and practical applications. From winning national competitions to developing
              real-world projects, every step has been driven by the desire to solve meaningful problems through
              innovative technology.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {journeySteps.map((step, index) => (
              <div
                key={index}
                id={`journey-${index}`}
                data-animate
                className={`flex items-start mb-12 group transition-all duration-700 ${
                  visibleElements.has(`journey-${index}`)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-[-50px]"
                }`}
              >
                <div className="flex-shrink-0 mr-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                      theme === "dark" ? "bg-white text-black" : "bg-black text-white"
                    }`}
                  >
                    {step.icon}
                  </div>
                  {index < journeySteps.length - 1 && (
                    <div
                      className={`w-0.5 h-16 ml-6 mt-4 ${
                        index === journeySteps.length - 2
                          ? theme === "dark"
                            ? "bg-gradient-to-b from-white via-gray-400 to-transparent animate-pulse"
                            : "bg-gradient-to-b from-black via-gray-600 to-transparent animate-pulse"
                          : theme === "dark"
                            ? "bg-white"
                            : "bg-black"
                      }`}
                    ></div>
                  )}
                </div>
                <div className="flex-1 group-hover:translate-x-2 transition-transform duration-300">
                  <h3 className="text-xl font-bold font-poppins mb-2 uppercase tracking-wide">{step.title}</h3>
                  <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Mobile Responsive */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-black font-poppins text-center mb-8 md:mb-16 tracking-tight">
            TECHNICAL SKILLS
          </h2>

          {/* Desktop: Auto-scrolling */}
          <div className="hidden md:block relative max-w-6xl mx-auto overflow-hidden">
            <div
              ref={skillsRef}
              className="flex space-x-6 py-4 animate-scroll"
              data-animate
              id="skills-container"
              style={{
                animation: "scroll 20s linear infinite",
                width: "fit-content",
              }}
            >
              {/* Duplicate skills array for seamless loop */}
              {[...skills, ...skills].map((skill, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 backdrop-blur-sm rounded-lg p-6 border transition-all duration-500 hover:scale-105 ${
                    visibleElements.has("skills-container") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  } ${
                    theme === "dark"
                      ? "bg-gray-800/50 border-gray-700 hover:border-white"
                      : "bg-white/50 border-gray-200 hover:border-black"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <img
                      src={skill.icon || "/placeholder.svg"}
                      alt={skill.name}
                      className="w-12 h-12"
                      onError={(e) => {
                        e.currentTarget.src = `/placeholder.svg?height=48&width=48&text=${skill.name.slice(0, 2)}`
                      }}
                    />
                    <span
                      className={`font-medium whitespace-nowrap font-poppins uppercase tracking-wide text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {skill.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Grid Layout */}
          <div className="md:hidden grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`backdrop-blur-sm rounded-lg p-4 border transition-all duration-500 ${
                  theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={skill.icon || "/placeholder.svg"}
                    alt={skill.name}
                    className="w-8 h-8"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg?height=32&width=32&text=${skill.name.slice(0, 2)}`
                    }}
                  />
                  <span
                    className={`font-medium text-center font-poppins uppercase tracking-wide text-xs ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900/20" : "bg-gray-50/50"}`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black font-poppins text-center mb-16 tracking-tight">
            FEATURED PROJECTS
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card
                key={index}
                id={`project-${index}`}
                data-animate
                className={`border transition-all duration-700 hover:scale-105 group ${
                  visibleElements.has(`project-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${
                  theme === "dark"
                    ? "bg-gray-800/50 border-gray-700 hover:border-white"
                    : "bg-white/50 border-gray-200 hover:border-black"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div>{project.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold font-poppins uppercase tracking-wide">{project.title}</h3>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                          {project.category}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`uppercase tracking-wide ${theme === "dark" ? "border-gray-600" : "border-gray-300"} ${
                        project.status === "Award Winner"
                          ? "border-yellow-500 text-yellow-500"
                          : theme === "dark"
                            ? "text-gray-300"
                            : "text-gray-700"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Target className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-500 uppercase tracking-wide">Problem</p>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {project.problem}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-yellow-500 uppercase tracking-wide">Solution</p>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-500 uppercase tracking-wide">Outcome</p>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {project.outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className={`uppercase tracking-wide text-xs ${
                            theme === "dark" ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"
                          }`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-1">
                      {project.highlights.slice(0, 4).map((highlight, highlightIndex) => (
                        <div
                          key={highlightIndex}
                          className={`flex items-center space-x-2 text-sm ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <ChevronRight className="w-3 h-3" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => window.open(project.link, "_blank")}
                    className={`w-full mt-4 group-hover:scale-105 transition-transform duration-300 uppercase tracking-wide ${
                      theme === "dark"
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section with Signature */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Signature */}
          <div className="mb-12 flex flex-col items-center">
            <div className="relative">
              <Image
                src="/signature.png"
                alt="Piyush Signature"
                width={350}
                height={140}
                className="opacity-80"
                style={{
                  filter: theme === "dark" ? "invert(1)" : "invert(0)",
                }}
              />
            </div>
            {/* Simple Connecting Line */}
            <div className={`w-px h-16 mt-4 ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
          </div>

          {/* Statistics */}
          <div
            id="stats-section"
            data-animate
            className={`backdrop-blur-sm rounded-lg p-8 border max-w-6xl mx-auto transition-all duration-1000 ${
              visibleElements.has("stats-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } ${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black font-poppins mb-2">{counters.majorProjects}+</div>
                <div
                  className={`text-sm uppercase tracking-wide ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  Major Projects
                </div>
              </div>

              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black font-poppins mb-2">{counters.totalProjects}+</div>
                <div
                  className={`text-sm uppercase tracking-wide ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  Total Projects
                </div>
              </div>

              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black font-poppins mb-2">{counters.certifications}+</div>
                <div
                  className={`text-sm uppercase tracking-wide ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  Certifications
                </div>
              </div>

              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black font-poppins mb-2">{counters.awards}</div>
                <div
                  className={`text-sm uppercase tracking-wide ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  Award Wins
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div
              className={`text-center mt-12 pt-8 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
            >
              <blockquote
                className={`text-xl md:text-2xl font-medium italic mb-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                "Piyush consistently delivers innovative tech, bridging gaps between ideas and real-world results."
              </blockquote>
              <cite
                className={`text-sm uppercase tracking-wide ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}
              >
                - Tech Mentor
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Just Button */}
      <section
        id="contact"
        className={`py-20 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900/20" : "bg-gray-50/50"}`}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black font-poppins mb-8 tracking-tight">LET'S WORK TOGETHER</h2>
          <p className={`text-lg mb-12 max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Ready to collaborate on innovative AI/ML projects or discuss tech opportunities.
          </p>

          <Button
            onClick={() => setIsContactModalOpen(true)}
            className={`px-12 py-4 text-xl font-medium uppercase tracking-wide transition-all duration-300 hover:scale-105 ${
              theme === "dark" ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <Mail className="w-6 h-6 mr-3" />
            CONTACT NOW
          </Button>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mt-12">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                size="lg"
                variant="outline"
                onClick={() => window.open(social.url, "_blank")}
                className={`transition-all duration-300 hover:scale-110 ${
                  theme === "dark"
                    ? "border-gray-600 hover:bg-gray-800 bg-transparent text-white"
                    : "border-gray-300 hover:bg-gray-100 bg-transparent text-black"
                }`}
              >
                {social.icon}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsContactModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div
            className={`relative w-full max-w-lg rounded-2xl border p-6 max-h-[90vh] overflow-y-auto ${
              theme === "dark" ? "bg-black border-white/20" : "bg-white border-black/20"
            }`}
          >
            {/* Close Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsContactModalOpen(false)}
              className={`absolute top-4 right-4 z-10 ${
                theme === "dark"
                  ? "border-gray-600 hover:bg-gray-800 text-white"
                  : "border-gray-300 hover:bg-gray-100 text-black"
              }`}
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Connecting Lines Above Form */}
            <div className="flex justify-center mb-6">
              <div className="flex flex-col items-center">
                {/* Top line */}
                <div className={`w-px h-6 ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
                {/* Junction */}
                <div className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
                {/* Bottom line */}
                <div className={`w-px h-6 ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black font-poppins mb-2 tracking-tight">RING A BELL!</h2>
              <p className={`text-sm mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Ready to collaborate on innovative AI/ML projects.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold font-poppins uppercase tracking-wide">FILL THIS FORM OUT</h3>
            </div>

            {/* Contact Form */}
            <form id="contact-form" action={handleSubmit} className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Name*
                </label>
                <Input
                  name="name"
                  placeholder="Your Name"
                  required
                  className={`w-full p-3 ${
                    theme === "dark"
                      ? "bg-transparent border-white/20 text-white placeholder-gray-500 focus:border-white"
                      : "bg-transparent border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Email*
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className={`w-full p-3 ${
                    theme === "dark"
                      ? "bg-transparent border-white/20 text-white placeholder-gray-500 focus:border-white"
                      : "bg-transparent border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Message*
                </label>
                <Textarea
                  name="message"
                  placeholder="Your message here..."
                  rows={4}
                  required
                  className={`w-full p-3 resize-none ${
                    theme === "dark"
                      ? "bg-transparent border-white/20 text-white placeholder-gray-500 focus:border-white"
                      : "bg-transparent border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                />
              </div>

              {/* SUBMIT BUTTON - CLEARLY VISIBLE */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 text-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-lg ${
                    theme === "dark" ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-900"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      <span>SENDING...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      <span>SUBMIT</span>
                    </div>
                  )}
                </button>
              </div>
            </form>

            {submitMessage && (
              <div
                className={`mt-4 text-center text-sm font-medium ${
                  submitMessage.includes("Thank you") ? "text-green-500" : "text-red-500"
                }`}
              >
                {submitMessage}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className={`py-8 border-t transition-colors duration-300 ${
          theme === "dark" ? "bg-black/50 border-gray-800" : "bg-gray-50/50 border-gray-200"
        }`}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4">
            <div className="text-2xl font-bold font-poppins mb-2 tracking-wider">PIYUSH MAURYA</div>
          </div>
          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
            © 2025 BUILT WITH PASSION & PRECISION
          </p>
        </div>
      </footer>
    </div>
  )
}
