import React, { useState } from 'react'
import { Carousel, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addpedido } from '../../features/pedidoSlice';


const LinkProducto = ({producto}) => {
    const dispatch = useDispatch();
    const [cantidad,setCantidad]=useState(0);
    const [show,setShow] = useState(false);

    const initialState={
        id:producto._id,
        nombre:producto.nombre,
        cantidad: cantidad,
        descripcion:producto.descripcion,
        precioUnidad:producto.precio,
        imagen:producto.imagenes[0],
        precioTotal: Number(producto.precio)*cantidad,
    };
    const agregarProducto=()=>{
        setShow(false);
        let arr = JSON.parse(localStorage.getItem('listaProductos'))||[];
        const verificarElemento = arr.some((item)=>item.id===initialState.id);
        if(verificarElemento){
            const indice = arr.findIndex((item)=>item.id===initialState.id);
            arr[indice]=initialState;
            dispatch(addpedido(arr));
            return localStorage.setItem('listaProductos', JSON.stringify(arr)); 
        }
        arr.push(initialState);
        dispatch(addpedido(arr));
        localStorage.setItem('listaProductos', JSON.stringify(arr));
    }

  return (
    <div className='col-lg-3 col-md-4 col-sm-6 col-12 mt-3 text-light no-seleccionar'>
        <div className='card  h-100 bg-card'  onClick={() => setShow(true)}>
            <h6 className='card-header rounded-3 bg-navbar text-uppercase text-light'>{producto.nombre}</h6>
            <img className='card-img-top' src={producto.imagenes[0]} alt={producto.nombre} />
            <div className="card-body d-flex flex-column align-items-center justify-content-end">
                <h5 className='card-title bg-black bg-opacity-75 rounded-3 w-75 text-center'>${producto.precio}</h5>
                <p className='card-text card-descripcion bg-black bg-opacity-75 rounded-2 w-100 text-center overflow-scroll'>{producto.descripcion}</p>
                <button className='btn btn-success'>Agregar</button>
            </div>
        </div>
        <Modal
            show={show}
            onHide={() => setShow(false)}
            className="bg-dark bg-opacity-50"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton className="bg-header-modal-producto">
            <Modal.Title id="example-custom-modal-styling-title" className='text-uppercase'>
                {producto.nombre}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-card">
                <div className="d-flex flex-column align-items-center">
                    <Carousel fade slide={false} variant="dark">
                        {producto.imagenes.map((imagen,index)=>{
                            return <Carousel.Item key={"imagenProducto"+index} className="p-auto" >
                                <img
                                    width={300}
                                    height={300}
                                    className=""
                                    src={imagen}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        })}
                    </Carousel>
                    <input type="text" className='rounded-3 text-center mt-2 me-2  bg-light bg-opacity-75 text-black' disabled  value={"Total: $"+initialState.precioTotal}/>

                            <div className={`d-flex justify-content-around mt-2 ${producto.cantidad===0?"d-none":""}`}>
                                <button className='btn btn-danger rounded-circle' disabled={cantidad<=0} onClick={()=>setCantidad((old)=>old-1)}>-</button>
                                <input type="text" className='rounded-3 text-center mx-2 bg-light bg-opacity-75 text-black' disabled  value={"Cantidad: "+cantidad}/>
                                <button className='btn btn-success rounded-circle' disabled={cantidad===producto.cantidad} onClick={()=>setCantidad((old)=>old+1)}>+</button>
                            </div>
                            <div className={`d-flex justify-content-around mt-2 ${producto.cantidad!==0?"d-none":""}`}>
                                <button className='btn btn-danger' disabled>Producto agotado</button>
                            </div>
                        
                </div>
            </Modal.Body>
            <Modal.Footer className={`d-flex justify-content-center bg-header-modal-producto ${producto.cantidad===0?"d-none":""}`}>
                <button className='btn btn-outline-success' onClick={agregarProducto} disabled={cantidad===0}>Agregar al carrito</button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default LinkProducto