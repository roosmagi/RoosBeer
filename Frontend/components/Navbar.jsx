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
        <Link to="/" className="navbar-logo">RoosBeer</Link>

        <div className="navbar-right">
          <div className="navbar-links">
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>

          <div className="navbar-auth">
            {token ? (
              <button className="btn logout" onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login" className="btn login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
