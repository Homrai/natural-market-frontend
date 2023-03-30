import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast';
import { enviarDatosRegistro } from '../../api/direcciones';
import { sani, validacionRegistro } from "../../utils/validaciones";

const Signup = () => {

    const datosRegistro = {
        email:"",
        password:"",
        repassword:"",
        nombre:"",
        telefono: "",
        direccion:"",
    };

    const [loading, setLoading] = useState(true);
    const [close, setClose] = useState(false);
    const [registro, setRegistro] = useState(datosRegistro);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        value.trim();
        setRegistro((old) => ({ ...old, [name]: value }))

    }

    const handleClose = () => {
        setClose(true);
    }

    const enviar = async () => {
        const mensaje = validacionRegistro(registro);
        if (mensaje !== null)
            return toast.error(mensaje, {
                duration: 4000,
            });
        sani(registro);
        setLoading(false);
        const res = await enviarDatosRegistro(registro);
        if (res === false) {
            setLoading(true);
            toast.error("Error 404: Email en uso", {
                duration: 4000,
            });
            return
        }

        if (res.ok) {
            toast.success(res.msj, {
                duration: 8000,
            });
            setRegistro(datosRegistro);
            setLoading(true);
            handleClose();
            return
        }

        toast.error(res.msj, {
            duration: 4000,
        });
        setLoading(true);
        return
    }
    return (
        <>
            <div hidden={close}>
                <Modal.Header closeButton className='bg-navbar'>
                    <Modal.Title>Registro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex flex-column'>
                        <input className='mb-2 rounded-3' type="email" name="email" value={registro.email} onChange={handleOnChange} placeholder='email...' />
                        <input className='mb-2 rounded-3' type="password" minLength={8} name="password" value={registro.password} onChange={handleOnChange} placeholder='password...' />
                        <input className='mb-2 rounded-3' type="password" name="repassword" value={registro.repassword} onChange={handleOnChange} placeholder='compruebe password...' />
                        <input className='mb-2 rounded-3' type="text" name="nombre" value={registro.nombre} onChange={handleOnChange} placeholder='nombre...' />
                        <input className='mb-2 rounded-3' type="tel" name="telefono" value={registro.telefono} onChange={handleOnChange} placeholder='telefono...' maxLength="14" />
                        <input className='mb-2 rounded-3' type="text" name="direccion" value={registro.direccion} onChange={handleOnChange} placeholder='direccion...' maxLength="50" />
                        {loading ?
                            <button className='btn btn-success' onClick={enviar}>Registrar</button> : <h5 className='text-center'>Loading...</h5>
                        }
                    </div>
                </Modal.Body>
            </div>
            <Toaster />
        </>
    )
}

export default Signup