import { useParams, Link, useNavigate } from 'react-router-dom'
import charactersData from '../../data/characters.json'
import '../../styles/DetailPage.css'

function CharacterDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const character = charactersData.find(c => c.id === parseInt(id))

  if (!character) {
    return (
      <div className="detail-page">
        <div className="error-message">
          <h2>Персонаж не найден</h2>
          <Link to="/characters" className="back-button">Вернуться к списку персонажей</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Назад
      </button>
      
      <div className="detail-content">
        <div className="detail-image">
          <img src={character.image} alt={character.name} />
        </div>
        
        <div className="detail-info">
          <h1>{character.name}</h1>
          
          <div className="detail-section">
            <h2>Информация</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Статус:</span>
                <span className={`status-badge ${character.status.toLowerCase()}`}>
                  {character.status}
                </span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Вид:</span>
                <span className="info-value">{character.species}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Тип:</span>
                <span className="info-value">{character.type || 'Не указан'}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Пол:</span>
                <span className="info-value">{character.gender}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Дата создания:</span>
                <span className="info-value">
                  {new Date(character.created).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail

