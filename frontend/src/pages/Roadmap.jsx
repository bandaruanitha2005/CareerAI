
import React, { useEffect, useState } from "react";

import {
  CheckCircle,
  Circle,
  Code,
  Database,
  Globe,
  Brain,
  Server,
  Award,
  Clock,
  BookOpen,
  Target,
  TrendingUp,
  Lightbulb
} from "lucide-react";

const learningPaths = {
  "Python Developer": [
    { title: "Python Fundamentals", description: "Learn variables, data types, loops, functions and OOP.", duration: "2 Weeks", level: "Beginner", icon: Code },
    { title: "Data Structures & Algorithms", description: "Practice arrays, strings, lists, dictionaries and problem solving.", duration: "4 Weeks", level: "Intermediate", icon: Brain },
    { title: "SQL & MySQL", description: "Learn queries, joins, subqueries and database management.", duration: "2 Weeks", level: "Beginner", icon: Database },
    { title: "Flask / Django", description: "Build web applications and backend services using Python.", duration: "3 Weeks", level: "Intermediate", icon: Server },
    { title: "REST API & Projects", description: "Develop APIs and create real-world Python projects.", duration: "3 Weeks", level: "Advanced", icon: Globe }
  ],

  "Java Developer": [
    { title: "Core Java", description: "Master Java fundamentals, OOP and exception handling.", duration: "3 Weeks", level: "Beginner", icon: Code },
    { title: "Data Structures & Algorithms", description: "Practice arrays, strings, linked lists and algorithms.", duration: "4 Weeks", level: "Intermediate", icon: Brain },
    { title: "SQL & MySQL", description: "Learn database queries, joins and database design.", duration: "2 Weeks", level: "Beginner", icon: Database },
    { title: "JDBC & Spring Boot", description: "Connect Java applications with databases and build backend services.", duration: "4 Weeks", level: "Advanced", icon: Server },
    { title: "REST API & Projects", description: "Build Java backend applications and practical projects.", duration: "3 Weeks", level: "Advanced", icon: Globe }
  ],

  "Frontend Developer": [
    { title: "HTML Fundamentals", description: "Learn page structure, forms, links and semantic elements.", duration: "1 Week", level: "Beginner", icon: Globe },
    { title: "CSS & Responsive Design", description: "Learn styling, Flexbox, Grid and responsive layouts.", duration: "2 Weeks", level: "Beginner", icon: Code },
    { title: "JavaScript", description: "Understand functions, arrays, objects and DOM manipulation.", duration: "3 Weeks", level: "Intermediate", icon: Brain },
    { title: "React Development", description: "Learn components, props, hooks and state management.", duration: "3 Weeks", level: "Intermediate", icon: Code },
    { title: "Frontend Projects", description: "Create responsive websites and interactive applications.", duration: "3 Weeks", level: "Advanced", icon: Globe }
  ],

  "Database Developer": [
    { title: "Database Fundamentals", description: "Understand tables, records, keys and relationships.", duration: "1 Week", level: "Beginner", icon: Database },
    { title: "SQL Queries", description: "Practice SELECT, INSERT, UPDATE, DELETE and joins.", duration: "2 Weeks", level: "Beginner", icon: Code },
    { title: "Advanced SQL", description: "Learn subqueries, views, stored procedures and functions.", duration: "3 Weeks", level: "Intermediate", icon: Brain },
    { title: "Database Design", description: "Understand normalization, relationships and indexing.", duration: "2 Weeks", level: "Intermediate", icon: Database },
    { title: "Database Projects", description: "Build and optimize a real-world database project.", duration: "3 Weeks", level: "Advanced", icon: Server }
  ],

  "Data Analyst": [
    { title: "Python for Data Analysis", description: "Learn Python basics and data handling.", duration: "2 Weeks", level: "Beginner", icon: Code },
    { title: "SQL & MySQL", description: "Extract and manage data using SQL queries.", duration: "2 Weeks", level: "Beginner", icon: Database },
    { title: "Excel & Statistics", description: "Learn data cleaning, formulas and basic statistics.", duration: "2 Weeks", level: "Intermediate", icon: Brain },
    { title: "Pandas & NumPy", description: "Analyze datasets using Python libraries.", duration: "3 Weeks", level: "Intermediate", icon: Code },
    { title: "Power BI & Projects", description: "Create dashboards and meaningful data visualizations.", duration: "3 Weeks", level: "Advanced", icon: TrendingUp }
  ]
};

