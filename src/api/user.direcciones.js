const dominio = "https://natural-market.onrender.com/user/";
export const perfil= async (token, metodo, dir, registroDatos)=>{
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
        if (!datos.ok) return datos.ok
        const res = await datos.json();
        return res.dataUser
        
    } catch (error) {
        console.log(error);
    }
};
