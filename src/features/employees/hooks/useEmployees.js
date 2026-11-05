import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";

export function useEmployees() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadEmployees() {
            try {
                setLoading(true);

                const data = await getEmployees();

                setEmployees(data);
            }
            catch (err) {
                setError("Unable to load employees");
            }
            finally {
                setLoading(false);
            }
        }

        loadEmployees();

    }, []);

    return {
        employees,
        loading,
        error
    };
}