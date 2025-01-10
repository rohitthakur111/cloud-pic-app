import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "users",
    initialState : {
        users : [],
        loading : false,
        error : null
    },
    extraReducers : (builder)=>{
        builder
            .addCase()
    }
})