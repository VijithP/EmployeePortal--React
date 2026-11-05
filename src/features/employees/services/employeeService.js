import apiClient from "../../../services/apiClient";

export const getEmployees = async () => {
    const response = await apiClient.get("/employees");
    return response.data;
};

export const addEmployee = async (employee) => {
    const response = await apiClient.post(
        "/employees",
        employee
    );
    return response.data;
};