import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
type Employee = {
  id: string
  name: string
  email: string
  role: string
  department: string
  dob: string
  status: 'Active' | 'On leave'
}

const initialEmployees: Employee[] = [
  { id: 'EMP-001', name: 'Olivia Rhye', email: 'olivia.rhye@acme.com', role: 'Product Designer', department: 'Design', dob: '1992-04-12', status: 'Active' },
  { id: 'EMP-002', name: 'Phoenix Baker', email: 'phoenix.baker@acme.com', role: 'Engineering Lead', department: 'Engineering', dob: '1988-09-23', status: 'Active' },
  { id: 'EMP-003', name: 'Lana Steiner', email: 'lana.steiner@acme.com', role: 'People Partner', department: 'People', dob: '1991-01-08', status: 'Active' },
  { id: 'EMP-004', name: 'Demi Wilkinson', email: 'demi.wilkinson@acme.com', role: 'Frontend Developer', department: 'Engineering', dob: '1995-06-17', status: 'On leave' },
  { id: 'EMP-005', name: 'Candice Wu', email: 'candice.wu@acme.com', role: 'Marketing Manager', department: 'Marketing', dob: '1990-11-02', status: 'Active' },
  { id: 'EMP-006', name: 'Natali Craig', email: 'natali.craig@acme.com', role: 'UX Researcher', department: 'Design', dob: '1993-03-29', status: 'Active' },
  { id: 'EMP-007', name: 'Drew Cano', email: 'drew.cano@acme.com', role: 'Account Executive', department: 'Sales', dob: '1989-07-14', status: 'Active' },
  { id: 'EMP-008', name: 'Orlando Diggs', email: 'orlando.diggs@acme.com', role: 'Finance Analyst', department: 'Finance', dob: '1994-12-05', status: 'Active' },
]

const departments = ['All departments', 'Design', 'Engineering', 'People', 'Marketing', 'Sales', 'Finance']
const avatarColors = ['lilac', 'peach', 'mint', 'blue', 'rose', 'gold']

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

function formatDate(date: string) {
  if (!date) return '—'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
}

