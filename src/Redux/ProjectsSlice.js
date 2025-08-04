import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProjects, addProject as addProjectHandler , editProject as editProjectHandler , deleteProject } from "../Services/Axios/Requests/Projects";
import toast from "react-hot-toast";

export const fetchProjects = createAsyncThunk(
    'Projects/fetchProjects',
    async (payload, { getState, dispatch }) => {
        return await getProjects()
    }
)

export const addProject = createAsyncThunk(
    'Projects/addProjects',
    async (payload, { getState, dispatch }) => {
        let res = await addProjectHandler(payload.newProjectObj)
        dispatch(fetchProjects())
        return res
    }
)

export const editProject = createAsyncThunk(
    'Projects/editProjects',
    async (payload, { getState, dispatch }) => {
        let res = await editProjectHandler(payload.id , payload.newProjectObj)
        return payload
    }
)

export const removeProject = createAsyncThunk(
    'Projects/removeProjects',
    async (payload, { getState, dispatch }) => {
        let res = await deleteProject(payload.id)
        return payload
    }
)


const slice = createSlice({
    name: 'Projects',
    initialState: {
        err: null,
        status: 'idle', // 'idle' , 'pending' , 'fetch-succeed' , 'fetch-failed' , 'adding' , 'add-succeed' , 'add-failed' , 'updating' , 'update-succeed' , 'update-failed' , 'removing' , 'remove-succeed' , 'remove-failed'
        projects: []
    },
    extraReducers: build => {
        // fetch Projects
        build.addCase(fetchProjects.fulfilled, (state, action) => {
            state.status = 'fetch-succeed'
            state.projects = action.payload.data
            state.err = null
        })

        build.addCase(fetchProjects.pending, (state, action) => {
            state.status = 'pending'
            state.err = null
        })
        
        build.addCase(fetchProjects.rejected, (state, action) => {
            toast.error(action.error.message)
            state.status = 'fetch-failed'
            state.err = action.error.message
        })

        // add Project
        build.addCase(addProject.fulfilled, (state, action) => {
            toast.dismiss(action.meta.arg.toastId)
            toast.success('Project added successfully')
            state.status = 'add-succeed'
            state.projects = [...state.projects, action.meta.arg.newProjectObj]
            state.err = null
        })

        build.addCase(addProject.pending, (state, action) => {
            state.status = 'adding'
            state.err = null
        })

        build.addCase(addProject.rejected, (state, action) => {
            toast.dismiss(action.payload.toastId)
            toast.error(action.error.message)
            state.status = 'add-failed'
            state.err = action.error.message
        })
        
        // edit Project
        build.addCase(editProject.fulfilled, (state, action) => {
            toast.dismiss(action.payload.toastId)
            toast.success('Project updated successfully')
            state.status = 'update-succeed'
            console.log(action.payload)
            state.projects = state.projects.map(project => project.id == action.payload.id ? {id : action.payload.id , ...action.payload.newProjectObj} : project)
            state.err = null
        })

        build.addCase(editProject.pending, (state, action) => {
            state.status = 'updating'
            state.err = null
        })

        build.addCase(editProject.rejected, (state, action) => {
            toast.dismiss(action.payload.toastId)
            toast.error(action.error.message)
            state.status = 'update-failed'
            state.err = action.error.message
        })

        // remove Project
        build.addCase(removeProject.fulfilled, (state, action) => {
            toast.dismiss(action.payload.toastId)
            toast.success('Project removed successfully')
            state.status = 'remove-succeed'
            console.log(action.payload)
            state.projects = state.projects.filter(project => project.id != action.payload.id)
            state.err = null
        })

        build.addCase(removeProject.pending, (state, action) => {
            state.status = 'removing'
            state.err = null
        })

        build.addCase(removeProject.rejected, (state, action) => {
            toast.dismiss(action.payload.toastId)
            toast.error(action.error.message)
            state.status = 'remove-failed'
            state.err = action.error.message
        })
    }
})

export default slice.reducer