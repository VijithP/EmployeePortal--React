import './App.css'
import { BrowserRouter } from 'react-router';
import MainLayout from './layout/MainLayout'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <MainLayout />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;