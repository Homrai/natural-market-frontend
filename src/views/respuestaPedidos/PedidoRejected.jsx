import React from 'react'
import { Link } from 'react-router-dom'

const PedidoRejected = () => {
  return (
    <div className='text-success bg-danger text-center rounded-4 border border-secondary shadow-box border-5  text-light mt-5 p-5'>
    <h1>Error</h1>
    <h4 className='mt-5'>Su pedido no se ha programado, su pago no fue realizado 😫</h4>
    <Link to={"/"} className='btn btn-primary mt-3'>Aceptar</Link>
  </div>
  )
}

export default PedidoRejected