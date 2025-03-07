import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import AdminLogin from './pages/AdminLogin';
import Approval from './pages/Approval';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';
import AssistanceReport from './pages/AssistanceReport';
import { LanguageProvider } from './context/LanguageProvider';  
import './index.css';
import BarangayLogin from './pages/BarangayLogin';
import HomePage from './pages/HomePage';
import TransferLogs from './pages/TransferLogs';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/barangaylogin" element={<BarangayLogin />} />
          <Route path="/approval" element={<Approval />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/asstreport" element={<AssistanceReport />} />
          <Route path="/transferlogs" element={<TransferLogs />} />

        </Routes>
      </Router>
    </LanguageProvider>
  </StrictMode>
);
