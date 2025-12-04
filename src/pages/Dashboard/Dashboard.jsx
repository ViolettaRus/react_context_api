import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Выйти
        </button>
      </div>
      <nav className="dashboard-nav">
        <NavLink to="/dashboard/profile" end>
          Profile
        </NavLink>
        <NavLink to="/dashboard/settings">
          Settings
        </NavLink>
        <NavLink to="/dashboard/stats">
          Stats
        </NavLink>
      </nav>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  )
}

