import './Profile.css'

export default function Profile() {
  const name = localStorage.getItem('userName') || 'User'
  const email = localStorage.getItem('userEmail') || 'user@example.com'

  return (
    <div className="profile">
      <h2>Profile</h2>
      <div className="profile-info">
        <p><strong>Имя:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </div>
  )
}

