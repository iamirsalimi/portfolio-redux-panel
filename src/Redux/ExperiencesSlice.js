import { createSlice } from "@reduxjs/toolkit";

let slice = createSlice({
    name : 'Experience',
    initialState : {err: null , pending : true , experiences : []},
    reducers : {
        addExperience : (state , action) => {
            state.experiences.push(action.payload)
        } 
    }
})

export const { addExperience } = slice.actions
export default slice.reducer