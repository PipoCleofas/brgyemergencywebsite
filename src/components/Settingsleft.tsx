/*import { useNavigate } from "react-router-dom";
import { useHandleClicks } from "../hooks/useHandleClicks";
import { useLanguageContext } from '../context/LanguageProvider';
import { useEffect, useState } from "react";

export default function SettingsLeft() {
  const navigate = useNavigate();
  const { handleNavClick } = useHandleClicks();
  const { translations, language } = useLanguageContext();

  const t = translations[language];
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  return (
    <div className="settings-left">
      <div className="profile-section">
        <div className="profile-pic"></div>
        <div className="profile-name">
          <h3>Administrator</h3>
          <p>{username || "Guest"}</p>
        </div>
        <ul className="nav-list">
          <li onClick={() => handleNavClick(navigate, '/admindashboard')}>{t.home}</li>
          <li onClick={() => handleNavClick(navigate, '/approval')}>{t.approval}</li>
          <li className="active">{t.settings}</li>
          <li onClick={() => handleNavClick(navigate, '/history')}>History</li>
        </ul>
      </div>
    </div>
  );
}*/