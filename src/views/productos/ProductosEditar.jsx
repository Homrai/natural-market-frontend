import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { borrarProductos, editarProductos, obtenerProductos } from '../../api/productos.direcciones';
import { addproductos } from '../../features/productoSlice';

const ProductosEditar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal,setShowModal]=useState(false);
  const [loading,setLoading]=useState(true);
  const [indice,setIndice]=useState(0);
  const token = useSelector(state=>state.user.token);
  const refrescarProductos = async()=>{
    const res = await obtenerProductos("", "GET", "");
    if (res.productos===undefined) 
        return toast.error("problemas al cargar los productos",{
        duration: 4000,});

        setProductos(res.productos);
    };
  const productosTraer = useSelector(state=>state.productos);
  const [productos,setProductos]=useState(productosTraer);
  const [producto,setProducto]=useState({});


  useEffect(()=>{
    refrescarProductos();
    // eslint-disable-next-line
  },[])

  const borrarProductoBoton =async (e)=>{
    const {value}=e.target;
    const res = await borrarProductos(token,value);
    if(!res.ok) return toast.error("Error al borrar el producto", {
      duration: 4000,
    });
    const productosNuevo = productos.filter((item)=>item._id!==value);
    setProductos(productosNuevo);
    dispatch(addproductos(productosNuevo));
    toast.success(res.msj, {
      duration: 4000,
    });
  }

  const editarProductoBoton= async ()=>{
    setLoading(false);

    if (productos[indice] === producto) {
      setLoading(true);
      return
    }

    const res = await editarProductos(token, producto);
    if (res.msj === "JWT expirado") {
        setLoading(true);
        return toast.error("Porfavor refresque la pagina", {
            duration: 4000,
        });
    }
    if (!res.ok) {
        setLoading(true);
        return toast.error(res.msj, {
            duration: 4000,
        });
    }
    if (res.ok) {
        setProducto({});
        setLoading(true);
        productos[indice]= producto;
        dispatch(addproductos(productos));
        navigate("/")
        return toast.success("Se Edito el producto con exito", {
            duration: 4000,
        });
    }
  }

  const handleClose=()=>{
    setShowModal(false);
  }

  const handleOnChange=(e)=>{
    const {name,value}=e.target;
    setProducto((old)=>({...old, [name]:value}))
  }

  const llamarModal=(e)=>{
    const {value}=e.target;
    setIndice(value);
    const nuevoProducto=productos[value];
    setProducto(nuevoProducto);
    setShowModal(true);

  }


  return (
    <div className='bg-personalizado rounded-4 p-3  editar-productos'>
      {productos.map((item,index)=>(
        <div key={"productosEditar"+index} className='rounded-2 border border-light text-light d-flex align-items-center desbordamiento'>
          <img src={item.imagenes[0]}  alt="" className="col-1 escondido img-producto mx-1" />
          <p className='col-6'>{item.nombre.substr(0,22)}</p>
          <p className='col-1'>{item.cantidad}</p>
          <p className='col-sm-2 col-3'>{"$"+item.precio}</p>
          {/* <p className='col-2 escondido'>{item.descripcion.substr(0, 50)}</p> */}
          <div className="col-2 d-flex justify-content-around align-content-center tam-boton">
            <button className="btn btn-warning bi bi-pencil-fill rounded-circle" value={index} onClick={llamarModal} ></button>
            <button className="btn btn-danger bi bi-trash-fill rounded-circle" value={item._id} onClick={borrarProductoBoton}></button>
          </div>
          <Modal show={showModal} onHide={handleClose}>
              <div className='bg-personalizado text-light mt-sm-5 mt-2 rounded-3 shadow-box'>
                  <h5>Nombre:</h5><input className='input-group rounded-3 my-2 ps-3' type="text" name='nombre' value={producto.nombre} onChange={handleOnChange} placeholder="Ingrese el nombre del producto..." />
                  <h5>Precio Unidad:</h5><input className='input-group rounded-3 my-2 ps-3' type="number" name='precio' value={producto.precio} onChange={handleOnChange} placeholder="Ingrese el precio por unidad del producto..." />
                  <h5>Cantidad:</h5><input className='input-group rounded-3 my-2 ps-3' type="number" name='cantidad' value={producto.cantidad} onChange={handleOnChange} placeholder="Ingrese la cantidad de productos..." maxLength="4" />
                  <h5>Descripcion:</h5><input className='input-group rounded-3 my-2 ps-3' type="text" name='descripcion' value={producto.descripcion} onChange={handleOnChange} placeholder="Ingrese la descripcion del producto..." />
                  <div className="d-flex justify-content-center">
                    {loading?
                      <>
                        <button className="my-2 btn btn-success me-3 align-self-center" onClick={editarProductoBoton}>Editar</button>
                        <button className="my-2 btn btn-danger ms-3 align-self-center" onClick={handleClose}>Cancelar</button>
                      </>:
                        <h1>Loading...</h1>
                    }
                  </div>
              </div>
          </Modal>
        </div>
      ))}
      <Toaster/>
    </div>
  )
}

export default ProductosEditar