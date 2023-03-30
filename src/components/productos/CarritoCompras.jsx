import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addpedido } from '../../features/pedidoSlice';

const CarritoCompras = () => {  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const datosPedidos = useSelector(state=>state.pedidos);
    const datosProductos = useSelector(state=>state.productos);
    const datosUsuario = useSelector(state=>state.user);
    const [pedido,setPedido]= useState(datosPedidos);
    const [show,setShow]= useState(false);
    const total = pedido.reduce((suma,item)=>Number(suma)+Number(item.precioTotal),"");

    useEffect(()=>{
        let arr = JSON.parse(localStorage.getItem('listaProductos'))||[];
        setPedido(arr);
    },[datosPedidos]);

    const botonMas=(e)=>{
        const {value}=e.target;
        let newPedido=pedido[value];
        let {cantidad}= newPedido;
        newPedido.cantidad=cantidad+1;
        newPedido.precioTotal=newPedido.cantidad*newPedido.precioUnidad;
        let newArrayPedido = pedido.map((item)=>item);
        newArrayPedido[value]=newPedido;
        setPedido(newArrayPedido);
        dispatch(addpedido(newArrayPedido));
        localStorage.setItem('listaProductos', JSON.stringify(newArrayPedido)); 
    }
    const botonMenos=(e)=>{
        const {value}=e.target;
        let newPedido=pedido[value];
        let {cantidad}= newPedido;
        newPedido.cantidad=cantidad-1;
        newPedido.precioTotal=newPedido.cantidad*newPedido.precioUnidad;
        let newArrayPedido = pedido.map((item)=>item);
        newArrayPedido[value]=newPedido;
        setPedido(newArrayPedido);
        dispatch(addpedido(newArrayPedido));
        localStorage.setItem('listaProductos', JSON.stringify(newArrayPedido));
    }

    const eliminarItemCarrito=(e)=>{
        const {value}=e.target;
        let newPedido=pedido[value];
        let newArrayPedido = pedido.filter((item)=>item!==newPedido);
        setPedido(newArrayPedido);
        dispatch(addpedido(newArrayPedido));
        localStorage.setItem('listaProductos', JSON.stringify(newArrayPedido));
    }

    const vaciarCarrito=()=>{
        localStorage.setItem('listaProductos', JSON.stringify([]));
        setPedido([]);
        dispatch(addpedido([]));
        setShow(false);
    }

    const realizarCompra=()=>{
        if (datosUsuario.nombre==="") {
            return toast.error("Porfavor ingresa con tu cuenta para seguir con la compra, o en caso de que no tengas una te invitamos a registrarte", {
                duration: 8000,
            })
        }
        navigate("/confirmarpedido",{
            state:{
                total:total,
                pedido:pedido,
                usuario:datosUsuario,
            }
        })
    }
    
  return (
    <>
        <div className="d-flex flex-column text-light justify-content-between bg-dark overflow-auto px-2 h-100">
                <div className="row my-4 ms-1">
                    <h6 className='col-7'>Carrito de compras</h6>
                    <button className='col-4 text-decoration-underline border-0 bg-dark text-light' disabled={pedido.length===0} onClick={()=>setShow(true)}>vaciar carrito</button>
                </div>
                <div className="d-flex flex-column text-light contenido-carrito">
                    {pedido.map((pedido,index)=>{
                        const productoSelect = datosProductos.filter((producto)=>pedido.id===producto._id);
                        if (productoSelect[0]!==undefined){
                            let {cantidad}= productoSelect[0];
                            return <div key={"linkPedido"+index} className='row ms-1 mt-1 text-light'>
                                <div className="col-3 border border-light text-center my-1 d-flex justify-content-center align-items-center">
                                    <img src={pedido.imagen} width={70} alt="" />
                                </div>
                                <div className="col-6">
                                    <h6>{pedido.nombre}</h6>
                                    <p>{"$"+pedido.precioTotal}</p>
                                </div>
                                <div className="col-2 text-center">
                                    <button className='bi bi-trash rounded-circle bg-danger text-white px-2 py-1' value={index} onClick={eliminarItemCarrito}></button>
                                </div>
                                <div className='col-3'></div>
                                <div className="col-8 ms-2 d-flex justify-content-between border border-light rounded-4 align-items-center">
                                    <button className='bg-dark text-danger border-0' value={index} disabled={pedido.cantidad===0} onClick={botonMenos}>-</button>
                                    <h6 className='pt-1'>{pedido.cantidad+"Und"}</h6>
                                    <button className='bg-dark text-success me-2 border-0' value={index} disabled={pedido.cantidad>=cantidad} onClick={botonMas}>+</button>
                                </div>
                            </div>        
                        }return <div key={"linkPedido"+index}></div>
                    })}
                </div>
                <div className="d-flex flex-column my-3">
                    <div className="d-flex justify-content-between">
                        <h5>Total:</h5>
                        <h5 className='me-2'>{"$"+total}</h5>
                    </div>
                    <button className='btn btn-success mt-2 me-3' onClick={realizarCompra}>Comprar</button>
                </div>
        </div>
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName=""
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title" className='text-uppercase'>
                <h6>¿esta seguro que desea vaciar el carrito de compras?</h6>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-success mx-2 px-5' onClick={vaciarCarrito}>Si</button>
                    <button className='btn btn-danger mx-2 px-5' onClick={()=>setShow(false)}>No</button>
                </div>
            </Modal.Body>
        </Modal>
        <Toaster/>
    </>
  )
}

export default CarritoCompras