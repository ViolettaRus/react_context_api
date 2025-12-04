import { useState, useEffect } from 'react'
import './Stats.css'

// Демо-данные на случай, если API недоступен
const demoUserData = {
  name: 'Leanne Graham',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  address: {
    city: 'Gwenborough',
    street: 'Kulas Light'
  }
}

export default function Stats() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDemo, setIsDemo] = useState(false)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      setUser(data)
      setIsDemo(false)
      setLoading(false)
    } catch (err) {
      console.error('Error loading stats:', err)
      
      let errorMessage = 'Произошла ошибка при загрузке данных'
      
      if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
        errorMessage = 'Не удалось подключиться к серверу. Показаны демо-данные.'
        // Используем демо-данные при ошибке сети
        setUser(demoUserData)
        setIsDemo(true)
      } else {
        errorMessage = err.message || errorMessage
      }
      
      setError(errorMessage)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (loading && !user) {
    return (
      <div className="stats">
        <h2>Stats</h2>
        <div className="stats-info">
          <p>Загрузка данных...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="stats">
      <h2>Stats</h2>
      {error && (
        <div style={{
          padding: '12px',
          marginBottom: '15px',
          backgroundColor: isDemo ? '#fff3cd' : '#fee',
          color: isDemo ? '#856404' : '#c33',
          borderRadius: '4px',
          fontSize: '14px',
          border: `1px solid ${isDemo ? '#ffc107' : '#fcc'}`
        }}>
          <p style={{ margin: '0 0 10px 0' }}>{error}</p>
          <button 
            onClick={loadData}
            disabled={loading}
            style={{
              padding: '6px 12px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {loading ? 'Загрузка...' : 'Попробовать снова'}
          </button>
        </div>
      )}
      <div className="stats-info">
        <p><strong>User:</strong> {user?.name || 'Не указано'}</p>
        <p><strong>Email:</strong> {user?.email || 'Не указано'}</p>
        {user?.phone && <p><strong>Phone:</strong> {user.phone}</p>}
        {user?.website && <p><strong>Website:</strong> {user.website}</p>}
        {user?.address && (
          <p><strong>Address:</strong> {user.address.city}, {user.address.street}</p>
        )}
        {isDemo && (
          <p style={{ 
            marginTop: '15px', 
            fontSize: '12px', 
            color: '#856404', 
            fontStyle: 'italic',
            padding: '8px',
            backgroundColor: '#fff3cd',
            borderRadius: '4px'
          }}>
            ℹ️ Показаны демонстрационные данные из-за недоступности API
          </p>
        )}
      </div>
    </div>
  )
}
