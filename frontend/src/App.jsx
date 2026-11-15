
import React, { useState, useEffect } from "react";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Career from "./pages/Career";
import Roadmap from "./pages/Roadmap";
import Profile from "./pages/profile";
import Login from "./pages/Login";

import "./App.css";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [activePage, setActivePage] = useState("Dashboard");

  const [studentName, setStudentName] = useState(
    () => localStorage.getItem("studentName") || "Student"
  );

  // Update Navbar student name
  function updateStudentName(name) {

    console.log("Name received in App.jsx:", name);

    const updatedName = name?.trim() || "Student";

    setStudentName(updatedName);

    localStorage.setItem("studentName", updatedName);

    console.log("Navbar name updated to:", updatedName);
  }

  // Navbar search navigation
  useEffect(() => {

    const handleSearch = (event) => {

      const item = event.detail;

      if (item.type === "Career") {
        setActivePage("Career Recommendations");
      }

      if (item.type === "Skill") {
        setActivePage("Learning Roadmap");
      }

    };

    window.addEventListener("careerai-search", handleSearch);

    return () => {
      window.removeEventListener("careerai-search", handleSearch);
    };

  }, []);

  if (!isLoggedIn) {

    return (
      <Login onLogin={() => setIsLoggedIn(true)} />
    );

  }

  const renderPage = () => {

    switch (activePage) {

      case "Dashboard":
        return <Dashboard setActivePage={setActivePage} />;

      case "Resume Analyzer":
        return <Resume />;

      case "Career Recommendations":
        return <Career />;

      case "Learning Roadmap":
        return <Roadmap />;

      case "My Profile":
        return (
          <Profile
            onProfileNameChange={updateStudentName}
          />
        );

      default:
        return <Dashboard setActivePage={setActivePage} />;

    }

  };

  return (

    <div className="app-container">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">

        <Navbar
          studentName={studentName}
          setActivePage={setActivePage}
        />

        {renderPage()}

      </main>

    </div>

  );

}

export default App;
