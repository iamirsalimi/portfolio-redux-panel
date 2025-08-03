import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEducations, addEducation as addEducationHandler, updateEducation ,  deleteEducation } from "../Services/Axios/Requests/Educations";
import toast from "react-hot-toast";

export const fetchEducations = createAsyncThunk(
    'Education/getEducations',
    async (payload, { dispatch, getState }) => {
        return await getEducations()
    }
)

export const postEducation = createAsyncThunk(
    'Educations/postEducation',
    async (payload, { dispatch, getState }) => {
        // as a payload we have sent an object that has to properties one is the loading toast's ID and the other one is object we want to add to our database "newEducationObj"
        console.log(payload)
        let res = await addEducationHandler(payload.newEducationObj)
        // console.log(res)
        dispatch(fetchEducations())
        return res
    }
)

export const editEducation = createAsyncThunk(
    'Educations/patchEducation',
    async (payload, { dispatch, getState }) => {
        let res = await updateEducation(payload.id, payload.newEducationObj)
        console.log(res , payload)
        return payload
    }
)

export const removeEducation = createAsyncThunk(
    'Educations/removeEducation',
    async (payload, { dispatch, getState }) => {
        let res = await deleteEducation(payload.id)
        // console.log(res)
        return payload
    }
)

let slice = createSlice({
    name: 'Education',
    initialState: {
        err: null,
        status: 'idle', // 'idle' , 'pending' , 'fetch-succeed' , 'fetch-failed' , 'adding' , 'add-succeed' , 'add-failed' , 'updating' , 'update-succeed' , 'update-failed' , 'removing' , 'remove-succeed' , 'remove-failed'
        educations: []
    },
    extraReducers: builder => {
        // get educations
        builder.addCase(fetchEducations.fulfilled, (state, action) => {
            state.educations = action.payload.data.sort((a,b) => a.id - b.id)
            state.status = 'fetch-succeed'
            state.err = false
        })
        builder.addCase(fetchEducations.pending, (state, action) => {
            state.status = 'pending'
            state.err = false
        })
        builder.addCase(fetchEducations.rejected, (state, action) => {
            state.educations = []
            state.status = 'fetch-failed'
            state.err = action.error.message
            toast.error(action.error.message)
        })

        // post education
        builder.addCase(postEducation.fulfilled, (state, action) => {
            toast.dismiss(action.meta.arg.toastId)
            toast.success('Education has added successfully')
            state.educations = [...state.educations, action.meta.arg.newEducationObj]
            state.status = 'add-succeed'
            state.err = false
        })

        builder.addCase(postEducation.pending, (state, action) => {
            state.status = 'adding'
            state.err = false
        })
        
        builder.addCase(postEducation.rejected, (state, action) => {
            toast.dismiss(action.meta.arg.toastId)
            state.status = 'add-failed'
            state.err = action.error.message
            toast.error(action.error.message)
        })

        // update education
        builder.addCase(editEducation.fulfilled, (state, action) => {
            toast.dismiss(action.meta.arg.toastId)
            toast.success('Education has updated successfully')
            // console.log(action.payload.newEducationObj.id)
            state.educations = state.educations.map(education => education.id == action.payload.id ? {id : action.payload.id , ...action.payload.newEducationObj} : education)
            state.status = 'update-succeed'
            state.err = false
        })
        builder.addCase(editEducation.pending, (state, action) => {
            state.status = 'updating'
            state.err = false
        })
        builder.addCase(editEducation.rejected, (state, action) => {
            toast.dismiss(action.meta.arg.toastId)
            state.status = 'update-failed'
            state.err = action.error.message
            toast.error(action.error.message)
        })
        
        // remove education
        builder.addCase(removeEducation.fulfilled, (state, action) => {
            toast.dismiss(action.meta.arg.toastId)
            toast.success('Education has removed successfully')
            state.educations = state.educations.filter(education => education.id != action.payload.id)
            state.status = 'remove-succeed'
            state.err = false
        })
        builder.addCase(removeEducation.pending, (state, action) => {
            state.status = 'removing'
            state.err = false
        })
        builder.addCase(removeEducation.rejected, (state, action) => {
            toast.dismiss(payload.toastId)
            state.status = 'remove-failed'
            state.err = action.error.message
            toast.error(action.error.message)
        })
    }
})

// export const { addEducation, updateEducation, removeEducation } = slice.actions
export default slice.reducer