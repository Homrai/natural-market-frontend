import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useEffect, useState } from 'react'
import Login from '../login/Login';
import Modal  from 'react-bootstrap/Modal';
import Signup from '../login/Signup';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../api/direcciones';
import { toast, Toaster } from 'react-hot-toast';
import { addUser } from '../../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import CarritoCompras from '../productos/CarritoCompras';


const Navegador = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [botonProductos, setBotonProductos] = useState(false);

  const [user, setUser] = useState("");
  const [tipo, setTipo] = useState("");

  const navigate = useNavigate();
  const userRefresh = useSelector(state=>state.user);
 
  useEffect(() => {
    setUser(userRefresh.nombre);
    setTipo(userRefresh.usuario);
  }, [userRefresh])
  
  const dispatch =useDispatch();
  const handleClose = () => {
    return (
      setShowRegister(false),
      setShowLogin(false)
  )};

  const handleOnLogin=()=>{
    setShowLogin(true);
  }
  const handleOnSignup=()=>{
    setShowRegister(true);
  }

  const handleOnLogout= async ()=>{
    const ok = await logout();
    if (ok) {
        toast.success("Cerraste sesion con exito",{
          duration: 4000,
        });
        let usuario={nombre:false}
        dispatch(addUser({usuario}));
        navigate("/");
    }
  }
  return (
    <>
      <Navbar variant="dark" expand={false} className="d-flex justify-content-end bg-navbar">
        <Container>
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-false`} className="h-75" aria-labelledby={`offcanvasNavbarLabel-expand-false`} placement="end">
            <CarritoCompras/>
          </Navbar.Offcanvas>
          <Navbar.Brand className="d-flex justify-content-between w-100 ">
            <Link to={"/"} className='text-decoration-none text-warning text-logo'>
              <div className='d-flex align-items-center'>
                <img src="/images/logo.jpg" className='rounded-circle me-1' width={50} alt="" />
                <h1>Natural Market</h1>
              </div>
              </Link>    
          <div id="basic-navbar-nav" placement="end" className='d-flex flex-row me-3'>
              {user===""||user===false?
                  <div className='d-flex flex-row align-items-end'>
                      <button className='btn btn-outline-warning ' onClick={handleOnLogin}>Login</button>
                      <button onClick={handleOnSignup} className='align-self-end bg-dark bg-opacity-25 rounded-4 text-primary text-decoration-underline border-0'>Signup</button>
                  </div>:
                  <div className="text-light align-self-start">
                    <NavDropdown title={user} id="basic-nav-dropdown" className='ms-auto'>
                        {tipo==="user"?
                          <div className='d-flex flex-column align-items-baseline'>
                            <Link className='btn border border-0' to="/perfil">Perfil</Link>
                            <Link className='btn border border-0' to="/pedidosuser">Pedidos</Link>
                          </div>:
                          <div className='d-flex flex-column align-items-start'>
                            <p
                              className='btn border border-0 pb-0 mb-0'
                              onClick={() => setBotonProductos(!botonProductos)}
                              aria-controls="example-collapse-text"
                              aria-expanded={botonProductos}>
                              Productos
                            </p>
                            <Collapse in={botonProductos}  dimension="width">
                              <div>
                                    <div className='d-flex flex-column align-items-start'  id="example-collapse-text">
                                        <Link className='btn border border-0 ms-3' to="/agregarproducto">Agregar</Link>  
                                        <Link className='btn border border-0 ms-3' to="/editarproducto">Editar</Link>                  
                                    </div>
                              </div>
                            </Collapse>
                            
                            <Link className='btn border border-0' to="/mostrarpedido">Pedidos</Link>  
                          </div>
                          
                        }
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                            <button onClick={handleOnLogout} className='align-self-sm-end align-self-center bg-white text-primary text-decoration-underline border-0'>Cerrar sesion</button>
                        </NavDropdown.Item>
                      </NavDropdown>
                  </div>
              }

          </div>
          {userRefresh.usuario==="Administrador"?"":
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} className={`bi bi-cart4 carrito-position boton-carrito text-dark d-flex align-items-center justify-content-center rounded-circle border border-4 border-dark`}/>
          }
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Modal show={showLogin} onHide={handleClose}>
        <Login/>
      </Modal>
      <Modal show={showRegister} onHide={handleClose}>
        <Signup/>
      </Modal>
      <Toaster/>
    </>
  )
}

export default Navegador