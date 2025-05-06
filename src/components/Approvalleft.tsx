import { useNavigate, useLocation } from 'react-router-dom';
import { useHandleClicks } from '../hooks/useHandleClicks';

const ApprovalLeft = () => {
  const { handleNavClick } = useHandleClicks();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="sidebar">
      <div className="avatar-container">
        <div className="avatar">
          <img src="https://via.placeholder.com/100" alt="Avatar" />
        </div>
        <h3>Admin Name</h3>
        <p>Admin Role</p>
      </div>
      <ul>
        {[
          { label: 'Home', icon: '🏠', path: '/admindashboard' },
          { label: 'Approval', icon: '✅', path: '/approval' },
          { label: 'Settings', icon: '⚙️', path: '/settings' },
          { label: 'History', icon: '📜', path: '/history' },
        ].map((item, index) => (
          <li
            key={index}
            className={isActive(item.path)}
            onClick={() => handleNavClick(navigate, item.path)}
          >
            <span>{item.icon}</span>
            <a href="">{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApprovalLeft;
