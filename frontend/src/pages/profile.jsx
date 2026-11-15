
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  Code,
  Brain,
  Database,
  Globe,
  Edit3,
  Save,
  X,
  Award,
  Target,
  BookOpen
} from "lucide-react";

function Profile({ onProfileNameChange }) {

  const initialProfile = {
    name: "Your Name",
    email: "your.email@example.com",
    degree: "B.Tech",
    year: "3rd Year",
    specialization: "Computer Science",
    careerGoal: "Software Developer",
    about: "I am a passionate student interested in software development, programming and emerging technologies."
  };

  const [profile, setProfile] = useState(initialProfile);
  const [originalProfile, setOriginalProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load profile from MySQL database
  useEffect(() => {

    async function loadProfile() {

      try {

        const response = await fetch(
          "http://127.0.0.1:5000/profile"
        );

        if (!response.ok) {
          throw new Error("Unable to load profile");
        }

        const data = await response.json();

        console.log("Profile data from database:", data);

        if (data && data.name) {

          const loadedProfile = {
            name: data.name || "",
            email: data.email || "",
            degree: data.degree || "",
            year: data.year || "",
            specialization: data.specialization || "",
            careerGoal: data.career_goal || "",
            about: data.about || ""
          };

          setProfile(loadedProfile);
          setOriginalProfile(loadedProfile);

          // Send profile name to App.jsx
          console.log(
            "Profile name from database:",
            loadedProfile.name
          );

          if (onProfileNameChange) {
            onProfileNameChange(loadedProfile.name);

            console.log(
              "Profile name sent to App.jsx:",
              loadedProfile.name
            );
          } else {
            console.log(
              "onProfileNameChange is not received!"
            );
          }
        }

      } catch (error) {

        console.error("Profile loading failed:", error);
        setMessage("Unable to load profile. Please check backend.");

      } finally {

        setLoading(false);

      }
    }

    loadProfile();

  }, []);

  // Technical Skills
  const skills = [
    "Python",
    "Java",
    "SQL",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Data Structures"
  ];

  // Career Interests
  const interests = [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Software Engineering"
  ];

  // Handle input changes
  function handleChange(event) {

    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value
    }));

  }

  // Edit Profile
  function handleEdit() {

    setOriginalProfile(profile);
    setMessage("");
    setIsEditing(true);

  }

  // Cancel Editing
  function handleCancel() {

    setProfile(originalProfile);
    setIsEditing(false);
    setMessage("");

  }

  // Save Profile to MySQL
  async function handleSave() {

    setSaving(true);
    setMessage("");

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/profile",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(profile)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to save profile"
        );
      }

      setOriginalProfile({ ...profile });
      setIsEditing(false);
      setMessage("Profile saved successfully!");

      // Update Navbar name after saving
      console.log(
        "Updated profile name:",
        profile.name
      );

      if (onProfileNameChange) {

        onProfileNameChange(profile.name);

        console.log(
          "Updated name sent to Navbar:",
          profile.name
        );

      } else {

        console.log(
          "onProfileNameChange is not received!"
        );

      }

    } catch (error) {

      console.error("Profile save failed:", error);

      setMessage(
        "Profile save failed: " + error.message
      );

    } finally {

      setSaving(false);

    }

  }

  if (loading) {
    return (
      <div className="profile-page">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (

    <div className="profile-page">

      {/* PAGE HEADING */}

      <div className="profile-heading">

        <div>

          <span className="profile-tag">
            <User size={15} />
            STUDENT ACCOUNT
          </span>

          <h1>My Profile</h1>

          <p>
            Manage your personal details and career information.
          </p>

        </div>

        <button
          className="profile-edit-btn"
          onClick={isEditing ? handleCancel : handleEdit}
        >

          {isEditing ? <X size={17} /> : <Edit3 size={17} />}

          {isEditing ? "Cancel" : "Edit Profile"}

        </button>

      </div>

      {/* SUCCESS / ERROR MESSAGE */}

      {message && (
        <p
          style={{
            margin: "12px 0",
            color: message.includes("successfully") ? "green" : "red"
          }}
        >
          {message}
        </p>
      )}

      {/* PROFILE HEADER */}

      <div className="profile-cover">

        <div className="profile-avatar">
          <User size={42} />
        </div>

        <div className="profile-user-info">

          <h2>{profile.name}</h2>

          <p>
            <GraduationCap size={17} />
            {profile.degree} Student
          </p>

          <span className="profile-role">
            {profile.careerGoal}
          </span>

        </div>

        <div className="profile-member">

          <Award size={22} />

          <span>Student Profile</span>

        </div>

      </div>

      {/* EDIT FORM */}

      {isEditing && (

        <div className="profile-card profile-edit-form">

          <div className="profile-section-title">
            <Edit3 size={20} />
            <h3>Edit Your Information</h3>
          </div>

          <div className="profile-form-grid">

            <div className="profile-field">
              <label>Full Name</label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Degree</label>
              <input
                name="degree"
                value={profile.degree}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Current Year</label>
              <input
                name="year"
                value={profile.year}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Specialization</label>
              <input
                name="specialization"
                value={profile.specialization}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Career Goal</label>
              <input
                name="careerGoal"
                value={profile.careerGoal}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="profile-field">

            <label>About Me</label>

            <textarea
              name="about"
              value={profile.about}
              onChange={handleChange}
            />

          </div>

          <button
            className="profile-save-btn"
            onClick={handleSave}
            disabled={saving}
          >

            <Save size={17} />

            {saving ? "Saving..." : "Save Changes"}

          </button>

        </div>

      )}

      {/* PERSONAL AND CAREER INFORMATION */}

      <div className="profile-content-grid">

        {/* PERSONAL INFORMATION */}

        <div className="profile-card">

          <div className="profile-section-title">
            <User size={21} />
            <h3>Personal Information</h3>
          </div>

          <div className="profile-info-list">

            <div className="profile-info-item">

              <div className="profile-info-icon">
                <User size={19} />
              </div>

              <div>
                <span>Full Name</span>
                <strong>{profile.name}</strong>
              </div>

            </div>

            <div className="profile-info-item">

              <div className="profile-info-icon">
                <Mail size={19} />
              </div>

              <div>
                <span>Email Address</span>
                <strong>{profile.email}</strong>
              </div>

            </div>

            <div className="profile-info-item">

              <div className="profile-info-icon">
                <GraduationCap size={19} />
              </div>

              <div>
                <span>Education</span>
                <strong>
                  {profile.degree} - {profile.year}
                </strong>
              </div>

            </div>

            <div className="profile-info-item">

              <div className="profile-info-icon">
                <BookOpen size={19} />
              </div>

              <div>
                <span>Specialization</span>
                <strong>{profile.specialization}</strong>
              </div>

            </div>

          </div>

        </div>

        {/* CAREER INFORMATION */}

        <div className="profile-card">

          <div className="profile-section-title">
            <Target size={21} />
            <h3>Career Information</h3>
          </div>

          <div className="career-goal-box">

            <div className="career-goal-icon">
              <Briefcase size={26} />
            </div>

            <div>
              <span>Target Career</span>
              <h3>{profile.careerGoal}</h3>
            </div>

          </div>

          <div className="profile-about">

            <h4>About Me</h4>

            <p>{profile.about}</p>

          </div>

        </div>

      </div>

      {/* TECHNICAL SKILLS */}

      <div className="profile-card profile-skills-card">

        <div className="profile-section-title">
          <Code size={21} />
          <h3>Technical Skills</h3>
        </div>

        <p className="profile-subtitle">
          Technologies and programming skills
        </p>

        <div className="profile-skills-list">

          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}

        </div>

      </div>

      {/* CAREER INTERESTS */}

      <div className="profile-card profile-interests-card">

        <div className="profile-section-title">
          <Brain size={21} />
          <h3>Career Interests</h3>
        </div>

        <p className="profile-subtitle">
          Areas you are interested in exploring
        </p>

        <div className="profile-interests-list">

          {interests.map((interest, index) => (

            <div className="profile-interest-item" key={interest}>

              {index === 0 && <Brain size={19} />}
              {index === 1 && <Database size={19} />}
              {index === 2 && <Globe size={19} />}
              {index === 3 && <Code size={19} />}

              <span>{interest}</span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Profile;
