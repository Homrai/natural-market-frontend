import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { marcarPedidoEntregado, mostrarPedidos } from '../../api/pedidos.direcciones'

const ShowPedidos = () => {
  const token=useSelector(state=>state.user.token);
  const [pedidos,setPedidos]=useState([]);
  const [pedidosMostrar,setPedidosMostrar]=useState([]);
  const pedidoObjetoBuscar={
    nombre:"",
    entrega:"",
    pago:"",
  }
  const [objetoBusqueda,setObjetoBusqueda]=useState(pedidoObjetoBuscar);

  const traerPedidos=async ()=>{
    const res = await mostrarPedidos(token);
    setPedidos(res);
    setPedidosMostrar(res);

  }
  useEffect(()=>{
    traerPedidos();
    // eslint-disable-next-line
  },[])

  const filtrarDatos=()=>{
    let pedidoFiltrado = pedidos;
    if (objetoBusqueda.nombre==="" && objetoBusqueda.entrega==="" && objetoBusqueda.pago===""){ 
      setPedidosMostrar(pedidos);
      return 
    }
    if(objetoBusqueda.nombre!==""){
      pedidoFiltrado = pedidoFiltrado.filter((item)=>item.informacionComprador.nombre===objetoBusqueda.nombre);
    }
    if(objetoBusqueda.entrega!==""){
      let entrega=false;
      if (objetoBusqueda.entrega==="entregado") {
        entrega=true;
      }
      pedidoFiltrado = pedidoFiltrado.filter((item)=>item.entregado===entrega);
    }
    if(objetoBusqueda.pago!==""){
      pedidoFiltrado = pedidoFiltrado.filter((item)=>item.estadoCompra===objetoBusqueda.pago);
    }
    setPedidosMostrar(pedidoFiltrado);
    //console.log(pedidoFiltrado);
  }
  const onChangeBusqueda=(e)=>{
    const {value,name,type,checked}=e.target;
    setObjetoBusqueda((old)=>({...old, [name]:type==="checked"?checked:value}));
  }
  const marcarEntrega=async (id)=>{
    const res = await marcarPedidoEntregado(id,token);
    if(res.error!==undefined) return toast(res.error,{duration:4000});
    traerPedidos();
  }
  return (
    <div className='d-flex flex-md-row flex-column px-sm-3'>
      <div className="col-md-4 col-12 bg-success bg-opacity-75 text-light text-start d-flex flex-column align-content-center mt-md-3 rounded-2 pedido-max-show align-self-center me-md-2">
        <div className='border border-1 mt-sm-2 mt-0 rounded border-dark ps-3 ps-1 py-sm-2 py-0 d-flex flex-md-column justify-content-md-start justify-content-between'>
            <h5 className='text-dark'>Estado</h5>
            <div  className=''>
              <input type="radio" id="ningun_pago" name="pago" value="" defaultChecked onChange={onChangeBusqueda}/>
              <label htmlFor="ningun_pago">nada</label>
            </div>
            <div>
              <input type="radio" id="aprobado" name="pago" value="approved" onChange={onChangeBusqueda}/>
              <label htmlFor="aprobado">Aprobado</label>
            </div>
            <div>
              <input type="radio" id="pendiente" name="pago" value="in_process" onChange={onChangeBusqueda}/>
              <label htmlFor="pendiente">Pendiente</label>
            </div>
            <div  className='me-sm-3'>
              <input type="radio" id="rechazado" name="pago" value="rejected" onChange={onChangeBusqueda}/>
              <label htmlFor="rechazado">Rechazado</label>
            </div>
        </div>
        <div className='border border-1 mt-sm-2 mt-0 rounded border-dark ps-3  py-sm-2 py-0  d-flex flex-md-column justify-content-md-start justify-content-between'>
            <h5 className='text-dark'>Entrega</h5>
            <div  className=''>
              <input type="radio" id="entrega" name="entrega" value="" defaultChecked onChange={onChangeBusqueda}/>
              <label htmlFor="ningun_pago">nada</label>
            </div>
            <div>
              <input type="radio" id="entregado" name="entrega" value="entregado" onChange={onChangeBusqueda}/>
              <label htmlFor="entregado">Entregado</label>
            </div>
            <div className='me-5'>
              <input type="radio" id="pendiente"  name="entrega" value="pendiente" onChange={onChangeBusqueda}/>
              <label  htmlFor="pendiente">Sin entregado</label>
            </div>
        </div>
        <div className='mt-sm-2 mt-0 rounded ps-3  py-sm-2 p-0  d-flex flex-md-column'>
            <h5 className='text-dark'>Nombre comprador</h5>
              <input type="text" className='rounded-1 ms-md-0 ms-sm-3' name="nombre" value={objetoBusqueda.nombre} onChange={onChangeBusqueda}/>
        </div>          
              <button className='btn btn-primary my-sm-3 my-1 mx-5' onClick={filtrarDatos}>Buscar</button>   
      </div>
      <div className="col-md-8 col-12 d-flex flex-column mt-md-3 p-2 border border-3 rounded-3 overflow-scroll bg-navbar pedido-max-show">
        {pedidosMostrar?pedidosMostrar.map((pedido,index)=>(
          <div key={"mostrarPedidosCompleto"+index} className="row border border-3 rounded-3 mx-2 bg-secondary mb-1">
            <div className='col-4 overflow-scroll'>
              <label htmlFor="orden">Orden:</label>
              <p className="text-light" id="orden">{pedido._id}</p>
              <label htmlFor="cli">Cliente:</label>
              <p className="text-light" id="cli">{pedido.informacionComprador.nombre}</p>
              <label htmlFor="fe">Fecha entrega:</label>
              <p className="text-light" id="fe">{pedido.fechaEntrega.fecha}</p>
            </div>
            <div className='col-4'>
              <label htmlFor="dir">Direccion:</label>
              <p className="text-light" id="dir">{pedido.informacionComprador.direccion}</p>
              <label htmlFor="tel">Telefono:</label>
              <p className="text-light" id="tel">{pedido.informacionComprador.telefono}</p>
              <label htmlFor="total">Total:</label>
              <p className="text-light" id="total">{pedido.precioCompra}</p>
            </div>
            <div className='col-4'>
              <label htmlFor="estado">Estado:</label>
              <p className={`${pedido.estadoCompra==="approved"?"text-success":""}${pedido.estadoCompra==="rejected"?"text-danger":""}${pedido.estadoCompra==="in_process"?"text-warning":""}`} id="estado">{pedido.estadoCompra}</p>
              <label htmlFor="tp">Tpo pago:</label>
              <p className="text-light" id="tp">{pedido.tipoPago}</p>

              <label htmlFor="entregado">Entregado:</label>
              {pedido.entregado?
              <p className="text-success" id="entregado">Entregado</p>:
              <div className='d-flex flex-lg-row flex-column align-items-lg-baseline justify-content-start align-content-center'>
                  <p className="text-danger" id="entregado">No entregado</p>
                  {pedido.estadoCompra==="approved"?
                  <button className="btn btn-success p-0 mb-1" onClick={()=>marcarEntrega(pedido._id)}>Marcar Entregado</button>
                  :""}
              </div>
              }
              
            </div>
          </div>
        )):<h1>No hay pedidos disponibles</h1>
      }
      </div>
    </div>
  )
}

export default ShowPedidos