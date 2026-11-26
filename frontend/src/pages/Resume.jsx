
import React, { useState } from "react";

import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target,
  Award,
  Code,
  RefreshCw,
  Briefcase,
  TrendingUp,
  Lightbulb,
  BookOpen
} from "lucide-react";

// Updated deployed backend URL
const API_URL = "https://careerai-2-8v0y.onrender.com";

function Resume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setFile(null);
      setAnalysis(null);
      setMessage("Please select a PDF file.");
      setSuccess(false);
      return;
    }

    setFile(selectedFile);
    setAnalysis(null);
    setMessage("Resume selected successfully!");
    setSuccess(true);
  }

  async function handleAnalysis() {
    if (!file) {
      setMessage("Please upload your resume first.");
      setSuccess(false);
      return;
    }

    setLoading(true);
    setAnalysis(null);
    setMessage("Analyzing your resume...");
    setSuccess(false);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      console.log("Uploading Resume:", file.name);

      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        body: formData
      });

      console.log("API Response Status:", response.status);

      const data = await response.json();

      console.log("RESUME API RESPONSE:", data);
      console.log("EXTRACTED RESUME TEXT:", data.resume_text);
      console.log("DETECTED SKILLS:", data.detected_skills);
      console.log("RESUME SCORE:", data.resume_score);

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setAnalysis(data);

      localStorage.setItem(
        "resumeAnalysis",
        JSON.stringify(data)
      );

      setMessage(data.message || "Resume analyzed successfully!");
      setSuccess(true);

    } catch (error) {
      console.error("Resume Analysis Error:", error);
      setMessage("Analysis failed: " + error.message);
      setSuccess(false);

    } finally {
      setLoading(false);
    }
  }

  function ResultSection({ icon: Icon, title, items, color }) {
    return (
      <div style={{
        padding: "20px",
        background: "#ffffff",
        border: "1px solid #dde5e5",
        borderRadius: "12px",
        marginBottom: "18px"
      }}>
        <h3 style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "15px"
        }}>
          <Icon size={21} />
          {title}
        </h3>

        {items && items.length > 0 ? (
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px"
          }}>
            {items.map((item, index) => (
              <span key={index} style={{
                padding: "9px 14px",
                background: color,
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p>No information available.</p>
        )}
      </div>
    );
  }

  return (
    <div className="page-content resume-page">
      <div className="resume-heading">
        <div>
          <span className="resume-tag">
            <Sparkles size={15} /> AI POWERED TOOL
          </span>

          <h1>Resume Analyzer</h1>

          <p>
            Upload your resume and discover your career potential
            with resume analysis.
          </p>
        </div>
      </div>

      <div className="resume-card">
        <div className="resume-icon">
          <FileText size={38} />
        </div>

        <h2>Upload Your Resume</h2>

        <p className="resume-description">
          Upload your latest resume to analyze your skills and resume score.
        </p>

        <label className="upload-area">
          <div className="upload-icon">
            <Upload size={30} />
          </div>

          <h3>Choose your PDF file</h3>
          <p>Click here to browse your device</p>
          <span>PDF format only</span>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            hidden
          />
        </label>

        {file && (
          <div className="selected-file">
            <FileText size={24} />

            <div className="file-details">
              <strong>{file.name}</strong>
              <span>{(file.size / 1024).toFixed(1)} KB</span>
            </div>

            <CheckCircle size={22} color="green" />
          </div>
        )}

        <button
          className="analyze-button"
          onClick={handleAnalysis}
          disabled={loading}
        >
          {loading ? (
            <RefreshCw size={18} />
          ) : (
            <Sparkles size={18} />
          )}

          {loading ? "Analyzing..." : "Analyze My Resume"}
        </button>

        {message && (
          <div className="resume-message">
            {success ? (
              <CheckCircle size={19} color="green" />
            ) : (
              <AlertCircle size={19} />
            )}

            <span>{message}</span>
          </div>
        )}
      </div>

      {analysis && (
        <div className="analysis-results" style={{
          marginTop: "30px",
          padding: "25px",
          background: "#f8fbfa",
          borderRadius: "15px",
          border: "1px solid #dde5e5"
        }}>
          <h2 style={{ marginBottom: "22px" }}>
            <Sparkles size={22} />
            Resume Analysis Results
          </h2>

          <div style={{
            padding: "22px",
            background: "#eaf5f2",
            borderRadius: "12px",
            marginBottom: "20px"
          }}>
            <Award size={28} />
            <h3>Resume Score</h3>

            <h1 style={{
              fontSize: "42px",
              margin: "10px 0",
              color: "#27645f"
            }}>
              {analysis.resume_score ?? 0}/100
            </h1>

            <p>
              Initial score based on detected technical skills.
            </p>
          </div>

          <ResultSection
            icon={Code}
            title="Detected Skills"
            items={analysis.detected_skills}
            color="#e5f2ef"
          />

          <ResultSection
            icon={Target}
            title="Missing Skills"
            items={analysis.missing_skills}
            color="#fff0e5"
          />

          <ResultSection
            icon={TrendingUp}
            title="Your Strengths"
            items={analysis.strengths}
            color="#e8f1ff"
          />

          <ResultSection
            icon={Briefcase}
            title="Career Recommendations"
            items={analysis.career_recommendations}
            color="#f0eaff"
          />

          <ResultSection
            icon={Lightbulb}
            title="Improvement Suggestions"
            items={analysis.improvement_suggestions}
            color="#fff8dc"
          />

          <div style={{
            padding: "18px",
            background: "#eaf5f2",
            borderRadius: "12px"
          }}>
            <h3>
              <BookOpen size={20} /> Resume Text Extraction
            </h3>

            <p style={{ marginTop: "10px" }}>
              Your PDF text has been successfully extracted.
            </p>
          </div>
        </div>
      )}

      <div className="resume-info">
        <div>
          <FileText size={23} />
          <h3>PDF Support</h3>
          <p>Upload your resume in PDF format.</p>
        </div>

        <div>
          <Sparkles size={23} />
          <h3>Skill Detection</h3>
          <p>Identify technical skills from your resume.</p>
        </div>

        <div>
          <CheckCircle size={23} />
          <h3>Resume Score</h3>
          <p>Get an initial score based on detected skills.</p>
        </div>
      </div>
    </div>
  );
}

export default Resume;
