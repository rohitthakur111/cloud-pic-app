import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWhishItem, saveWhishItem } from "./service";

// find delete image index 
const findIndex = (images,id)=> images.indexOf(id)
    
export const getWhishASync = createAsyncThunk(
    '/get/whish',
    async()=>{
        const data = await getWhishItem()
        return data;
    }
)

// Save Whish Items
export const saveWhishItemAsync = createAsyncThunk(
    '/save/whishitem',
    async(id)=>{
        const data = await saveWhishItem(id)
        return data;
    }
)
   

const whishSlice = createSlice({
    name : "whish",
    initialState : {
        loading : false,
        error : null,
        list : []
    },
    extraReducers : (builder)=>{
        builder
            .addCase(getWhishASync.pending, state=>{
                state.loading = true
                state.error = null
            })
            .addCase(getWhishASync.fulfilled, (state,action)=>{
                state.loading = false
                state.error = null
                state.list = action.payload?.data?.images
            })
            .addCase(getWhishASync.rejected, state=>{
                state.loading = false
            })

            // Save Whish list Item 
            .addCase(saveWhishItemAsync.pending, state=>{
                state.loading = true
                state.error = null
            })
            .addCase(saveWhishItemAsync.fulfilled, (state,action)=>{
                state.loading = false
                state.error = null
                if(action.payload?.data?.image)
                    state.list.push(action.payload?.data?.image)
                else {
                    const index = findIndex(state.list, action.payload.id)
                    if(index >= 0)
                        state.list?.splice(index, 1)
                }
            })
            .addCase(saveWhishItemAsync.rejected, state=>{
                state.loading = false
            })
    } 

})

export const whishLoading = state=> state.whish.loading
export const whishItems = state=> state.whish.list

export default whishSlice.reducer;