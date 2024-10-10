import { createSlice } from "@reduxjs/toolkit";

const visualSlice = createSlice({
    name : 'visual',
    initialState :{
        transition : false,
    },
    reducers : {
        setTransition : (state, action)=>{
            state.transition = action.payload
        }
        
    }
})

export const transitionState = state=>state?.visual?.transition
export const { setTransition } = visualSlice.actions

export default visualSlice.reducer