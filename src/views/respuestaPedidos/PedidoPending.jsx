import React from 'react'
import { Link } from 'react-router-dom'

const PedidoPending = () => {
  return (
    <div className='text-success bg-warning text-center rounded-4 border border-secondary shadow-box border-5  text-light mt-5 p-5'>
    <h1>Pendiente</h1>
    <h4 className='mt-5'>Su pedido esta pendiente por programar, estamos esperando la confirmacion del pago 🤔</h4>
    <Link to={"/"} className='btn btn-primary mt-3'>Aceptar</Link>
  </div>
  )
}

export default PedidoPending