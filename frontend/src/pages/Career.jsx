
import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Code,
  Database,
  Globe,
  Brain,
  TrendingUp,
  CheckCircle,
  BookOpen,
  Target,
  Lightbulb,
  Award,
  GraduationCap,
  Rocket,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react";

function Career() {
  const [analysis, setAnalysis] = useState(null);
  const [expandedCareer, setExpandedCareer] = useState(null);

  useEffect(() => {
    const savedAnalysis = localStorage.getItem("resumeAnalysis");

    if (savedAnalysis) {
      try {
        setAnalysis(JSON.parse(savedAnalysis));
      } catch (error) {
        console.error("Resume analysis loading failed:", error);
      }
    }
  }, []);

  const careers = [
    {
      title: "Python Developer",
      icon: Brain,
      skills: ["Python", "SQL", "Flask", "Django", "REST API"],
      description:
        "Build backend applications, automation tools and intelligent software.",
      learning: ["Flask or Django", "REST API", "Git"],

      projects: [
        "Student Management System",
        "AI Resume Analyzer",
        "Online Job Portal"
      ],

      roadmap: [
        "Week 1: Python Fundamentals and OOP",
        "Week 2: SQL and Database Connectivity",
        "Week 3: Flask or Django Framework",
        "Week 4: REST API and Backend Development",
        "Week 5: Build a Python Project"
      ],

      questions: [
        "What are Python data types?",
        "Explain OOP concepts in Python.",
        "What is the difference between list and tuple?",
        "What is Flask?",
        "What is an API?"
      ],

      tips: [
        "Practice Python coding daily.",
        "Learn SQL and database connectivity.",
        "Build at least two Python projects.",
        "Practice coding problems on HackerRank."
      ]
    },

    {
      title: "Java Developer",
      icon: Code,
      skills: ["Java", "SQL", "OOP", "Spring Boot"],
      description:
        "Develop enterprise applications and scalable backend systems.",
      learning: ["Spring Boot", "JDBC", "Data Structures"],

      projects: [
        "Bank Management System",
        "Employee Management System",
        "Online Banking Application"
      ],

      roadmap: [
        "Week 1: Java Basics and OOP",
        "Week 2: Collections and Exception Handling",
        "Week 3: JDBC and MySQL",
        "Week 4: Spring Boot Fundamentals",
        "Week 5: Develop a Java Project"
      ],

      questions: [
        "What is JVM, JRE and JDK?",
        "Explain inheritance and polymorphism.",
        "What is exception handling?",
        "Difference between ArrayList and LinkedList?",
        "What is JDBC?"
      ],

      tips: [
        "Practice Java programming regularly.",
        "Understand OOP concepts clearly.",
        "Learn SQL and JDBC.",
        "Solve DSA problems using Java."
      ]
    },

    {
      title: "Frontend Developer",
      icon: Globe,
      skills: ["HTML", "CSS", "JavaScript", "React"],
      description:
        "Create responsive, interactive and user-friendly websites.",
      learning: ["JavaScript", "React", "Responsive Design"],

      projects: [
        "Personal Portfolio Website",
        "E-Commerce Website",
        "Student Dashboard"
      ],

      roadmap: [
        "Week 1: HTML and CSS",
        "Week 2: JavaScript Fundamentals",
        "Week 3: DOM Manipulation",
        "Week 4: React and Components",
        "Week 5: Build a Responsive Website"
      ],

      questions: [
        "What is HTML?",
        "Difference between HTML and HTML5?",
        "What is CSS Flexbox?",
        "What is JavaScript?",
        "What are React Hooks?"
      ],

      tips: [
        "Practice HTML and CSS layouts.",
        "Learn JavaScript fundamentals.",
        "Understand React components.",
        "Build responsive websites."
      ]
    },

    {
      title: "Data Analyst",
      icon: TrendingUp,
      skills: ["Python", "SQL", "Power BI", "Data Analysis"],
      description:
        "Analyze data and create meaningful business insights.",
      learning: ["Pandas", "Excel", "Power BI"],

      projects: [
        "Sales Analytics Dashboard",
        "Customer Analysis System",
        "Student Performance Analysis"
      ],

      roadmap: [
        "Week 1: Excel Fundamentals",
        "Week 2: SQL Queries",
        "Week 3: Python and Pandas",
        "Week 4: Power BI Visualization",
        "Week 5: Build a Data Analytics Project"
      ],

      questions: [
        "What is Data Analysis?",
        "What is the difference between SQL and MySQL?",
        "What is Pandas in Python?",
        "What is Data Visualization?",
        "What is Power BI?"
      ],

      tips: [
        "Practice SQL queries.",
        "Learn Excel formulas and functions.",
        "Understand data cleaning.",
        "Create interactive Power BI dashboards."
      ]
    },

    {
      title: "Database Developer",
      icon: Database,
      skills: ["SQL", "MySQL", "Database Design"],
      description:
        "Design, manage and optimize database systems.",
      learning: ["Advanced SQL", "Database Design", "Optimization"],

      projects: [
        "Library Management Database",
        "Hospital Management Database",
        "Inventory Management System"
      ],

      roadmap: [
        "Week 1: SQL Basics",
        "Week 2: Joins and Subqueries",
        "Week 3: Database Design and Normalization",
        "Week 4: MySQL Advanced Concepts",
        "Week 5: Database Project Development"
      ],

      questions: [
        "What is DBMS?",
        "What is Primary Key and Foreign Key?",
        "Explain SQL Joins.",
        "What is Normalization?",
        "Difference between DELETE, DROP and TRUNCATE?"
      ],

      tips: [
        "Practice SQL queries every day.",
        "Understand database relationships.",
        "Learn normalization.",
        "Practice writing complex queries."
      ]
    }
  ];

  const detectedSkills = Array.isArray(analysis?.detected_skills)
    ? analysis.detected_skills
    : [];

  const getMatch = (skills) => {
    const matched = skills.filter(skill =>
      detectedSkills.some(
        detected =>
          detected.toLowerCase().trim() === skill.toLowerCase().trim()
      )
    );

    return {
      matched,
      percentage: Math.round((matched.length / skills.length) * 100)
    };
  };

  const sortedCareers = [...careers].sort(
    (a, b) => getMatch(b.skills).percentage - getMatch(a.skills).percentage
  );

  const toggleCareer = (title) => {
    setExpandedCareer(
      expandedCareer === title ? null : title
    );
  };

  return (
    <div className="career-page">

      {/* PAGE HEADER */}

      <div className="career-heading">
        <div>
          <span className="career-tag">
            <Brain size={15} /> CAREER INTELLIGENCE
          </span>

          <h1>Career Recommendations</h1>

          <p>
            Discover career opportunities based on your technical skills.
          </p>
        </div>
      </div>

      {/* BANNER */}

      <div className="career-banner">
        <div className="career-banner-icon">
          <TrendingUp size={30} />
        </div>

        <div>
          <h2>Build Your Future Career</h2>
          <p>
            Explore suitable career paths and identify the skills
            you need to develop.
          </p>
        </div>
      </div>

      {!analysis ? (

        <div className="career-note">
          <Briefcase size={22} />

          <p>
            Please analyze your resume first in the Resume Analyzer page.
            Your detected skills will be used to calculate career matches.
          </p>
        </div>

      ) : (

        <>

          {/* CAREER SUMMARY */}

          <div className="career-section-heading">
            <div>
              <h2>Your Recommended Career Paths</h2>
              <p>
                Ranked according to your detected resume skills
              </p>
            </div>

            <span className="career-count">
              {careers.length} Careers
            </span>
          </div>

          {/* CAREER CARDS */}

          <div className="career-cards">

            {sortedCareers.map((career) => {

              const Icon = career.icon;
              const result = getMatch(career.skills);

              const missingSkills = career.skills.filter(
                skill =>
                  !result.matched.some(
                    matched =>
                      matched.toLowerCase() === skill.toLowerCase()
                  )
              );

              const isExpanded =
                expandedCareer === career.title;

              return (

                <div className="career-card" key={career.title}>

                  {/* CAREER TOP */}

                  <div className="career-card-top">

                    <div className="career-icon">
                      <Icon size={25} />
                    </div>

                    <span className="career-match-badge">
                      {result.percentage}% Match
                    </span>

                  </div>

                  <h3>{career.title}</h3>

                  <p className="career-description">
                    {career.description}
                  </p>

                  {/* SKILL COMPATIBILITY */}

                  <div className="career-match-details">

                    <div className="match-heading">
                      <span>Skill Compatibility</span>

                      <strong>
                        {result.percentage >= 70
                          ? "Strong Match"
                          : result.percentage >= 40
                          ? "Good Match"
                          : "Learning Opportunity"}
                      </strong>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${result.percentage}%`
                        }}
                      />
                    </div>

                  </div>

                  {/* MATCHING SKILLS */}

                  <div className="career-skills-section">

                    <h4>
                      <CheckCircle size={16} />
                      Your Matching Skills
                    </h4>

                    <div className="career-skills">

                      {result.matched.length > 0
                        ? result.matched.map(skill => (
                            <span key={skill}>{skill}</span>
                          ))
                        : <span>No matching skills yet</span>
                      }

                    </div>

                  </div>

                  {/* MISSING SKILLS */}

                  <div className="career-skills-section">

                    <h4>
                      <Target size={16} />
                      Skills to Learn
                    </h4>

                    <div className="career-skills">

                      {missingSkills.map(skill => (
                        <span key={skill}>{skill}</span>
                      ))}

                    </div>

                  </div>

                  {/* LEARNING SUGGESTIONS */}

                  <div className="career-learning">

                    <h4>
                      <BookOpen size={17} />
                      Learning Suggestions
                    </h4>

                    {career.learning.map(item => (
                      <p key={item}>
                        <CheckCircle size={14} />
                        {item}
                      </p>
                    ))}

                  </div>

                  {/* VIEW GUIDANCE BUTTON */}

                  <button
                    className="career-guidance-btn"
                    onClick={() => toggleCareer(career.title)}
                  >

                    <Sparkles size={17} />

                    {isExpanded
                      ? "Hide Career Guidance"
                      : "Explore Career Guidance"}

                    {isExpanded
                      ? <ChevronUp size={18} />
                      : <ChevronDown size={18} />}

                  </button>

                  {/* EXPANDED GUIDANCE */}

                  {isExpanded && (

                    <div className="career-guidance">

                      {/* WHY THIS CAREER */}

                      <div className="guidance-section">

                        <h4>
                          <Lightbulb size={19} />
                          Why This Career?
                        </h4>

                        <p>
                          {result.matched.length > 0
                            ? `You already have ${result.matched.join(", ")}.
                               These skills are relevant to ${career.title}.
                               Developing the remaining skills can help
                               you prepare for this career.`
                            : `You have not yet matched the listed technical
                               skills for this career. Start with the
                               recommended learning topics to build
                               your foundation.`}
                        </p>

                      </div>

                      {/* LEARNING ROADMAP */}

                      <div className="guidance-section">

                        <h4>
                          <GraduationCap size={19} />
                          Your Learning Roadmap
                        </h4>

                        {career.roadmap.map((step, index) => (

                          <div
                            className="guidance-list-item"
                            key={step}
                          >
                            <span className="guidance-number">
                              {index + 1}
                            </span>

                            <p>{step}</p>

                          </div>

                        ))}

                      </div>

                      {/* PROJECTS */}

                      <div className="guidance-section">

                        <h4>
                          <Rocket size={19} />
                          Recommended Projects
                        </h4>

                        {career.projects.map(project => (

                          <div
                            className="guidance-project"
                            key={project}
                          >
                            <CheckCircle size={16} />
                            <span>{project}</span>
                          </div>

                        ))}

                      </div>

                      {/* INTERVIEW QUESTIONS */}

                      <div className="guidance-section">

                        <h4>
                          <MessageSquare size={19} />
                          Interview Preparation
                        </h4>

                        {career.questions.map((question, index) => (

                          <div
                            className="guidance-question"
                            key={question}
                          >
                            <strong>Q{index + 1}.</strong>
                            <span>{question}</span>
                          </div>

                        ))}

                      </div>

                      {/* PLACEMENT TIPS */}

                      <div className="guidance-section">

                        <h4>
                          <Award size={19} />
                          Placement Preparation Tips
                        </h4>

                        {career.tips.map(tip => (

                          <div
                            className="guidance-project"
                            key={tip}
                          >
                            <CheckCircle size={16} />
                            <span>{tip}</span>
                          </div>

                        ))}

                      </div>

                    </div>

                  )}

                </div>

              );

            })}

          </div>

          {/* FINAL NOTE */}

          <div className="career-note">

            <Lightbulb size={22} />

            <p>
              These career matches are calculated using keyword matching
              against your uploaded resume skills. Career guidance and
              learning suggestions are rule-based recommendations,
              not guaranteed job-fit predictions.
            </p>

          </div>

        </>

      )}

    </div>
  );
}

export default Career;
