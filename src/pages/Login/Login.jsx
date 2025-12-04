import { useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import Input from '../../components/Input/Input'
import FormButton from '../../components/common/FormButton'
import './Login.css'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Получаем путь для редиректа из query параметра или из location state
  const fromParam = searchParams.get('from')
  const from = fromParam || location.state?.from?.pathname || '/dashboard'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Очищаем ошибку при изменении поля
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Валидные учетные данные
    const validUsers = [
      { email: 'admin@example.com', password: 'admin123', name: 'Admin' },
      { email: 'user@example.com', password: 'user123', name: 'User' },
      { email: 'test@test.com', password: 'test', name: 'Test User' }
    ]
    
    // Проверка учетных данных
    const user = validUsers.find(
      u => u.email === formData.email && u.password === formData.password
    )
    
    if (user) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', user.email)
      localStorage.setItem('userName', user.name)
      setError('')
      navigate(from, { replace: true })
    } else {
      setError('Неверный email или пароль!')
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <h2>Вход в систему</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            withAsterisk
            required
            error={error && !formData.email ? 'Обязательное поле' : null}
          />
          <Input
            type="password"
            name="password"
            label="Пароль"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={handleChange}
            withAsterisk
            required
            error={error && !formData.password ? 'Обязательное поле' : null}
          />
          <FormButton>Войти</FormButton>
        </form>
        <button onClick={() => navigate('/')} className="back-button">
          На главную
        </button>
      </div>
    </div>
  )
}
