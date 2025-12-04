import { useState } from 'react'
import './Settings.css'

export default function Settings() {
  const [name, setName] = useState(localStorage.getItem('userName') || 'User')

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('userName', name)
    alert('Имя успешно изменено!')
  }

  return (
    <div className="settings">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  )
}

