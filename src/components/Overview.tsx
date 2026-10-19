import { Link } from 'react-router'

const portalSections = [
  {
    title: 'People directory',
    description: 'Find employee profiles, roles, and contact details.',
    to: '/employee',
    action: 'Browse employees',
    icon: 'PE',
  },
  {
    title: 'Time off',
    description: 'Keep track of leave plans and time away from work.',
    to: '/timeoff',
    action: 'View time off',
    icon: 'TO',
  },
  {
    title: 'Departments',
    description: 'Explore teams and how your workspace is organized.',
    to: '/departments',
    action: 'View departments',
    icon: 'DE',
  },
]

function Overview() {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening'
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <main className="main-content">
      <header className="topbar">
        <div className="breadcrumb">Workspace <span>/</span> <strong>Overview</strong></div>
        <div className="topbar-actions">
          <span className="today-label">{today}</span>
          <div className="topbar-avatar">ER</div>
        </div>
      </header>

      <section className="content-wrap overview-content">
        <div className="page-heading">
          <div>
            <div className="eyebrow">EMPLOYEE PORTAL</div>
            <h1>{greeting}, Vijith</h1>
            <p>Your people workspace starts here. Find the information and tools you need.</p>
          </div>
        </div>

        <section className="overview-welcome" aria-labelledby="welcome-heading">
          <div className="overview-welcome-copy">
            <span className="overview-welcome-label">ACME INC. · WORKSPACE</span>
            <h2 id="welcome-heading">A better way to stay connected at work</h2>
            <p>
              Access employee information, keep up with time away, and get to know the teams
              that make up your workplace.
            </p>
          </div>
          <span className="overview-welcome-mark" aria-hidden="true">A</span>
        </section>

        <div className="overview-section-heading">
          <div>
            <h2>Explore your portal</h2>
            <p>Quick access to the tools and information you use every day.</p>
          </div>
        </div>

        <section className="overview-portal-grid" aria-label="Employee portal sections">
          {portalSections.map((section) => (
            <article className="overview-portal-card" key={section.to}>
              <span className="overview-card-icon" aria-hidden="true">{section.icon}</span>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <Link to={section.to} className="overview-card-link">
                {section.action}<span aria-hidden="true"> →</span>
              </Link>
            </article>
          ))}
        </section>

        <section className="overview-info-card" aria-labelledby="portal-info-heading">
          <div className="overview-info-icon" aria-hidden="true">i</div>
          <div>
            <h2 id="portal-info-heading">Everything you need, in one place</h2>
            <p>
              Use the portal to discover who does what, find the right team, and stay informed
              about workplace updates. Choose a section above to get started.
            </p>
          </div>
        </section>

        <footer className="page-footer">© 2024 Forma, Inc. <span>·</span> Built for people, by people.</footer>
      </section>
    </main>
  )
}

export default Overview
