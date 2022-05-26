import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sortPlanetsByName, sortPlanetsByPopulation, sortPlanetsByResidents, updateSortOrder } from "../features/planetSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";

library.add(faSortUp, faSortDown, faSort);

function SortBar() {
    const dispatch = useDispatch();

    const { currentSortItem } = useSelector(
        (state) => state.planets
    )

    const sortByName = () => {
        dispatch(sortPlanetsByName());
        dispatch(updateSortOrder("name"));
    }

    const sortByPopulation = () => {
        dispatch(sortPlanetsByPopulation());
        dispatch(updateSortOrder("population"));
    }

    const sortByResidents = () => {
        dispatch(sortPlanetsByResidents());
        dispatch(updateSortOrder("residents"));
    }

    return (
        <div className="sort">
            <span className="sort-title">Sort By: </span>
            <button className={`sort-value ${currentSortItem === 'name' ? "active" : ""}`} onClick={sortByName}>Name { currentSortItem ==="name" && <FontAwesomeIcon icon="fas fa-sort" /> }</button>
            <button className={`sort-value ${currentSortItem === 'population' ? "active" : ""}`} onClick={sortByPopulation}>Population { currentSortItem ==="population" && <FontAwesomeIcon icon="fas fa-sort" /> }</button>
            <button className={`sort-value ${currentSortItem === 'residents' ? "active" : ""}`} onClick={sortByResidents}>Residents { currentSortItem ==="residents" && <FontAwesomeIcon icon="fas fa-sort" /> }</button> 
        </div>
    )
}

export default SortBar