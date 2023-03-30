import { createSlice } from "@reduxjs/toolkit";
const valorInitialState=[];
const productoSlice= createSlice({
    name:"productos",
    initialState:valorInitialState,
    reducers:{
        addproductos:(state,action)=>{
            action.payload.map((item,index)=>state[index]=item);
        },
    },
});

export const {addproductos}=productoSlice.actions;

export default productoSlice.reducer;