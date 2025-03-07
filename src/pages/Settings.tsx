import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguageContext } from '../context/LanguageProvider';
import { useHandleClicks } from '../hooks/useHandleClicks';
import SettingsRight from '../components/SettingsRight';
import '../../utils/Settings.css';

export default function Settings() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleNavClick } = useHandleClicks();
  const { translations, language, changeLanguage } = useLanguageContext();
  const t = translations[language];

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Handle avatar click to edit
  const handleAvatarClick = () => {
    navigate('/edit-profile'); // Example navigate route, you can change to a modal or custom handler
  };

  // Function to check if the link is active based on the current location
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return ( 
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#E0F7FA', width: '100vw', }}>
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
                className={isActive(item.path)} // Add active class to active link
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
            <h1 style={{ color: 'white', margin: 0 }}>{t.settings}</h1>
          </div>

            {/* Right Section */}
            <div style={{ flex: 1, marginLeft: '2px', marginTop: '100px', }}>
              <SettingsRight />
            </div>
          </div>
        </div>
  );
}
