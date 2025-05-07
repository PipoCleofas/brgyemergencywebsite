import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '../context/LanguageProvider';
import { useHandleClicks } from '../hooks/useHandleClicks';
import { useGetItems } from "../hooks/useGetItems";
import axios from 'axios';
import '../../utils/Approval.css';
import "@fontsource/readex-pro";

export default function Approval() {
  interface Photo {
    UserID: number;
    image1: string;
    image2: string;
    image3: string;
  }
  const { checkAccounts, clients, photos } = useGetItems();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const { handleNavClick } = useHandleClicks();
  const { translations, language } = useLanguageContext();
  const t = translations[language];

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleAvatarClick = () => {
    navigate('/edit-profile');
  };

  useEffect(() => {
    const fetchClientsAndPhotos = async () => {
      const success = await checkAccounts("clients");
  
      if (success) {
        console.log("✅ Clients fetched:", clients);
  
        // Fetch photos for each client after clients have been fetched
        const fetchPhotoPromises = clients.map((client) => {
          if (client.UserID) {
            return checkAccounts("photos", undefined, undefined, client.UserID);
          }
        });
  
        await Promise.all(fetchPhotoPromises);
  
        console.log("✅ All photos fetched:", photos);
      }
  
      setLoading(false);
    };
  
    fetchClientsAndPhotos();
    const intervalId = setInterval(fetchClientsAndPhotos, 3000);
    return () => clearInterval(intervalId);
  }, [clients,photos]); // Removed `clients` from dependencies to avoid unnecessary re-runs
  

  useEffect(() => {
    console.log("Updated Photos:", photos);
  }, [photos]);

  
  const updateUserStatus = async (status: string, userId: number) => {
    try {
      setUpdatingStatus(userId);
      const response = await axios.put(
        `https://express-production-ac91.up.railway.app/user/updateStatusUser/${status}`,
        { UserID: userId },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("User status updated:", response.data);
      await checkAccounts("clients");
    } catch (error) {
      console.error("Error updating user status:", error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredClients = clients.filter((user) => user.Status === "pending");

  if (loading) {
    return <div>Loading...</div>;
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
        }}
      >
        {/* Avatar Section */}
        <div className="avatar-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={handleAvatarClick}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', marginBottom: '10px', border: '3px solid white' }}>
            <img src="https://via.placeholder.com/100" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: '15px 0', padding: '10px 15px', cursor: 'pointer', borderRadius: '5px' }} onClick={() => handleNavClick(navigate, item.path)}>
              <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>{item.icon}</span>
              <a href="" style={{ textDecoration: 'none', color: 'white', fontSize: '1rem' }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main" style={{ flex: 1, padding: '15px', backgroundColor: '#5594DC', transition: 'margin-left 0.3s' }}>
        <button className="toggle-sidebar" onClick={toggleSidebar} style={{ cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', marginBottom: '20px' }}>☰</button>
        <div className="dashboard-header" style={{ borderBottom: '2px solid #6CB4D8', paddingBottom: '10px' }}>
          <h1 style={{ margin: 0, color: 'white' }}>{t.approval}</h1>
        </div>

        <p style={{ textAlign: 'center', color: 'white', marginTop: '20px', fontFamily: "'Readex Pro', sans-serif" }}><b>{t.usermanagement}</b></p>
        <div className="table-container">
          <table className="approval-table">
            <thead>
              <tr>
                <th>{t.firstname}</th>
                <th>{t.middlename}</th>
                <th>{t.lastname}</th>
                <th>{t.birthday}</th>
                <th>{t.frontid}</th>
                <th>{t.backid}</th>
                <th>SELFIE</th>
                <th>{t.status}</th>
                <th>{t.approval1}</th>
              </tr>
            </thead>
            <tbody>
            {filteredClients.map((user) => {
  const userPhotos = photos?.find((photo: Photo) => photo.UserID === user.UserID) || {};

  console.log("🔍 Checking userPhotos:", user.UserID, userPhotos); // Debugging

  return (
    <tr key={user.UserID}>
      <td>{user.FirstName}</td>
      <td>{user.MiddleName}</td>
      <td>{user.LastName}</td>
      <td>{user.Birthday}</td>

      {/* Ensure userPhotos.image1 exists before trying to open */}
      <td>
        <button className="view-btn" onClick={() => userPhotos.image1 && window.open(userPhotos.image1, '_blank')}>
          {t.view}
        </button>
      </td>
      <td>
        <button className="view-btn" onClick={() => userPhotos.image2 && window.open(userPhotos.image2, '_blank')}>
          {t.view}
        </button>
      </td>
      <td>
        <button className="view-btn" onClick={() => userPhotos.image3 && window.open(userPhotos.image3, '_blank')}>
          {t.view}
        </button>
      </td>

      <td>{user.Status}</td>
      <td>
        <button className="approve-btn" onClick={() => updateUserStatus("approved", user.UserID)} disabled={updatingStatus === user.UserID}>
          {t.approve}
        </button>
        <button className="reject-btn" onClick={() => updateUserStatus("rejected", user.UserID)} disabled={updatingStatus === user.UserID}>
          {t.reject}
        </button>
      </td>
    </tr>
  );
})}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}