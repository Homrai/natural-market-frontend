import { createSlice } from "@reduxjs/toolkit";
const valorInitialState={
    uid:"",
    email:"",
    nombre:"",
    token:"",
    direccion:"",
    telefono:"",
    usuario:"",
};
const userSlice= createSlice({
    name:"user",
    initialState:valorInitialState,
    reducers:{
        addUser:(state,action)=>{
            if(action.payload.usuario.nombre===false){
                return state=valorInitialState;
            }
            state.uid=action.payload.usuario.id;
            state.email=action.payload.usuario.email;
            state.nombre=action.payload.usuario.nombre;
            state.token=action.payload.token;
            state.direccion=action.payload.usuario.direccion;
            state.telefono=action.payload.usuario.telefono;
            state.usuario=action.payload.usuario.usuario;
        },
    },
});

export const {addUser}=userSlice.actions;

export default userSlice.reducer;