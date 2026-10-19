import { useEffect, useState } from 'react'

type DepartmentPost = {
  userId: number
  id: number
  title: string
  body: string
}

function isDepartmentPost(value: unknown): value is DepartmentPost {
  if (typeof value !== 'object' || value === null) return false
  return (
    'userId' in value &&
    typeof value.userId === 'number' &&
    'id' in value &&
    typeof value.id === 'number' &&
    'title' in value &&
    typeof value.title === 'string' &&
    'body' in value &&
    typeof value.body === 'string'
  )
}

function isDepartmentPostArray(value: unknown): value is DepartmentPost[] {
  return Array.isArray(value) && value.every(isDepartmentPost)
}

function Departments() {
  const [departments, setDepartments] = useState<DepartmentPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadDepartments() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data: unknown = await response.json()
        if (!isDepartmentPostArray(data)) {
          throw new Error('The server returned an unexpected departments response.')
        }

        setDepartments(data)
      } catch (loadError) {
        if (controller.signal.aborted) return
        setError(loadError instanceof Error ? loadError.message : 'Unable to load departments.')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    void loadDepartments()
    return () => controller.abort()
  }, [reloadKey])

  return (
    <main className="main-content">
      <header className="topbar">
        <div className="breadcrumb">Workspace <span>/</span> <strong>Departments</strong></div>
        <div className="topbar-actions">
          <span className="today-label">Employee portal</span>
          <div className="topbar-avatar">ER</div>
        </div>
      </header>

      <section className="content-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">WORKSPACE DIRECTORY</div>
            <h1>Departments</h1>
            <p>Explore department updates and information from across your workspace.</p>
          </div>
        </div>

        <section className="directory-card departments-card" aria-label="Department information">
          <div className="directory-heading">
            <div>
              <h2>Department updates</h2>
              <p>Information shared by teams in your organization.</p>
            </div>
            {!isLoading && !error && (
              <span className="employee-count">{departments.length} updates</span>
            )}
          </div>

          {isLoading && (
            <p className="departments-message" role="status">Loading department information…</p>
          )}

          {error && (
            <div className="departments-message departments-error" role="alert">
              <p>We couldn’t load department information: {error}</p>
              <button className="secondary-button" onClick={() => setReloadKey((key) => key + 1)}>
                Try again
              </button>
            </div>
          )}

          {!isLoading && !error && departments.length === 0 && (
            <p className="departments-message">No department information is available right now.</p>
          )}

          {!isLoading && !error && departments.length > 0 && (
            <div className="departments-grid">
              {departments.map((department) => (
                <article className="department-card" key={department.id}>
                  <div className="department-card-meta">
                    <span className="department-tag">Department {department.userId}</span>
                    <span className="department-id">Update #{department.id}</span>
                  </div>
                  <h3>{department.title.toUpperCase() }</h3>
                  <p>{department.body}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="page-footer">© 2024 Forma, Inc. <span>·</span> Built for people, by people.</footer>
      </section>
    </main>
  )
}

export default Departments
