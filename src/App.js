import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import { cargarDatosRefresh, refreshPagina } from './api/direcciones'
import { getProductos } from './api/productos.direcciones'
import ErrorComponente from './components/ErrorComponente'
import { ProtegerRutas } from './components/inicio/Autenticador'
import Navegador from './components/inicio/Navegador'
import { addproductos } from './features/productoSlice'
import { addUser } from './features/userSlice'
import ConfirmarPedido from './views/pedidos/ConfirmarPedido'
import PedidosUser from './views/pedidos/PedidosUser'
import ShowPedidos from './views/pedidos/ShowPedidos'
import Perfil from './views/Perfil'
import ProductosAgregar from './views/productos/ProductosAgregar'
import ProductosEditar from './views/productos/ProductosEditar'
import ProductosTienda from './views/productos/ProductosTienda'
import PedidoPending from './views/respuestaPedidos/PedidoPending'
import PedidoRejected from './views/respuestaPedidos/PedidoRejected'
import PedidoSuccess from './views/respuestaPedidos/PedidoSuccess'

import Cookies from 'universal-cookie';

const App = () => {
  const cookies = new Cookies();
  const dispatch=useDispatch();
  const user = useSelector(state=>state.user);
  const traerProductos= async ()=>{
    const {productos} = await getProductos();
    dispatch(addproductos(productos))
  };
  const refrescarDatos= async ()=>{
    const refreshToken=cookies.get("refreshToken", {doNotParse:true})
    console.log(refreshToken);
    const datos = await refreshPagina(refreshToken);
    const {token, uid} = datos;
    const usuario = await cargarDatosRefresh(token,uid);
    if (!usuario.nombre) return
    dispatch(addUser({usuario,token}));
  }
  useEffect(() => {
    traerProductos();
    refrescarDatos();
    //cookies.set("refreshToken","token",{path:"/"})
    // eslint-disable-next-line
  },[])
  
  return (
    <>
        <BrowserRouter>
          <Navegador/>
          <div className="bg-dark">
            <div className='bg-body container'>
              <Routes>
                  <Route path='/' element={<ProductosTienda/>} />
                  <Route element={<ProtegerRutas isAllowed={!!user}/>}>
                      <Route path='/perfil' element={<Perfil />} />
                      <Route path='/pedidosuser' element={<PedidosUser />} />
                      <Route path='/successpedido' element={<PedidoSuccess />} /> 
                      <Route path='/rejectedpedido' element={<PedidoRejected />} /> 
                      <Route path='/pendingpedido' element={<PedidoPending />} /> 
                      <Route path='/confirmarpedido' element={<ConfirmarPedido />} /> 
                  </Route>
                  <Route element={<ProtegerRutas  isAllowed={!!user && user.usuario==="Administrador"}/>}>
                      <Route path='/agregarproducto' element={<ProductosAgregar />} />
                      <Route path='/editarproducto' element={<ProductosEditar />} /> 
                      <Route path='/mostrarpedido' element={<ShowPedidos />} />
                  </Route>
                  <Route path='*' element={<ErrorComponente />} /> 

              </Routes>
            </div>
          </div>
        </BrowserRouter>
    </>
  )
}

export default App