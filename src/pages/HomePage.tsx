import { useNavigate } from 'react-router-dom';
import { useHandleClicks } from '../hooks/useHandleClicks';
import '../../utils/homepage.css';
import '../../utils/adminlogin.css';
import '../../utils/barangaylogin.css';


export default function HomePage() {
  const navigate = useNavigate();
  const { handleNavClick } = useHandleClicks();

  return (
    <div className="Home">
      <p className="monserat"><b>YOUR SAFETY</b></p>
      <p className="monserat"><b>IS OUR</b></p>
      <p className="monserat"><b>PRIORITY</b></p>

      <div className="button-container">
      <button className= "adminbutton" id="adminbutton" onClick={() => handleNavClick(navigate, '/adminlogin')}>SIGN IN (ADMIN)</button>
      <button className = "barangaybutton" id="barangaybutton" onClick={() => handleNavClick(navigate, '/barangaylogin')}>SIGN IN (BARANGAY)</button>
      </div>
    </div>
  );
}
