import React from 'react'

const DetallesPedido = ({pedido}) => {
  const total = pedido.reduce((sum,item)=>Number(sum)+Number(item.precioTotal),"");
  return (
    <div className='container bg-dark text-light rounded-2'>
        <div className='row text-center bg-navbar'>
            <p className='col-4'>Producto</p>
            <p className='col-2'>Cantidad</p>
            <p className='col-3'>Precio unidad</p>
            <p className='col-3'>Precio total</p>
        </div>
        {pedido.map((producto,index)=>(
            <div key={"productoDetalles"+index} className='bg-light text-dark row text-center rounded-3 my-1'>
                    <p className='col-4'>{producto.nombre}</p>
                    <p className='col-2'>{producto.cantidad}</p>
                    <p className='col-3'>${producto.precioUnidad}</p>
                    <p className='col-3'>${producto.precioTotal}</p>
            </div>
        ))}
        <div className='row text-center bg-navbar'>
            <p className='col-7'></p>
            <p className='col-5 bg-light rounded text-dark mt-1'>Total: ${total}</p>
        </div>
    </div>
  )
}

export default DetallesPedido