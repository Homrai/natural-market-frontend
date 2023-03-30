import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap';
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { pedidos } from '../../api/pedidos.direcciones';
import { addpedido } from '../../features/pedidoSlice';
import { obtenerFecha } from '../../utils/fechas';

const ConfirmarPedido = () => {
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();
  const location = useLocation();
  let datos = location.state;
  const { usuario, total, pedido } = datos;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  usuario.token = token;

  //fecha
  const fecha = {
    fecha: "",
    hora: "10:00",
  }
  const { fechaMinima, fechaMaxima } = obtenerFecha();
  const [fechaEntrega, setFechaEntrega] = useState(fecha);

  const cambiarFecha = (e) => {
    const { value, name } = e.target;
    setFechaEntrega((old) => ({ ...old, [name]: value }));
  }

  const realizarCompra = async () => {
    setLoading(true);
    if (fechaEntrega.fecha === "") {
      setLoading(false);
      return toast.error("porfavor ingresa la fecha para entregar", {
        duration: 4000,
      });
    }
    const res = await pedidos(usuario.token, "POST", "", { pedido, usuario, total, fechaEntrega });
    if (res.error !== undefined) {
      setLoading(false);
      return toast.error("Problema al generar el pedido", {
        duration: 4000,
      });
    }
    localStorage.setItem('listaProductos', JSON.stringify([]));
    dispatch(addpedido([]));
    setLoading(false);
    window.location.replace(res);
  }

  return (
    <div className='bg-personalizado rounded-3 mt-5 text-light pb-4'>

      <div className='ps-4'>
        <h3>Datos cliente</h3>

        <h4>Nombre:</h4><input type="text" value={usuario.nombre} className='px-3 ms-3 input-group w-75 rounded-3 bg-dark text-light mb-3' disabled />
        <h4>Direccion:</h4><input type="text" value={usuario.direccion} className='px-3 ms-3 input-group w-75 rounded-3 bg-dark text-light mb-3' disabled />
        <h4>Telefono:</h4><input type="text" value={usuario.telefono} className='px-3 ms-3 input-group w-75 rounded-3 bg-dark text-light mb-3' disabled />
      </div>
      <button
        className='btn btn-warning ms-sm-5 ms-3'
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}>
        Pedido
      </button>
      <Collapse in={open}>
        <div className='row ps-4 pb-5' id="example-collapse-text">
          {pedido.map((item, index) => (
            <div key={"confirmarPedido" + index} className="row border bg-light text-dark border-dark rounded-4">
              <div className='col-1'><img src={item.imagen} width={30} alt="" /></div>
              <div className='col-sm-3 col-4'>{item.nombre}</div>
              <div className='col-1 text-center'>{item.cantidad}</div>
              <div className='col-3 text-center'>{"$ " + item.precioUnidad}</div>
              <div className='col-3 text-center'>{"$ " + item.precioTotal}</div>
            </div>
          ))}
          <div className="d-flex justify-content-end w-75">
            <div className="mt-2 col-sm-3 col-5 bg-light text-center text-dark rounded-4">
              Total:{total}
            </div>
          </div>
        </div>
      </Collapse>

      <div className="d-flex ms-ms-5 ms-3 pb-5">
        <label htmlFor="start">Seleccione dia de entrega:</label>

        <input type="date" id="start" name="fecha"
          className='form-select-sm ms-sm-5 ms-3 rounded-4'
          onChange={cambiarFecha}
          min={fechaMinima}
          max={fechaMaxima} />
      </div>
      <div className="d-flex ms-ms-5 ms-3 pb-5">
        <label htmlFor="hr">Hora de Entrega:</label>
        <select className="form-select-sm ms-4 rounded-4"
          name="hora" onChange={cambiarFecha}>
          <option defaultValue={"10:00"}>10:00am</option>
          <option value="11:00">11:00am</option>
          <option value="12:00">12:00pm</option>
          <option value="13:00">01:00pm</option>
          <option value="14:00">02:00pm</option>
          <option value="15:00">03:00pm</option>
          <option value="16:00">04:00pm</option>
          <option value="17:00">05:00pm</option>
        </select>
      </div>
      {loading ? <h3>Loading.....</h3> :
        <button className='btn btn-success ms-5' onClick={realizarCompra}>Realizar compra</button>
      }
      <Toaster />
    </div>
  )
}

export default ConfirmarPedido