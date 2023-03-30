import { toast } from "react-hot-toast";

const dominio = "https://natural-market.onrender.com/product/";
export const obtenerProductos= async (token, metodo, dir, registroDatos)=>{
    try {
        const datos = await fetch(dominio+dir, {
            method: `${metodo}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify(registroDatos),
        });
        const res = await datos.json();
        return res
        
    } catch (error) {
        return toast.error("Problema al crear el objeto",{
            duration: 4000,
        })
    }
};

export const editarProductos= async (token,registroDatos)=>{
    try {
        const datos = await fetch(dominio+"edit", {
            method: `PUT`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify(registroDatos),
        });
        const res = await datos.json();
        return res
        
    } catch (error) {
        return toast.error("Problema al crear el objeto",{
            duration: 4000,
        })
    }
};

export const borrarProductos= async (token, id)=>{
    try {
        const datos = await fetch(dominio+`borrar/${id}`, {
            method: `DELETE`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
        });
        const res = await datos.json();
        return res
        
    } catch (error) {
        return toast.error("Problema al eliminar el objeto",{
            duration: 4000,
        })
    }
};

export const getProductos= async ()=>{
    try {
        const datos = await fetch(dominio, {
            method: `GET`,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
        });
        const res = await datos.json();
        return res
        
    } catch (error) {
        return toast.error("Problema al crear el objeto",{
            duration: 4000,
        })
    }
};
