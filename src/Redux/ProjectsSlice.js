import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name : 'Projects' , 
    initialState : {
        err : null,
        status : 'idle',
        projects : []
    }
})

export default slice.reducer