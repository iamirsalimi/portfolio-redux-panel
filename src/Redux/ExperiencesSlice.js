import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getExperiences, addExperience as addExperienceHandler, updateExperience , deleteExperience } from "../Services/Axios/Requests/Experiences";
import toast from "react-hot-toast";

export const fetchExperiences = createAsyncThunk(
    'Experience/getExperiences',
    async (payload, { dispatch, getState }) => {
        return await getExperiences()
    }
)

export const postExperience = createAsyncThunk(
    'Experiences/postExperience',
    async (payload, { dispatch, getState }) => {
        // as a payload we have sent an object that has to properties one is the loading toast's ID and the other one is object we want to add to our database "newExperienceObj"
        console.log(payload)
        let res = await addExperienceHandler(payload.newExperienceObj)
        // console.log(res)
        dispatch(fetchExperiences())
        return res
    }
)

export const editExperience = createAsyncThunk(
    'Experiences/patchExperience',
    async (payload, { dispatch, getState }) => {
        let res = await updateExperience(payload.id, payload.newExperienceObj)
        // console.log(res , payload)
        return payload
    }
)

export const removeExperience = createAsyncThunk(
    'Experiences/removeExperience',
    async (payload, { dispatch, getState }) => {
        let res = await deleteExperience(payload.id)
        // console.log(res)
        return payload
    }
)

let slice = createSlice({
    name: 'Experience',
    initialState: {
        err: null,
        status: 'idle',  // 'idle' , 'pending' , 'fetch-succeed' , 'fetch-failed' , 'adding' , 'add-succeed' , 'add-failed' , 'updating' , 'update-succeed' , 'update-failed' , 'removing' , 'remove-succeed' , 'remove-failed'
        experiences: []
    },
    extraReducers: builder => {
        // get experiences
        builder.addCase(fetchExperiences.fulfilled, (state, action) => {
            state.experiences = action.payload.data.sort((a,b) => a.id - b.id)
            state.status = 'fetch-succeed'
            state.err = false
        })
        builder.addCase(fetchExperiences.pending, (state, action) => {
            state.status = 'pending'
            state.err = false
        })
        builder.addCase(fetchExperiences.rejected, (state, action) => {
            state.experiences = []
            state.status = 'fetch-failed'
            state.err = action.error.message
            toast.error(action.error.message)
        })

        // post education
        builder.addCase(postExperience.fulfilled, (state, action) => {
            toast.dismiss(action.meta.arg.toastId)
            toast.success('Experience has added successfully')
            state.experiences = [...state.experiences, action.meta.arg]
            state.status = 'add-succeed'
            state.err = false
        })

        builder.addCase(postExperience.pending, (state, action) => {
            state.status = 'adding'
            state.err = false
        })

        builder.addCase(postExperience.rejected, (state, action) => {
            toast.dismiss(action.meta.arg.toastId)
            state.status = 'add-failed'
            state.err = action.error.message
            toast.error(action.error.message)
        })

        // update education
        builder.addCase(editExperience.fulfilled, (state, action) => {
            toast.dismiss(action.meta.arg.toastId)
            toast.success('Experience has updated successfully')
            // console.log(action.payload.newExperienceObj.id)
            state.experiences = state.experiences.map(education => education.id == action.payload.id ? {id : action.payload.id ,...action.payload.newExperienceObj} : education)
            state.status = 'update-succeed'
            state.err = false
        })
        builder.addCase(editExperience.pending, (state, action) => {
            state.status = 'updating'
            state.err = false
        })
        builder.addCase(editExperience.rejected, (state, action) => {
            toast.dismiss(action.meta.arg.toastId)
            state.status = 'update-failed'
            state.err = action.error.message
            toast.error(action.error.message)
        })

        // remove education
        builder.addCase(removeExperience.fulfilled, (state, action) => {
            toast.dismiss(action.meta.arg.toastId)
            toast.success('Experience has removed successfully')
            state.experiences = state.experiences.filter(education => education.id != action.payload.id)
            state.status = 'remove-succeed'
            state.err = false
        })
        builder.addCase(removeExperience.pending, (state, action) => {
            state.status = 'removing'
            state.err = false
        })
        builder.addCase(removeExperience.rejected, (state, action) => {
            toast.dismiss(payload.toastId)
            state.status = 'remove-failed'
            state.err = action.error.message
            toast.error(action.error.message)
        })
    }
})

export default slice.reducer