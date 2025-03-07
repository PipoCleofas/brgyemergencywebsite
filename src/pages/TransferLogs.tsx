import React, { useState, useEffect } from 'react';
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

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };


  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLogsLoading(true);
        const response = await axios.get(
          'https://express-production-ac91.up.railway.app/messaging/getLogs'
        );
        console.log('Logs response:', response.data);
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
      {/* Sidebar */}
      <div
        className={`sidebar ${sidebarVisible ? '' : 'hidden'}`}
        style={{
          width: sidebarVisible ? '250px' : '0',
          opacity: sidebarVisible ? 1 : 0,
          overflow: 'hidden',
          transition: 'width 0.3s, opacity 0.3s',
          backgroundColor: '#6C95C3',
          color: 'white',
        }}
      >
        {/* Avatar Section */}
        <div
          className="avatar-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/edit-profile')}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '10px',
              border: '3px solid white',
            }}
          >
            <img
              src="https://via.placeholder.com/100"
              alt="Avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          <h3 style={{ color: 'white', fontSize: '1rem', margin: 0 }}>Admin Name</h3>
          <p style={{ color: 'white', fontSize: '0.8rem', margin: 0 }}>Admin Role</p>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
          {[
            { label: t.home, icon: '🏠', path: '/admindashboard' },
            { label: t.approval, icon: '✅', path: '/approval' },
            { label: t.settings, icon: '⚙️', path: '/settings' },
            { label: t.asstreport, icon: '📜', path: '/asstreport' },
            { label: t.transferlogs, icon: '🗃️', path: '/transferlogs' },
          ].map((item, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                margin: '15px 0',
                padding: '10px 15px',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
              onClick={() => handleNavClick(navigate, item.path)}
            >
              <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>{item.icon}</span>
              <a
                href="#"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '1rem',
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className="main"
        style={{
          flex: 1,
          padding: '15px',
          backgroundColor: sidebarVisible ? '#5594DC' : '#5594DC',
          transition: 'margin-left 0.3s',
        }}
      >
        <button
          className="toggle-sidebar"
          onClick={toggleSidebar}
          style={{
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '20px',
          }}
        >
          ☰
        </button>
        <div className="dashboard-header" style={{ borderBottom: '2px solid #6CB4D8', paddingBottom: '10px' }}>
          <h1 style={{ margin: 0, color: 'white' }}>{t.transferlogs}</h1>
        </div>

        
        {/* Logs Table */}
        <div className="table-container">
          <table className="approval-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>{t.message}</th>
              </tr>
            </thead>
            <tbody>
              {logsLoading ? (
                <tr>
                  <td colSpan={2} style={{ textAlign: 'center' }}>Loading logs...</td>
                </tr>
              ) : logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} style={{ textAlign: 'center' }}>No logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
