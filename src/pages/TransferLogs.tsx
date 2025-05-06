import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '../context/LanguageProvider';
import { useHandleClicks } from '../hooks/useHandleClicks';
import axios from 'axios';
import '../../utils/Home.css';
import '../../utils/transferlogs.css';

export default function TransferLogs() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);
  const navigate = useNavigate();
  const { handleNavClick } = useHandleClicks();
  const { translations, language } = useLanguageContext();
  const t = translations[language];
  const adminName = "Admin Name"; // Replace with dynamic admin name if available
  const adminRole = "Admin Role";   // Replace with dynamic admin role if available
  const avatarUrl = "https://via.placeholder.com/100"; // Replace with actual avatar URL

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleAvatarClick = () => {
        // Implement your avatar click logic here, e.g., navigate to profile settings
        console.log("Avatar clicked!");
    };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLogsLoading(true);
        const response = await axios.get(
          'https://express-production-ac91.up.railway.app/messaging/getLogs'
        );
        setLogs(response.data.messages);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLogsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#E0F7FA', width: '100vw' }}>
      {/* Keep the original sidebar exactly as it was */}
      <div
        className={`sidebar ${sidebarVisible ? '' : 'hidden'}`}
        style={{
          width: sidebarVisible ? '250px' : '0',
          opacity: sidebarVisible ? 1 : 0,
          overflow: 'hidden',
          transition: 'width 0.3s, opacity 0.3s',
          backgroundColor: '#6C95C3',
          color: 'white',
          fontFamily: "'Readex Pro', sans-serif"
        }}
      >
        {/* Avatar Section */}
        <div className="avatar-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={handleAvatarClick}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', marginBottom: '10px', border: '3px solid white' }}>
            <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h3 style={{ color: 'white', fontSize: '1rem', margin: 0 }}>{adminName}</h3>
          <p style={{ color: 'white', fontSize: '0.8rem', margin: 0 }}>{adminRole}</p>
        </div>
        
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px', fontFamily: "'Readex Pro', sans-serif" }}>
          {[{ label: t.home, icon: '🏠', path: '/admindashboard' },
            { label: t.approval, icon: '✅', path: '/approval' },
            { label: t.settings, icon: '⚙️', path: '/settings' },
            { label: t.asstreport, icon: '📜', path: '/asstreport' },
            { label: t.transferlogs, icon: '🗃️', path: '/transferlogs' },
          ].map((item, index) => (
            <li key={index} onClick={() => handleNavClick(navigate, item.path)}>
              <span>{item.icon}</span>
              <a href="#">{item.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content" style={{ flex: 1, padding: '15px', backgroundColor: '#5594DC', transition: 'margin-left 0.3s' }}>
      <button className="toggle-sidebar" onClick={toggleSidebar} style={{ cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', marginBottom: '20px' }}>☰</button>
        <h1>{t.transferlogs}</h1>

        <div className="table-container">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>{t.message}</th>
              </tr>
            </thead>
            <tbody>
              {logsLoading ? (
                <tr>
                  <td colSpan={2}>Loading logs...</td>
                </tr>
              ) : logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id}>
                    <td data-label="ID">{log.id}</td>
                    <td data-label={t.message} className="message-cell">{log.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>No logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
