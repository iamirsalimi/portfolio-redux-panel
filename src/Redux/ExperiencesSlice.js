import { createSlice } from "@reduxjs/toolkit";

let slice = createSlice({
    name: 'Experience',
    initialState: { err: null, pending: true, experiences: [] },
    reducers: {
        addExperience: (state, action) => {
            state.experiences.push(action.payload)
        }, updateExperience : (state, action) => {
            state.experiences = state.experiences.map(experience => experience.id == action.payload.id ? action.payload : experience)
        },
        removeExperience : (state, action) => {
            state.experiences = state.experiences.filter(experience => experience.id !== action.payload)
        }
    }
})

export const { addExperience, updateExperience  , removeExperience  } = slice.actions
export default slice.reducer