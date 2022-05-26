import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlanets, setCurrentPage, updateSearchValue, searchPlanets } from "../features/planetSlice";

// Components
import SearchBar from './SearchBar'
import SortBar from './SortBar'
import PlanetCard from './PlanetCard'
import Pagination from './Pagination'
import Spinner from "./Spinner";
import ToggleTheme from './ToggleTheme';

function Dashboard() {
    const dispatch = useDispatch();

    // select a slice of current state for use within the component
    const { isError, isLoading, message, currentPage, pageSize, nameSearch, filteredPlanets } = useSelector(
        (state) => state.planets
    );

    // compute pagination when current page filteredPlanets changes
    const currentPagePlanets = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return filteredPlanets.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, filteredPlanets]);

    // Dispatch useEffect to load planets when page loads for the first time
    useEffect(() => {
        if (isError) {
            console.error(message);
        }
        dispatch(getPlanets());
    }, [isError, message, dispatch]);

    // Handle both climate and name search changes
    const handleInputChange = e => {
        const inputName = e.target.name;
        const value = e.target.value;
        dispatch(updateSearchValue({inputName, value}));
        dispatch(searchPlanets());
    }

    // Handle terrain input when the multi-select value changes
    const handleTerrainChange = e => {
        const inputName = e.target.name;
        const options = e.target.options;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }

        dispatch(updateSearchValue({inputName, value}));
        dispatch(searchPlanets());
    }

    // Load spinner when app is loading data
    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="container">
            <div className="title"><h1>Star Wars Planets</h1></div>
            <ToggleTheme />
            <div className="search-sort-bar">
                <SearchBar nameSearch={nameSearch} handleInputChange={handleInputChange} handleTerrainChange={handleTerrainChange} />
                <SortBar />
            </div>

            <div className="planets">
                {currentPagePlanets?.map((planet, key) => (
                    <PlanetCard key={key} planet={planet} />
                ))}
            </div>

            <div className="pagination">
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={filteredPlanets.length}
                    pageSize={pageSize}
                    onPageChange={page => dispatch(setCurrentPage(page))}
                />
            </div>
        </div>
    )
}

export default Dashboard