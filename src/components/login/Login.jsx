import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { toast, Toaster } from 'react-hot-toast';
import { enviarDatosLogin } from '../../api/direcciones';
import { sani, validacionLogin } from '../../utils/validaciones';
import { useDispatch } from "react-redux";
import { addUser } from '../../features/userSlice';
import { perfil } from '../../api/user.direcciones';
import Cookies from 'universal-cookie';
const Login = () => {
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const loginInicial = {
        email: "admin123456@gmail.com",
        password: "asdASD1*",
    };
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState(loginInicial);
    const [showPass, setShowPass] = useState(false);
    const [close, setClose] = useState(false);

    const showPassButton = () => {
        if (showPass) {
            setShowPass(false);
            return
        }
        setShowPass(true);
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setLogin((old) => ({ ...old, [name]: value }))
    }
    const enviar = async () => {
        setLoading(false);
        const mensaje = validacionLogin(login);
        if (mensaje !== null) {
            toast.error(mensaje, {
                duration: 4000,
            });
            setLoading(true);

            return
        }
        sani(login);
        const res = await enviarDatosLogin(login);
        if (res.error !== undefined) {
            toast.error(res.error, {
                duration: 4000,
            });
            setLoading(true);
            return
        }
        const { token, refreshToken, expiresIn } = res;

        cookies.set("refreshToken",refreshToken,{
            path:"/",
            httpOnly:true,
            //secure:true,
        })
        toast.success("Login con exito", {
            duration: 4000,
        });
        const usuario = await perfil(token, "GET", "perfil");
        setLoading(true);
        setClose(true);
        dispatch(addUser({usuario, token}));
        
    }
    return (
        <div hidden={close}>
            <Modal.Header closeButton className='bg-navbar'>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex flex-column'>
                    <input className='mb-2 rounded-3' type="email" name="email" value={login.email} onChange={handleOnChange} placeholder='email...' />
                    <div className="input-group mb-3">
                        <input className='mb-2 rounded-3 form-control' type={`${showPass ? "text" : "password"}`} name="password" value={login.password} onChange={handleOnChange} placeholder='password...' />
                        <div className="input-group-append">
                            <button className="btn btn-secondary " onClick={showPassButton} type="button"><i className={`${showPass ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}`}></i></button>
                        </div>
                    </div>

                    {loading ? <button className='btn btn-success' onClick={enviar}>Ingresar</button> : <h5 className='text-center'>Loading...</h5>}

                </div>
            </Modal.Body>
            <Toaster />
        </div>
    )
}

export default Login
