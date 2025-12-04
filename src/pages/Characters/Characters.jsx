import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import charactersData from '../../data/characters.json'
import '../../styles/CategoryPage.css'

function Characters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [characters, setCharacters] = useState(charactersData)
  const sortOrder = searchParams.get('sort') || 'ASC'

  useEffect(() => {
    const sorted = [...charactersData].sort((a, b) => {
      const dateA = new Date(a.created)
      const dateB = new Date(b.created)
      return sortOrder === 'ASC' 
        ? dateA - dateB 
        : dateB - dateA
    })
    setCharacters(sorted)
  }, [sortOrder])

  const handleSortChange = (order) => {
    setSearchParams({ sort: order })
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>Персонажи</h1>
        <div className="sort-controls">
          <span>Сортировка:</span>
          <button
            className={`sort-btn ${sortOrder === 'ASC' ? 'active' : ''}`}
            onClick={() => handleSortChange('ASC')}
          >
            По дате создания ↑
          </button>
          <button
            className={`sort-btn ${sortOrder === 'DESC' ? 'active' : ''}`}
            onClick={() => handleSortChange('DESC')}
          >
            По дате создания ↓
          </button>
        </div>
      </div>

      <div className="items-grid">
        {characters.map((character) => (
          <Link
            key={character.id}
            to={`/characters/${character.id}`}
            className="item-card"
          >
            <div className="item-image">
              <img src={character.image} alt={character.name} />
            </div>
            <div className="item-info">
              <h3>{character.name}</h3>
              <p className="item-status">
                <span className={`status-badge ${character.status.toLowerCase()}`}>
                  {character.status}
                </span>
              </p>
              <p className="item-details">
                {character.species} • {character.gender}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Characters

