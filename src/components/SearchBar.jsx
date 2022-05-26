import React from 'react';
import { useSelector } from "react-redux";

function SearchBar({ nameSearch, handleInputChange, handleTerrainChange }) {

    const { planets, terrainSearch } = useSelector(
        (state) => state.planets
    )

    let climates = [...new Set(planets.map(planet => planet.climate.split(",").map(function(item) {
        return item.trim();
    })))];

    climates = [...new Set(climates.flat())]

    let terrains = [...new Set(planets.map(planet => planet.terrain.split(",").map(function(item) {
        return item.trim();
    })))];
    
    terrains = [...new Set(terrains.flat())]

    return (
        <div className="search-wrapper">
            <label htmlFor="name">Planet Name:</label>
            <input type="search" name="name" defaultValue={nameSearch} onChange = {handleInputChange} placeholder = "Search By Name" ></input>
            <label htmlFor="climate">Climate:</label>
            <select name="climate" onChange={handleInputChange} className="climate-select">
                <option value="">Filter By Climate</option>
                {climates?.map(climate => (
                    <option key={climate} value={climate}>{climate}</option>
                ))}
            </select>
            <label htmlFor ="terrain1">Terrain:</label>
            <div className="select select-multiple">
                <select id="multi-select" name="terrain" defaultValue={terrainSearch} multiple={true} onChange={handleTerrainChange} className="terrain-multi-select">
                    <option value="">Filter By Terrain</option>
                    {terrains?.map((terrain, i) => (
                        <option value={terrain} key={i}>{terrain}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default SearchBar