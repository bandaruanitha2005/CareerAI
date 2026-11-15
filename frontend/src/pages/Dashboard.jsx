
import React, { useEffect, useState } from "react";

import {
  FileText,
  Target,
  Code,
  TrendingUp,
  Brain,
  Briefcase,
  BookOpen
} from "lucide-react";

function Dashboard({ setActivePage }) {

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("resumeAnalysis");

    if (savedData) {
      try {
        setAnalysis(JSON.parse(savedData));
      } catch (error) {
        console.error("Unable to read resume analysis:", error);
      }
    }
  }, []);

  const skills = analysis?.detected_skills || [];
  const careers = analysis?.career_recommendations || [];
  const score = analysis?.resume_score ?? 0;

  const stats = [
    {
      title: "Resume Status",
      value: analysis ? "Uploaded" : "Not Uploaded",
      icon: FileText
    },
    {
      title: "Resume Score",
      value: analysis ? `${score}/100` : "0/100",
      icon: Target
    },
    {
      title: "Technical Skills",
      value: skills.length.toString(),
      icon: Code
    },
    {
      title: "Career Options",
      value: careers.length.toString(),
      icon: TrendingUp
    }
  ];

  return (
    <div className="dashboard">

      {/* Welcome Section */}

      <div className="welcome">
        <div>
          <p className="sub-heading">STUDENT DASHBOARD</p>
          <h1>Welcome to CareerAI!</h1>
          <p>Discover your potential and build your future career.</p>
        </div>

        <Brain size={55} />
      </div>

      {/* Statistics Section */}

      <div className="stats-grid">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div className="stat-card" key={item.title}>
              <Icon size={28} />
              <p>{item.title}</p>
              <h2>{item.value}</h2>
            </div>
          );
        })}

      </div>

      {/* Career Overview */}

      <div className="content-grid">

        <div className="panel">

          <h2>Career Overview</h2>

          <p>
            {analysis
              ? "Your resume analysis has been completed successfully."
              : "Upload your resume to start your career development journey."}
          </p>

          <div className="overview-item">
            <span>Recommended Careers</span>
            <strong>{careers.length} Roles</strong>
          </div>

          <div className="overview-item">
            <span>Learning Roadmap</span>
            <strong>5 Topics</strong>
          </div>

          <div className="overview-item">
            <span>Resume Analysis</span>
            <strong>{analysis ? "Completed" : "Pending"}</strong>
          </div>

          {careers.length > 0 && (
            <div className="recommended-careers">
              <h3>Recommended Career Paths</h3>

              {careers.map((career, index) => (
                <p key={index}>
                  {typeof career === "string"
                    ? career
                    : career.title || career.name || "Career option"}
                </p>
              ))}
            </div>
          )}

        </div>

        {/* Quick Actions */}

        <div className="panel">

          <h2>Quick Actions</h2>

          <div
            className="quick-action"
            onClick={() => setActivePage("Resume Analyzer")}
            style={{ cursor: "pointer" }}
          >
            <FileText />
            <span>Analyze Your Resume</span>
          </div>

          <div
            className="quick-action"
            onClick={() => setActivePage("Career Recommendations")}
            style={{ cursor: "pointer" }}
          >
            <Briefcase />
            <span>Explore Careers</span>
          </div>

          <div
            className="quick-action"
            onClick={() => setActivePage("Learning Roadmap")}
            style={{ cursor: "pointer" }}
          >
            <BookOpen />
            <span>View Learning Roadmap</span>
          </div>

        </div>

      </div>

      {/* Skills Section */}

      <div className="panel skills-panel">

        <h2>Technical Skills</h2>

        {skills.length > 0 ? (
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        ) : (
          <p>Upload your resume to view your technical skills.</p>
        )}

      </div>

    </div>
  );
}

export default Dashboard;
