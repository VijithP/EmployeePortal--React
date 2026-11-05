export type EmployeeRecord = {
  id: string | number
  name: string
  email: string
  role?: string
  department?: string
  dob?: string
  status?: 'Active' | 'On leave'
}

export function useEmployees(): {
  employees: EmployeeRecord[]
  loading: boolean
  error: string | null
}