function Roadmap() {

  const [career, setCareer] = useState("Python Developer");
  const [completed, setCompleted] = useState([]);

  const topics = learningPaths[career];

  // Load resume recommendations and saved progress
  useEffect(() => {
    const savedAnalysis = localStorage.getItem("resumeAnalysis");

    if (savedAnalysis) {
      try {
        const data = JSON.parse(savedAnalysis);
        const recommendations = data.career_recommendations || [];

        const availableCareer = recommendations.find(
          item => learningPaths[item]
        );

        if (availableCareer) {
          setCareer(availableCareer);
        }
      } catch (error) {
        console.error("Unable to load resume analysis", error);
      }
    }
  }, []);

  // Load progress whenever career changes
  useEffect(() => {
    const savedProgress = localStorage.getItem("roadmapProgress");

    if (savedProgress) {
      try {
        const progressData = JSON.parse(savedProgress);
        setCompleted(progressData[career] || []);
      } catch (error) {
        setCompleted([]);
      }
    } else {
      setCompleted([]);
    }
  }, [career]);

  function toggleComplete(index) {

    const updated = completed.includes(index)
      ? completed.filter(item => item !== index)
      : [...completed, index];

    setCompleted(updated);

    const savedProgress = localStorage.getItem("roadmapProgress");
    let progressData = {};

    try {
      progressData = savedProgress ? JSON.parse(savedProgress) : {};
    } catch (error) {
      progressData = {};
    }

    progressData[career] = updated;

    localStorage.setItem(
      "roadmapProgress",
      JSON.stringify(progressData)
    );
  }

  const progress = Math.round(
    (completed.length / topics.length) * 100
  );

  return (

    <div className="roadmap-page">

      <div className="roadmap-heading">
        <div>
          <span className="roadmap-tag">
            <Target size={15} /> YOUR CAREER JOURNEY
          </span>

          <h1>Personalized Learning Roadmap</h1>

          <p>
            Follow your career path and develop the skills needed
            for placement opportunities.
          </p>
        </div>
      </div>

      {/* Career Selection */}

      <div className="roadmap-progress-panel">

        <h2>
          <BriefcaseIcon /> Choose Your Career Path
        </h2>

        <select
          value={career}
          onChange={event => setCareer(event.target.value)}
          style={{
            width: "100%",
            padding: "13px",
            marginTop: "15px",
            borderRadius: "9px",
            border: "1px solid #d0dddd",
            fontSize: "15px",
            background: "#ffffff"
          }}
        >
          {Object.keys(learningPaths).map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <p style={{ marginTop: "12px" }}>
          Selected Career: <strong>{career}</strong>
        </p>

      </div>

      {/* Overview */}

      <div className="roadmap-overview">

        <div className="roadmap-overview-card">
          <div className="overview-icon">
            <BookOpen size={23} />
          </div>
          <div>
            <span>Total Learning Topics</span>
            <h2>{topics.length}</h2>
          </div>
        </div>

        <div className="roadmap-overview-card">
          <div className="overview-icon">
            <CheckCircle size={23} />
          </div>
          <div>
            <span>Topics Completed</span>
            <h2>{completed.length}</h2>
          </div>
        </div>

        <div className="roadmap-overview-card">
          <div className="overview-icon">
            <TrendingUp size={23} />
          </div>
          <div>
            <span>Overall Progress</span>
            <h2>{progress}%</h2>
          </div>
        </div>

      </div>

      {/* Progress */}

      <div className="roadmap-progress-panel">

        <div className="roadmap-progress-header">
          <div>
            <h2>Your Learning Progress</h2>
            <p>Keep moving forward. Every step matters!</p>
          </div>

          <strong>{progress}%</strong>
        </div>

        <div className="roadmap-progress-track">
          <div
            className="roadmap-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="roadmap-progress-bottom">
          <span>{completed.length} topics completed</span>
          <span>{topics.length - completed.length} remaining</span>
        </div>

      </div>

      {/* Learning Journey */}

      <div className="roadmap-section-heading">
        <div>
          <h2>{career} Learning Journey</h2>
          <p>Complete each stage to move closer to your career goal.</p>
        </div>

        <span>{topics.length} Stages</span>
      </div>

      <div className="roadmap-timeline">

        {topics.map((topic, index) => {

          const Icon = topic.icon;
          const isCompleted = completed.includes(index);

          return (

            <div
              className={`roadmap-step ${isCompleted ? "step-completed" : ""}`}
              key={topic.title}
            >

              <div className="roadmap-step-marker">
                {isCompleted ? (
                  <CheckCircle size={25} />
                ) : (
                  <span>{String(index + 1).padStart(2, "0")}</span>
                )}
              </div>

              <div className="roadmap-step-card">

                <div className="roadmap-step-icon">
                  <Icon size={25} />
                </div>

                <div className="roadmap-step-content">

                  <div className="roadmap-step-title">
                    <h3>{topic.title}</h3>

                    <span className={isCompleted ? "status-done" : "status-pending"}>
                      {isCompleted ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <p>{topic.description}</p>

                  <div className="roadmap-step-meta">
                    <span>
                      <Clock size={15} /> {topic.duration}
                    </span>

                    <span>
                      <BookOpen size={15} /> {topic.level}
                    </span>
                  </div>

                </div>

                <button
                  className={`roadmap-complete-btn ${isCompleted ? "done" : ""}`}
                  onClick={() => toggleComplete(index)}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle size={17} />
                      Completed
                    </>
                  ) : (
                    <>
                      <Circle size={17} />
                      Mark Complete
                    </>
                  )}
                </button>

              </div>

            </div>

          );

        })}

      </div>

      {/* Motivation */}

      <div className="roadmap-motivation">

        <div className="motivation-icon">
          <Award size={30} />
        </div>

        <div>
          <h3>
            {progress === 100
              ? "Congratulations! Roadmap Completed!"
              : "Keep Learning, Keep Growing!"}
          </h3>

          <p>
            {progress === 100
              ? "You have completed all learning stages for this career path."
              : "Consistency is the key to success. Complete your learning stages and prepare for placements."}
          </p>
        </div>

      </div>

      <div className="career-note">
        <Lightbulb size={20} />
        <p>
          Learning paths are suggested study plans. Choose topics
          according to your knowledge and placement goals.
        </p>
      </div>

    </div>
  );
}

function BriefcaseIcon() {
  return <Target size={20} />;
}

export default Roadmap;
