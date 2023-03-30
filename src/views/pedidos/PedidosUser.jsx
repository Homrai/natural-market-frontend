import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { mostrarPedidosUsuario } from '../../api/pedidos.direcciones';
import DetallesPedido from '../../components/pedidos/DetallesPedido';

const PedidosUser = () => {
  const datosUsuario = useSelector(state=>state.user);
  const [usuario,setUsuario]=useState(datosUsuario);
  const [pedidos,setPedidos]=useState([]);
  const [detalles,setDetalles]=useState({});
  const [showDetallesCompra,setShowDetallesCompra]=useState(false);
  const {token,uid}=usuario;
  const navigate = useNavigate();

  const traerPedidos= async ()=>{
    if (usuario===undefined) return navigate("/");
    const res = await mostrarPedidosUsuario(token,uid);
    if (res.error!==undefined) return toast("Problema al cargar los pedidos",{duration:4000})
    setPedidos(res);
  }
  useEffect(()=>{
    setUsuario(datosUsuario);
    traerPedidos();
    // eslint-disable-next-line
  },[datosUsuario])

  const handleClose=()=>{
    setShowDetallesCompra(false);
  }
  const detallesPedidoClick=(index)=>{
    setDetalles(pedidos[index].itemsComprados);
    setShowDetallesCompra(true);
  }
  return (
    <div className='row max-height-pedidouser'>
      {pedidos.map((pedido,index)=>(
        <div key={"pedidosUsuario"+index} className="mt-1 col-xxl-4 col-md-6 bg-personalizado text-light rounded-4 p-3 border border-1 border-light">
          <h6>Orden pedido: {pedido._id}</h6>
          <p>Compra: {pedido.estadoCompra}</p>
          <p>Fecha de entrega: {pedido.fechaEntrega.fecha}</p>
          <p>Direccion: {pedido.informacionComprador.direccion}</p>
          <p>Estado entrega: {pedido.entregado?"Entregado":"Pendiente"}</p>
          <p>Total compra: {pedido.precioCompra}</p>
          <p className="btn btn-warning border border-0" onClick={()=>detallesPedidoClick(index)}>DetallesCompra</p>         
        </div>
      ))}
      <Modal show={showDetallesCompra} onHide={handleClose} className="mt-5">
        <DetallesPedido pedido={detalles}/>
      </Modal>
    </div>
  )
}

export default PedidosUser