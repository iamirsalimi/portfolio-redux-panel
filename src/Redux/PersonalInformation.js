import { createSlice } from "@reduxjs/toolkit";

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
        pending : true
    },
    reducers : {
        addPersonalInfo : (state , action) => {
            console.log('before update' , action.payload)
            state.personalInformation = {...action.payload}
            console.log('after update ' , action.payload)
        } 
    }
})

export const { addPersonalInfo } = slice.actions
export default slice.reducer