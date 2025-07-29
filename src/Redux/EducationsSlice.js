import { createSlice } from "@reduxjs/toolkit";

let slice = createSlice({
    name : 'Education',
    initialState : {err: null , pending : true , educations : []},
    reducers : {
        addEducation : (state , action) => {
            state.educations.push(action.payload)
        },
        updateEducation : (state , action) => {
            state.educations = state.educations.map(education => education.id == action.payload.id ? action.payload : education)
        },
        removeEducation : (state , action) => {
            state.educations = state.educations.filter(education => education.id !== action.payload)
        }
    }
})

export const { addEducation , updateEducation , removeEducation} = slice.actions
export default slice.reducer