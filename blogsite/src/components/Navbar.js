import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logoutUser } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">BlogSite</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/news">Haberler</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blog">Blog Yazıları</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/new-blog">Yeni Blog Ekle</Link>
                </li>
              </>
            ) : null}
          </ul>
          
          <ul className="navbar-nav">
            {user ? (
              <li className="nav-item">
                <button 
                  className="btn btn-outline-light" 
                  onClick={handleLogout}
                >
                  Çıkış Yap
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Giriş</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Kayıt Ol</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 