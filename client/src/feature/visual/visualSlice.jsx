import { createSlice } from "@reduxjs/toolkit";

const visualSlice = createSlice({
    name : 'visual',
    initialState :{
        transition : false,
        modal : false
    },
    reducers : {
        setTransition : (state, action)=>{
            state.transition = action.payload
        },
        showHideModal : (state, action)=>{
            state.modal = action.payload
        },
        
    }
})

export const transitionState = state=>state?.visual?.transition
export const modalState = state=>state?.visual?.modal

export const { setTransition, showHideModal } = visualSlice.actions

export default visualSlice.reducer