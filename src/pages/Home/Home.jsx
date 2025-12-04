import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  return (
    <div className="home">
      <h1>Добро пожаловать в User Dashboard!</h1>
      <p>Это главная страница приложения.</p>
      {isAuthenticated ? (
        <div className="home-buttons">
          <button onClick={() => navigate('/dashboard')}>
            Перейти в Dashboard
          </button>
          <button onClick={() => navigate('/characters')}>
            Персонажи
          </button>
        </div>
      ) : (
        <button onClick={() => navigate('/login')}>
          Войти в систему
        </button>
      )}
    </div>
  )
}

