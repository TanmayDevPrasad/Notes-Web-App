import React from 'react'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Notes App</h2>
      </div>
      <ul className="nav-items">
        <li className="nav-item">
          <a href="#" className="nav-link active">Home</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Favorites</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Categories</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Settings</a>
        </li>
      </ul>
      <div className="navbar-actions">
        <button className="theme-toggle">🌙</button>
        <button className="user-profile">👤</button>
      </div>
    </nav>
  )
}

export default Navbar 