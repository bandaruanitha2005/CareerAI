
import React, { useState } from "react";
import { Search, Bell, User, X } from "lucide-react";

function Navbar({ studentName = "Student", setActivePage }) {

  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchData = [
    { name: "Python Developer", type: "Career", keywords: "python programming backend" },
    { name: "Java Developer", type: "Career", keywords: "java oops spring" },
    { name: "Frontend Developer", type: "Career", keywords: "html css javascript react" },
    { name: "Database Developer", type: "Career", keywords: "sql mysql database" },
    { name: "Data Analyst", type: "Career", keywords: "python sql excel power bi" },
    { name: "Python", type: "Skill", keywords: "python programming" },
    { name: "Java", type: "Skill", keywords: "java programming" },
    { name: "SQL", type: "Skill", keywords: "sql mysql database" },
    { name: "React", type: "Skill", keywords: "react javascript frontend" },
    { name: "HTML", type: "Skill", keywords: "html frontend web" },
    { name: "CSS", type: "Skill", keywords: "css frontend web design" },
    { name: "JavaScript", type: "Skill", keywords: "javascript react frontend" },
    { name: "Machine Learning", type: "Skill", keywords: "machine learning ai python" },
    { name: "Data Structures", type: "Skill", keywords: "dsa algorithms programming" }
  ];

  const filteredResults = search.trim()
    ? searchData.filter(item =>
        (item.name + " " + item.keywords)
          .toLowerCase()
          .includes(search.toLowerCase().trim())
      )
    : [];

  const handleSelect = (item) => {
    setSearch(item.name);
    setShowResults(false);

    window.dispatchEvent(
      new CustomEvent("careerai-search", {
        detail: item
      })
    );
  };

  // Open My Profile
  const openProfile = () => {
    setActivePage("My Profile");
    setShowResults(false);
  };

  return (
    <nav className="navbar">

      <div className="navbar-title">
        <h2>CareerAI</h2>
      </div>

      <div className="navbar-search">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search careers and skills..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setShowResults(false);
            }

            if (e.key === "Enter" && filteredResults.length > 0) {
              handleSelect(filteredResults[0]);
            }
          }}
        />

        {search && (
          <X
            size={18}
            className="search-clear"
            onClick={() => {
              setSearch("");
              setShowResults(false);
            }}
          />
        )}

        {showResults && search.trim() && (
          <div className="search-results">

            {filteredResults.length > 0 ? (
              filteredResults.map((item, index) => (
                <div
                  className="search-result-item"
                  key={index}
                  onClick={() => handleSelect(item)}
                >
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.type}</small>
                  </div>

                  <Search size={16} />
                </div>
              ))
            ) : (
              <p className="no-search-results">
                No careers or skills found.
              </p>
            )}

          </div>
        )}

      </div>

      <div className="navbar-profile">

        <Bell size={22} />

        <div
          className="profile-icon"
          onClick={openProfile}
          title="My Profile"
          style={{ cursor: "pointer" }}
        >
          <User size={20} />
        </div>

        <span
          onClick={openProfile}
          title="My Profile"
          style={{ cursor: "pointer" }}
        >
          {studentName}
        </span>

      </div>

    </nav>
  );
}

export default Navbar;
