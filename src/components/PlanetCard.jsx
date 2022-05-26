import React from 'react'

function PlanetCard({ planet }) {
  return (
    <div className="planet">
        <h2>Name: {planet.name}</h2>
        <p>Terrain: {planet.terrain}</p>
        <p>Climate: {planet.climate}</p>
        <p>Population: {planet.population}</p>
        <p>Residents: {planet.residents.length}</p>
    </div>
  )
}

export default PlanetCard