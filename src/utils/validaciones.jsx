import validator from 'validator'


export const sani =(registro)=>{
    for (let i in registro){
        registro[i]=validator.escape(registro[i]);
    }
    return registro;
};

export const saniUnit =(registro)=>{
    registro=validator.escape();
    return registro;
};

export const validacionRegistro = (registro) => {
    if (validator.isEmpty(registro.email) || validator.isEmpty(registro.password) || validator.isEmpty(registro.repassword) || validator.isEmpty(registro.nombre) || validator.isEmpty(registro.telefono) || validator.isEmpty(registro.direccion)) {
        return 'Error: Rellene todos los campos'
    }
    if (!validator.isEmail(registro.email)) {
        return 'Error email: Formato email incorrecto'
    }
    if (registro.email.includes(" ")) {
        return 'Error email: no se admite espacios vacios'
    }
    if (!validator.isStrongPassword(registro.password)) {
        return 'Error password: minimo 8 caracteres, debe contener mayusculas y minusculas, debe contener por lo menos un numero y un simbolo'
    }
    if (registro.password.includes(" "||"<"||">"||"&"||"'"||"/")) {
        return 'Error password: no se admite espacios vacios ni estos simbolos <, >, &, ", y /'
    }
    if (!validator.equals(registro.password, registro.repassword)) {
        return 'Error password: no coinciden los passwords'
    }
    if (!validator.isNumeric(registro.telefono)) {
        return 'Error telefono: solo numeros'
    }
    if (!validator.isLength(registro.telefono,{min: 7})) {
        return 'Error telefono: telefono no valido'
    }
    return null
};

export const validacionLogin = (registro) => {
    if (validator.isEmpty(registro.email) || validator.isEmpty(registro.password)) {
        return 'Error: Rellene todos los campos'
    }
    if (!validator.isEmail(registro.email)) {
        return 'Error email: Inserte bien los datos'
    }
    if (registro.email.includes(" ")) {
        return 'Error email: no se admite espacios vacios'
    }
    return null
};

export const validacionEditarRegistro = (registro) => {
    if (validator.isEmpty(registro.nombre) || validator.isEmpty(registro.telefono) || validator.isEmpty(registro.direccion)) {
        return 'Error: Rellene todos los campos'
    }
    if (!validator.isNumeric(registro.telefono)) {
        return 'Error telefono: solo numeros'
    }
    if (!validator.isLength(registro.telefono,{min: 7})) {
        return 'Error telefono: telefono no valido'
    }
    return null
};

export const validacionAgregarProducto = (registro) => {
    
    if (validator.isEmpty(registro.nombre) || validator.isEmpty(registro.precio) || validator.isEmpty(registro.cantidad) || validator.isEmpty(registro.descripcion)) {
        return 'Error: Rellene todos los campos'
    }
    if (!validator.isNumeric(registro.precio)) {
        return 'Error precio: solo numeros'
    }
    if (!validator.isNumeric(registro.cantidad)) {
        return 'Error cantidad: solo numeros'
    }
    return null
};

export const validacionEditarProducto = (registro) => {
    if (validator.isEmpty(registro.nombre) || validator.isEmpty(String(registro.precio)) || validator.isEmpty(String(registro.cantidad)) || validator.isEmpty(registro.descripcion)) {
        return 'Error: Rellene todos los campos'
    }
    return null
};