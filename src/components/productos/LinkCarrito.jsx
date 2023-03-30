import React, { useState } from 'react'

const LinkCarrito = ({producto}) => {
    const {pedido, productoSelect}=producto;
    const {cantidad}=productoSelect[0];
    const [productoLink,setProductoLink] = useState(pedido);
    const botonMas=()=>{
        setProductoLink((old)=>({...old,[cantidad]:cantidad+1}))
    }
    const botonMenos=()=>{

    }

  return (
    <div className='row ms-1 mt-1 text-light'>
        <div className="col-3 border border-light text-center my-1 d-flex justify-content-center align-items-center">
            <img src={productoLink.imagen} width={70} alt="" />
        </div>
        <div className="col-6">
            <h6>{productoLink.nombre}</h6>
            <p>{"$"+productoLink.precioTotal}</p>
        </div>
        <div className="col-2 text-center">
            <button className='bi bi-trash rounded-circle bg-danger text-white px-2 py-1'></button>
        </div>
        <div className='col-3'></div>
        <div className="col-8 ms-2 d-flex justify-content-between border border-light rounded-4 align-items-center">
            <button className='bg-dark text-danger border-0' disabled={productoLink.cantidad===0} onClick={botonMenos}>-</button>
            <h6 className='pt-1'>{productoLink.cantidad+"Und"}</h6>
            <button className='bg-dark text-success me-2 border-0' disabled={productoLink.cantidad>=cantidad} onClick={botonMas}>+</button>
        </div>
    </div>
  )
}

export default LinkCarrito