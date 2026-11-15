import React from "react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  BookOpen,
  User,
  Brain
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Resume Analyzer", icon: FileText },
    { name: "Career Recommendations", icon: Briefcase },
    { name: "Learning Roadmap", icon: BookOpen },
    { name: "My Profile", icon: User }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Brain size={30} />
        <h2>CareerAI</h2>
      </div>

      <p className="menu-heading">MAIN MENU</p>

      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.name}
            className={activePage === item.name ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage(item.name)}
          >
            <Icon size={20} />
            <span>{item.name}</span>
          </button>
        );
      })}

      <div className="sidebar-footer">
        <Brain size={22} />
        <p>Build Your Future With AI</p>
      </div>
    </aside>
  );
}

export default Sidebar;