import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../../utils/barangaylogin.css'; // Make sure this path is correct
import { useHandleClicks } from '../hooks/useHandleClickBarangay';

export default function BarangayLogin() {
  const navigate = useNavigate();
  const { handlePasswordChange, handleUsernameChange, error, onLoginClick, username, password } = useHandleClicks();
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = (e: any) => {
    e.preventDefault();
    onLoginClick(e, navigate, username, password);
  };

  return (
    <div className="container">
      <h2>BARANGAY LOGIN</h2>
      <form onSubmit={onLogin}>
        <div className="input-container">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={(e) => handleUsernameChange(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            required
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        {error && <p className="error-message" style={{color: 'red', marginBottom: 5}}>{error}</p>}
        <input type="submit" value="Sign in" />
      </form>
    </div>
  );
}
