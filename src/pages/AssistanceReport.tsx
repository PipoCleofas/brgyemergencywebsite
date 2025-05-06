import  { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {  useLanguageContext } from '../context/LanguageProvider';
import { useHandleClicks } from '../hooks/useHandleClicks';
import { useGetItems } from '../hooks/useGetItems';
import '../../utils/assistancereport.css';

export default function History() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { checkAccounts, messages } = useGetItems();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleNavClick } = useHandleClicks();
  const { translations, language } = useLanguageContext();
  const t = translations[language];
  const [filterStatus, setFilterStatus] = useState('done'); // default to "done"

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleAvatarClick = () => {
    navigate('/edit-profile');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkAccounts('messages');
      setLoading(false);
    };

    fetchData();
  }, [checkAccounts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!messages) {
    return <div>No messages available.</div>;
  }

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
          fontFamily: "'Readex Pro', sans-serif"
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
          onClick={handleAvatarClick}
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
              className={isActive(item.path)}
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
                href=""
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
          padding: '20px',
          backgroundColor: '#5594DC',
          transition: 'margin-left 0.3s',
          fontFamily: "'Readex Pro', sans-serif"
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
        <div className="dashboard-header" style={{ borderBottom: '2px solid #6CB4D8', paddingBottom: '10px', fontFamily: "'Readex Pro', sans-serif" }}>
          <h1 style={{ color: 'white', margin: 0, fontFamily: "'Readex Pro', sans-serif" }}>{t.asstreport}</h1>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
          <div>
            <label htmlFor="statusFilter" style={{ color: 'white', marginRight: '8px' }}>{t.status}:</label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontFamily: "'Readex Pro', sans-serif",
                fontWeight: 'bold'
              }}
            >
              <option value="done">{t.done}</option>
              <option value="pending">{t.pending}</option>
              <option value="rejected">{t.rejectedcaps}</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="history-table" style={{ fontFamily: "'Readex Pro', sans-serif" }}>
            <thead>
              <tr>
                <th>{t.message}</th>
              </tr>
            </thead>
            <tbody>
  {messages
      .filter((msg: any) => msg.status === filterStatus)
      .map((message: any) => (
        <tr key={message.id}>
          <td>
            {filterStatus === 'done' ? (
            <>
              <div>{message.message}</div>
              <div style={{ fontSize: '0.8rem', color: '#f0f0f0' }}>{message.timestamp}</div>
            </>
          ) : (
            <div>{message.message}</div> // still show the message, but no timestamp
          )}

          </td>
        </tr>
    ))}
  </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
