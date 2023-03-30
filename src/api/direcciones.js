const dominio = "https://natural-market.onrender.com/auth/";
export const enviarDatosRegistro= async (registro)=>{
    try {
        const datosRegistro = await fetch(dominio+"register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify(registro),
        });
        console.log(datosRegistro.ok);
        if (!datosRegistro.ok) {
            return datosRegistro.ok
        }
    
        const res = await datosRegistro.json();
        return res
        
    } catch (error) {
        console.log(error);
    }
};

export const enviarDatosLogin= async (login)=>{
    try {
        const datosLogin = await fetch(dominio+"login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify(login),
        });
        const res = await datosLogin.json();
        return res
        
    } catch (error) {
        console.log(error);
    }
};

export const logout= async ()=>{
    try {
        const res = await fetch(dominio+"logout", {
            method: 'GET',
            credentials: "include",
        });
        return res.ok

    } catch (error) {
        console.log(error);
    }
};

export const refreshPagina = async ()=>{
    try {
        const datos = await fetch(dominio+"refresh", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
        });
        if (!datos.ok) return {token:false, nombre:false}

        const {token, uid} = await datos.json();
        return {token, uid};

    } catch (error) {
        console.log(error);
    }
};
export const cargarDatosRefresh = async (token,uid)=>{
    try {
        const datos = await fetch(dominio+`refreshdatos/${uid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
            },
            credentials: "include",
            mode: 'cors', // no-cors, *cors, same-origin
        });
        if (!datos.ok) return {token:false, nombre:false}

        const {usuario} = await datos.json();
        return usuario;

    } catch (error) {
        console.log(error);
    }
};