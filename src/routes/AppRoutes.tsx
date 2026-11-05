import { Routes, Route, Navigate } from "react-router";
import Overview from '../components/Overview';
import Departments from '../components/Departments';
import Employee from '../features/employees/pages/Employee';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/overview" replace />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/timeoff" element={<div>Time Off Page</div>} />
      <Route path="/departments" element={<Departments />} />
    </Routes>
  );
}
