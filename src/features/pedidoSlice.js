import { createSlice } from "@reduxjs/toolkit";

const valorInitialState=JSON.parse(localStorage.getItem('listaProductos'))||[];
const pedidoSlice = createSlice({
    name:"pedidos",
    initialState:valorInitialState,
    reducers:{
        addpedido:(state,action)=>{
            action.payload.map((item,index)=>state[index]=item);
        },
    },
});

export const {addpedido}=pedidoSlice.actions;

export default pedidoSlice.reducer;