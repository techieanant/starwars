import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initialize values for state variables
const initialState = {
    planets: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    currentPage: 1,
    pageSize: 8,
    nameSearch: "",
    climateSearch: "",
    terrainSearch: [],
    filteredPlanets: [],
    sortedAscending: false,
    currentSortItem: "",
    currentTheme: "light",
}

// function to get planet data from the planets-ui json file in the public folder - uses axios
export const getPlanets = createAsyncThunk(
    "planets/getPlanets",
    async(_, thunkAPI) => {
        try {
            const response = await axios.get('/data/planets-ui.json')
            return response?.data
        } catch (error) {
            const message = 
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

// create planets slice with reducer actions and extra reducers
const planetSlice = createSlice({
    name: "planets",
    initialState,
    reducers: {
        reset: (state) => initialState,
        // set current page on page change - pagination
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        // on form change (name, terrain, climate search), update their new values in state
        updateSearchValue(state, action) {
            if (action.payload.inputName === "name") {
                state.nameSearch = action.payload.value;
            } 
            if (action.payload.inputName === "climate") {
                state.climateSearch = action.payload.value;
            } 
            if (action.payload.inputName === "terrain") {
                state.terrainSearch = action.payload.value;
            }
        },
        // Once search values are updated, search planets using all the three values
        searchPlanets(state) {
            let filteredPlanets = state.planets.filter(
                planet => {
                    return (
                        planet.name.toLowerCase().includes(state.nameSearch.toLowerCase()) &&
                        planet.climate.includes(state.climateSearch)
                    );
                }
            );

            // then filter by terrain
            const terrainArray = state.terrainSearch;
            const terrainArrayLength = terrainArray.length;

            if (terrainArrayLength > 0) {
                const planetsLength = filteredPlanets.length;
                const filterResults = [];
                
                for (let i=0 ; i<planetsLength ; i++){
                    for (let j=0 ; j<terrainArrayLength ; j++){
                        if ((filteredPlanets[i]['terrain'].includes(terrainArray[j])) && (!filterResults.includes(filteredPlanets[i]))) {
                            filterResults.push(filteredPlanets[i]);
                        }
                    }
                }
                filteredPlanets = filterResults;
            }

            // Finally set new value of filtered planets to state with the name filteredPlanets and reset currentpage.
            state.filteredPlanets = filteredPlanets;
            state.currentPage = 1;

        },
        // reducer action to set sort as ascending or descening
        updateSortOrder(state, action) {
            state.sortedAscending = !state.sortedAscending;
            state.currentSortItem = action.payload;
        },
        // sort by name function (either ASC or DESC)
        sortPlanetsByName(state, action) {
            function compare( a, b ) {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase

                if (state.sortedAscending === true) {
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                }
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                return 0;
            }

            const sorted = [...state.filteredPlanets].sort(compare);

            state.filteredPlanets = sorted;
        },
        // sort by population function (either ASC or DESC)
        sortPlanetsByPopulation(state, action) {
            const sorted = [...state.filteredPlanets].sort((a, b) => {
                return state.sortedAscending === true ? b.population - a.population : a.population - b.population;
            });

            state.filteredPlanets = sorted;
        },
        // sort by residents' number function (either ASC or DESC)
        sortPlanetsByResidents(state,action) {
            const sorted = [...state.filteredPlanets].sort((a, b) => {
                return state.sortedAscending === true ? b.residents.length - a.residents.length : a.residents.length - b.residents.length;
            });

            state.filteredPlanets = sorted;
        },
    },
    // extra reducers for setting state as loading, success, or error when data is loaded for the first time.
    extraReducers: (builder) => {
        builder
            .addCase(getPlanets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPlanets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.planets = action.payload.results;
                state.filteredPlanets = action.payload.results;
            })
            .addCase(getPlanets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
})

export const { 
    reset, 
    setCurrentPage, 
    updateSearchValue, 
    searchPlanets, 
    sortPlanetsByName, 
    sortPlanetsByPopulation, 
    sortPlanetsByResidents,
    updateSortOrder
} = planetSlice.actions;
export default planetSlice.reducer;