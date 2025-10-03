import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavigationBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-logo">RoosBeer</Link>

        {/* Links */}


        {/* Auth button */}
        <div className="navbar-auth">
          {token ? (
            <button className="btn logout" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="btn login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
