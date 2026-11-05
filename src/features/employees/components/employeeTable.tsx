import type { FormEvent } from 'react'


export type Employee = {
  id: string
  name: string
  email: string
  role: string
  department: string
  dob: string
  status: 'Active' | 'On leave'
}

type EmployeeTableProps = {
  employees: Employee[]
  visibleEmployees: Employee[]
  query: string
  setQuery: (value: string) => void
  department: string
  setDepartment: (value: string) => void
  isAddOpen: boolean
  setIsAddOpen: (value: boolean) => void
  newEmployee: {
    name: string
    email: string
    role: string
    department: string
    dob: string
  }
  setNewEmployee: (value: {
    name: string
    email: string
    role: string
    department: string
    dob: string
  }) => void
  addEmployee: (event: FormEvent<HTMLFormElement>) => void
}

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

export default function EmployeeTable({
  employees,
  visibleEmployees,
  query,
  setQuery,
  department,
  setDepartment,
  isAddOpen,
  setIsAddOpen,
  newEmployee,
  setNewEmployee,
  addEmployee,
}: EmployeeTableProps) {
  return (
    <>
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
    </>
  )
}
