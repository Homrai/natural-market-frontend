const dominio = "https://natural-market-homrai.vercel.app/pedido/";
export const pedidos= async (token, metodo, dir, registroDatos)=>{
    try {
        const datos = 
        await fetch(dominio+dir, {
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
        if(!datos.ok) return await datos.json()
        const res = await datos.json();
        return res.url
        
    } catch (error) {
        console.log(error);
    }
};

export const mostrarPedidosUsuario= async (token, id)=>{
    try {
        const datos = await fetch(dominio+`pedidouser/${id}`, {
            method: `GET`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
        });
        if(!datos.ok) return await datos.json()
        const res = await datos.json();
        return res.pedidos
        
    } catch (error) {
        console.log(error);
    }
};

export const mostrarPedidos= async (token)=>{
    try {
        const datos = await fetch(dominio+`pedidoadmin`, {
            method: `GET`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
        });
        if(!datos.ok) return await datos.json()
        const res = await datos.json();
        return res.pedidos
        
    } catch (error) {
        console.log(error);
    }
};

export const marcarPedidoEntregado= async (id,token)=>{
    try {
        const datos = await fetch(dominio+`pedidoadmin/${id}`, {
            method: `PUT`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
        });
        if(!datos.ok) return await datos.json()
        const res = await datos.json();
        return res
        
    } catch (error) {
        console.log(error);
    }
}
