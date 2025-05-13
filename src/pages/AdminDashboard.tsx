import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguageContext } from '../context/LanguageProvider';
import { useHandleClicks } from '../hooks/useHandleClicks';
import '../../utils/Home.css';
import '../../utils/admindashboard.css';
import "@fontsource/readex-pro";

export default function AdminDashboard() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleNavClick } = useHandleClicks();
  const { translations, language } = useLanguageContext();
  const t = translations[language];
  

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('https://express-production-ac91.up.railway.app/user/user-count');
        const data = await response.json();
        console.log(data);
        setUserCount(data.userCount);
      } catch (error) {
        console.error('Failed to fetch user count:', error);
      }
    };

    fetchUserCount();
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleAvatarClick = () => {
    navigate('/edit-profile');
  };

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
            fontFamily: "'Readex Pro', sans-serif",
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
            padding: '15px',
            backgroundColor: sidebarVisible ? '#5594DC' : '#5594DC',
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
            <h1 style={{ color: 'white', margin: 0 }}>Dashboard</h1>
          </div>

          {/* Service Providers Section */}
          <p style={{ textAlign: 'center', color: 'white', marginTop: '20px', fontFamily: "'Readex Pro', sans-serif" }}>
            <b>{t.serviceprovider}</b>
          </p>
          <div className="service-providers" style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontFamily: "'Readex Pro', sans-serif" }}>
            {[
              { name: t.police, count: 3, bgColor: '#F4E46C', icon: '👮' },
              { name: t.firefighter, count: 3, bgColor: '#FE7979', icon: '🚒' },
              { name: t.medical, count: 3, bgColor: '#79DAFE', icon: '🩺' },
              { name: 'PDRRMO', count: 1, bgColor: '#ABB9FF', icon: '🌪️' },
              { name: 'Barangay', count: 55, bgColor: '#3EEC3E', icon: '🏠' },
            ].map((item, index) => (
              <div
                key={index}
                className="card"
                style={{
                  backgroundColor: item.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '10px',
                  padding: '15px',
                  width: '220px',
                  height: '70px',
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s, background-color 0.3s',
                  fontFamily: "'Readex Pro', sans-serif"
                }}
              >
                <span
                  className="icon"
                  style={{
                    fontSize: '2rem',
                    marginRight: '15px',
                  }}
                >
                  {item.icon}
                </span>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ margin: '0 0 5px', fontSize: '1.2rem' }}>{item.name}</h3>
                  <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>{item.count}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Citizens Section */}
          <p style={{ textAlign: 'center', color: 'white', marginTop: '40px', fontFamily: "'Readex Pro', sans-serif" }}>
            <b>{t.citizens}</b>
          </p>
          <div
            className="citizens"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
              fontFamily: "'Readex Pro', sans-serif"
            }}
          >
            <div
              className="card"
              style={{
                backgroundColor: '#A0153E',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '10px',
                padding: '15px',
                width: '220px',
                height: '70px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, background-color 0.3s',
                fontFamily: "'Readex Pro', sans-serif"
              }}
            >
              <span
                className="icon"
                style={{
                  fontSize: '2rem',
                  marginRight: '15px',
                }}
              >
                👥
              </span>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px', fontSize: '1.2rem' }}>{t.users}</h3>
                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>{userCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
