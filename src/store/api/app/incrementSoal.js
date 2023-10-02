// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
// import { updateSearchFilter, updateCategoryFilter } from "./action";

const initialIncrementSoalState = {
    nomorSoal: 0,
    minutes: 0
    // listSoal: []
};

const incrementSoalSlice = createSlice({
    name: "incsoal",
    initialState: initialIncrementSoalState,
    reducers: {
        nextNomorSoal: (state, action) => {
            console.log('action payload', action.payload)
            state.nomorSoal = state.nomorSoal + action.payload;
        },
        prevNomorSoal: (state, action) => {
            state.nomorSoal = state.nomorSoal - action.payload;
        },
        removeNomorSoal: (state, action) => {
            state.nomorSoal = 0;
        },
        changeMinutes: (state, action) => {
            state.minutes = action.payload;
        },

    },
});

export const { nextNomorSoal, prevNomorSoal, removeNomorSoal, changeMinutes } = incrementSoalSlice.actions;
export default incrementSoalSlice.reducer;
