import './App.css'
import Overview from './components/Overview'
import Departments from './components/Departments'
import Employee from './components/Employee';
import { BrowserRouter, Routes, Route, NavLink,Navigate } from "react-router";

function Icon({ name, size = 18 }: { name: 'search' | 'plus' | 'users' | 'briefcase' | 'calendar' | 'grid' | 'chevron' | 'close'; size?: number }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  }

  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function App() {
  return (

    <div className="app-shell">
      <BrowserRouter>
        <aside className="sidebar">
          <a className="brand" href="#" aria-label="Forma home">
            <span className="brand-mark">T</span>
            <span>TechPro</span>
          </a>
          <div className="workspace-switcher">
            <span className="workspace-avatar">A</span>
            <span className="workspace-copy"><strong>Acme Inc.</strong><small>Workspace</small></span>
            <Icon name="chevron" size={16} />
          </div>
          <span className="nav-label">WORKSPACE</span>

          <nav aria-label="Main navigation">
            <NavLink to="/overview" end className="nav-item">
              <span>▦</span> Overview
            </NavLink>

            <NavLink to="/employee" className="nav-item">
              <span>👥</span> Employees
              <span className="nav-count">0</span>
            </NavLink>

            <NavLink to="/timeoff" className="nav-item">
              <span>📅</span> Time off
            </NavLink>

            <NavLink to="/departments" className="nav-item">
              <span>💼</span> Departments
            </NavLink>
          </nav>

          <div className="sidebar-bottom">
            <div className="help-card"><span className="help-icon">?</span><div><strong>Need a hand?</strong><small>Visit our help center</small></div></div>
            <div className="account">
              <div className="account-avatar">ER</div>
              <div className="account-copy"><strong>Vijith</strong><small>Admin</small></div>
              <button className="icon-button account-menu" aria-label="Account menu"><span>···</span></button>
            </div>
          </div>
        </aside>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />

          <Route path="/overview" element={<Overview />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/timeoff" element={<div>Time Off Page</div>} />
          <Route path="/departments" element={<Departments />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;