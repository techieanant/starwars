import { configureStore } from "@reduxjs/toolkit";
import planetReducer from "../features/planetSlice";

const store = configureStore({
    reducer: {
        planets: planetReducer
    }
});

export default store;