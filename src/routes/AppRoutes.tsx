import { Routes, Route, Navigate } from "react-router";
import Overview from '../components/Overview';
import Departments from '../components/Departments';
import EmployeeInfo from '../features/employees/pages/EmployeeInfo';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/overview" replace />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/employeeInfo" element={<EmployeeInfo />} />
      <Route path="/timeoff" element={<div>Time Off Page</div>} />
      <Route path="/departments" element={<Departments />} />
    </Routes>
  );
}
