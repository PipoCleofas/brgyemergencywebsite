import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import AdminLogin from './pages/AdminLogin';
import Approval from './pages/Approval';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';
import BarangaySettings from './pages/BarangaySettings';
import AssistanceReport from './pages/AssistanceReport';
import { LanguageProvider } from './context/LanguageProvider';  
import './index.css';
import BarangayLogin from './pages/BarangayLogin';
import BarangayAssistanceReport from './pages/BarangayAssistanceReport';
import HomePage from './pages/HomePage';
import TransferLogs from './pages/TransferLogs';
import BarangayMainPage from './pages/BarangayMainPage';

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
          <Route path="/brgysettings" element={<BarangaySettings />} />
          <Route path="/asstreport" element={<AssistanceReport />} />
          <Route path="/brgyasstreport" element={<BarangayAssistanceReport />} />
          <Route path="/transferlogs" element={<TransferLogs />} />
          <Route path="/mainpage" element={<BarangayMainPage />} />

        </Routes>
      </Router>
    </LanguageProvider>
  </StrictMode>
);
