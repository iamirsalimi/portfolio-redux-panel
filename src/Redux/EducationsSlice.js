import { createSlice } from "@reduxjs/toolkit";

let slice = createSlice({
    name : 'Education',
    initialState : {err: null , pending : true , educations : []},
    reducers : {
        addEducation : (state , action) => {
            state.educations.push(action.payload)
        } 
    }
})

export const { addEducation } = slice.actions
export default slice.reducer