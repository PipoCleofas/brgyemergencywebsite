import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHandleClicks } from '../hooks/useHandleClicks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../../utils/adminlogin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { onLoginClick } = useHandleClicks();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    onLoginClick(e, navigate, username, password);
  };

  return (
    <div className="container">
      <h2>ADMIN LOGIN</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
          />
        </div>
        <div className="input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            required
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
        <input type="submit" value="Sign in" />
      </form>
    </div>
  );
}
