import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { getPersonalInformation , updatePersonalInformation } from "../Services/Axios/Requests/personalInformations";

export const fetchPersonalInformation = createAsyncThunk(
    'PersonalInformation/getPersonalInformation',
    async (payload , {dispatch , getState}) => {
        return await getPersonalInformation()
    }
)

export const editPersonalInformation = createAsyncThunk(
    'PersonalInformation/addPersonalInformation',
    async (payload , {dispatch , getState}) => {
        console.log(getState() , payload)
        return await updatePersonalInformation(payload)
    }
)

let slice = createSlice({
    name : 'PersonalInformation',
    initialState : {
        personalInformation : {
            fullName : '',
            email : '',
            expertise : '',
            experience : '',
            satisfiedClients : '',
            linkedinLink : '',
            instagramLink : '',
            XLink : '',
            githubLink : '',
            biography : '',
        },
        err: null ,
        status : 'idle' // "idle" , "Loading" , "succeed" and "failed"
    },
    reducers : {
        addPersonalInfo : (state , action) => {
            console.log('before update' , action.payload)
            state.personalInformation = {...action.payload}
            console.log('after update ' , action.payload)
        } 
    },
    extraReducers : builder => {
        // get personal infos
        builder.addCase(fetchPersonalInformation.pending , (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchPersonalInformation.fulfilled , (state , action) => {
            state.personalInformation = {...action.payload.data[0]}
            state.status = 'succeed'
            state.err = false
        })
        builder.addCase(fetchPersonalInformation.rejected , (state , action) => {
            // console.log(action)
            state.personalInformation = []
            state.status = 'failed'
            state.err = action.error.message
            toast.error(action.error.message)
        })
        // edit personal infos
        builder.addCase(editPersonalInformation.pending , (state) => {
            state.status = 'loading'
        })
        builder.addCase(editPersonalInformation.fulfilled , (state , action) => {
            state.personalInformation = {...action.meta.arg}
            state.status = 'succeed'
            state.err = false
            toast.success('infos got updated')
        })
        builder.addCase(editPersonalInformation.rejected , (state , action) => {
            state.personalInformation = []
            state.status = 'failed'
            state.err = action.error.message
            toast.error(action.error.message)
        })
    }
})

export const { addPersonalInfo } = slice.actions
export default slice.reducer