function Employee() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('All departments')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', role: '', department: 'Engineering', dob: '' })

  const visibleEmployees = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return employees.filter((employee) => {
      const matchesDepartment = department === 'All departments' || employee.department === department
      const matchesQuery = !normalizedQuery || [employee.id, employee.name, employee.email, employee.role, employee.department]
        .some((value) => value.toLowerCase().includes(normalizedQuery))
      return matchesDepartment && matchesQuery
    })
  }, [department, employees, query])

  function addEmployee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextId = `EMP-${String(employees.length + 1).padStart(3, '0')}`
    setEmployees((current) => [...current, { ...newEmployee, id: nextId, status: 'Active' }])
    setNewEmployee({ name: '', email: '', role: '', department: 'Engineering', dob: '' })
    setIsAddOpen(false)
  }

  return (
    <div>    
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>Employees</strong></div>
          <div className="topbar-actions"><span className="today-label">Monday, October 19</span><div className="topbar-avatar">JR</div></div>
        </header>

        <section className="content-wrap">
          <div className="page-heading">
            <div>
              <div className="eyebrow">PEOPLE DIRECTORY</div>
              <h1>Employees</h1>
              <p>Manage your people and keep their information up to date.</p>
            </div>
            <button className="primary-button" onClick={() => setIsAddOpen(true)}><Icon name="plus" size={17} /> Add employee</button>
          </div>

          <div className="stats-row">
            <article className="stat-card"><span className="stat-icon violet"><Icon name="users" /></span><div><span className="stat-label">Total employees</span><strong>{employees.length}</strong></div><span className="stat-note">+2 this month</span></article>
            <article className="stat-card"><span className="stat-icon green"><Icon name="briefcase" /></span><div><span className="stat-label">Departments</span><strong>{new Set(employees.map((employee) => employee.department)).size}</strong></div><span className="stat-note">Across the company</span></article>
            <article className="stat-card"><span className="stat-icon amber"><Icon name="calendar" /></span><div><span className="stat-label">Birthdays this month</span><strong>{employees.filter((employee) => employee.dob && new Date(`${employee.dob}T00:00:00Z`).getUTCMonth() === new Date().getMonth()).length}</strong></div><span className="stat-note">Don’t forget to celebrate</span></article>
          </div>

          <section className="directory-card" aria-label="Employee directory">
            <div className="directory-heading">
              <div><h2>All employees</h2><p>A complete list of everyone in your workspace.</p></div>
              <span className="employee-count">{visibleEmployees.length} employees</span>
            </div>
            <div className="table-toolbar">
              <label className="search-box"><Icon name="search" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search employees" aria-label="Search employees" /></label>
              <label className="department-select"><span className="sr-only">Filter by department</span><select value={department} onChange={(event) => setDepartment(event.target.value)}>{departments.map((item) => <option key={item}>{item}</option>)}</select><Icon name="chevron" size={15} /></label>
            </div>

            <div className="table-scroll">
              <table>
                <thead><tr><th>EMPLOYEE</th><th>EMPLOYEE ID</th><th>DEPARTMENT</th><th>DATE OF BIRTH</th><th>STATUS</th><th><span className="sr-only">Actions</span></th></tr></thead>
                <tbody>
                  {visibleEmployees.map((employee, index) => (
                    <tr key={employee.id}>
                      <td><div className="employee-cell"><span className={`employee-avatar ${avatarColors[index % avatarColors.length]}`}>{employee.name.split(' ').map((part) => part[0]).join('')}</span><span className="employee-details"><strong>{employee.name}</strong><small>{employee.role} · {employee.email}</small></span></div></td>
                      <td><span className="employee-id">{employee.id}</span></td>
                      <td><span className="department-tag">{employee.department}</span></td>
                      <td className="dob-cell">{formatDate(employee.dob)}</td>
                      <td><span className={`status ${employee.status === 'Active' ? 'status-active' : 'status-leave'}`}><span />{employee.status}</span></td>
                      <td><button className="row-menu" aria-label={`More options for ${employee.name}`}>···</button></td>
                    </tr>
                  ))}
                  {visibleEmployees.length === 0 && <tr><td colSpan={6} className="empty-state"><span className="empty-icon"><Icon name="search" size={21} /></span><strong>No employees found</strong><span>Try another name or department.</span></td></tr>}
                </tbody>
              </table>
            </div>
            <footer className="table-footer"><span>Showing <strong>{visibleEmployees.length ? 1 : 0}–{visibleEmployees.length}</strong> of <strong>{employees.length}</strong> employees</span><div className="pagination"><button disabled aria-label="Previous page">‹</button><button className="page-current" aria-current="page">1</button><button disabled aria-label="Next page">›</button></div></footer>
          </section>
          <footer className="page-footer">© 2024 Forma, Inc. <span>·</span> Built for people, by people.</footer>
        </section>
      </main>

      {isAddOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsAddOpen(false) }}>
        <section className="employee-modal" role="dialog" aria-modal="true" aria-labelledby="add-employee-title">
          <div className="modal-heading"><div><span className="modal-icon"><Icon name="users" /></span><h2 id="add-employee-title">Add an employee</h2><p>Add a new person to your workspace directory.</p></div><button className="icon-button" onClick={() => setIsAddOpen(false)} aria-label="Close"><Icon name="close" /></button></div>
          <form onSubmit={addEmployee}>
            <label>Full name<input required autoFocus value={newEmployee.name} onChange={(event) => setNewEmployee({ ...newEmployee, name: event.target.value })} placeholder="e.g. Alex Morgan" /></label>
            <label>Work email<input required type="email" value={newEmployee.email} onChange={(event) => setNewEmployee({ ...newEmployee, email: event.target.value })} placeholder="alex@company.com" /></label>
            <div className="form-row"><label>Job title<input required value={newEmployee.role} onChange={(event) => setNewEmployee({ ...newEmployee, role: event.target.value })} placeholder="e.g. Product Designer" /></label><label>Department<select value={newEmployee.department} onChange={(event) => setNewEmployee({ ...newEmployee, department: event.target.value })}>{departments.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label></div>
            <label>Date of birth<input required type="date" value={newEmployee.dob} onChange={(event) => setNewEmployee({ ...newEmployee, dob: event.target.value })} /></label>
            <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setIsAddOpen(false)}>Cancel</button><button type="submit" className="primary-button">Add employee</button></div>
          </form>
        </section>
      </div>}
    
    </div>
  )
}

export default Employee
