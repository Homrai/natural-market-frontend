import { configureStore } from "@reduxjs/toolkit";
import pedidoSlice from "../features/pedidoSlice";
import productoSlice from "../features/productoSlice";
import userSlice from "../features/userSlice";

export const store = configureStore({
    reducer:{
        user: userSlice,
        productos: productoSlice,
        pedidos: pedidoSlice,
    },
})