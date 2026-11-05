import { useMemo, useState, type FormEvent } from 'react'
import EmployeeTable, { type Employee } from '../components/employeeTable'
import { useEmployees } from '../hooks/useEmployees';

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

function EmployeeInfo() {
  const { employees: employeesList, loading, error } = useEmployees()
  const [createdEmployees, setCreatedEmployees] = useState<Employee[]>([])
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('All departments')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', role: '', department: 'Engineering', dob: '' })

  const employees = useMemo<Employee[]>(() => [
    ...employeesList.map((employee) => ({
      id: String(employee.id),
      name: employee.name,
      email: employee.email,
      role: employee.role ?? '',
      department: employee.department ?? '',
      dob: employee.dob ?? '',
      status: employee.status ?? 'Active',
    })),
    ...createdEmployees,
  ], [createdEmployees, employeesList])

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
    setCreatedEmployees((current) => [...current, { ...newEmployee, id: nextId, status: 'Active' }])
    setNewEmployee({ name: '', email: '', role: '', department: 'Engineering', dob: '' })
    setIsAddOpen(false)
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
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

          <EmployeeTable
            employees={employees}
            visibleEmployees={visibleEmployees}
            query={query}
            setQuery={setQuery}
            department={department}
            setDepartment={setDepartment}
            isAddOpen={isAddOpen}
            setIsAddOpen={setIsAddOpen}
            newEmployee={newEmployee}
            setNewEmployee={setNewEmployee}
            addEmployee={addEmployee}
          />

          <footer className="page-footer">© 2024 Forma, Inc. <span>·</span> Built for people, by people.</footer>
        </section>
      </main>
    </div>
  )
}

export default EmployeeInfo
