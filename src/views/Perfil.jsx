import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { perfil } from '../api/user.direcciones';
import { addUser} from '../features/userSlice';
import { sani, validacionEditarRegistro } from '../utils/validaciones';

const Perfil = () => {
    const dispatch = useDispatch();
    const initialState = useSelector(state=>state.user);

    const [datosUser,setDatosUser]=useState(initialState);
    const [datosUserEdit,setDatosUserEdit]=useState(initialState);
    const [editar,setEditar]=useState(false);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
      setDatosUser(initialState);
      setDatosUserEdit(initialState);
    },[initialState]);

    const editarInformacion=(e)=>{
      const {value, name}= e.target;
      setDatosUser(old=>({...old, [name]:value}));
    }

    const editarInformacionBoton=()=>{
      setEditar(true);
    }

    const handleCancelar=()=>{
      setEditar(false);
      setDatosUser(datosUserEdit);
    }

    const nadaCambio=()=>{

    }

    const editarSubmit=async ()=>{
      const mensaje = validacionEditarRegistro(datosUser);
      if(mensaje!==null)
        return toast.error(mensaje,{
          duration: 4000,
      });
      if (datosUser===datosUserEdit) {
        setEditar(false);
        return
      }
      sani(datosUser);
      const token = datosUser.token;
      setLoading(false);
      const usuario = await perfil(token,"PUT","editarperfil", datosUser);
      if(usuario===false){
        setLoading(true);
        return toast.error("problemas tecnicos, intentelo mas tarde",{
          duration: 4000,
      });
      };
      setLoading(true);
      setEditar(false);
      toast.success("se han modificado los datos con exito",{
        duration: 4000,
      });
      dispatch(addUser({usuario, token}));
    }

  return (
    <div className='bg-personalizado shadow-box text-light rounded-3 p-sm-5 p-3'>
      <h5>Email: </h5><input type="text" className='input-group rounded-2 text-primary' value={datosUser.email} disabled />
      <h5>Nombre: </h5><input type="text" className='input-group rounded-2' name="nombre" value={datosUser.nombre} onChange={editar?editarInformacion:nadaCambio} />
      <h5>Telefono: </h5><input type="tel"  maxLength="14" className='input-group rounded-2' name="telefono" value={datosUser.telefono} onChange={editar?editarInformacion:nadaCambio} />
      <h5>Direccion: </h5><input type="text" maxLength="50" className='input-group rounded-2' name="direccion" value={datosUser.direccion} onChange={editar?editarInformacion:nadaCambio} />
        {editar?
        <div>
          {loading?
            <>
              <button className='btn btn-success m-3' onClick={editarSubmit}>Confirmar</button>
              <button className='btn btn-danger m-3' onClick={handleCancelar}>cancelar</button>
            </>
            :<h3>Loading...</h3>
          }
          </div>
        :<button className='btn btn-success m-3' onClick={editarInformacionBoton}>Editar Informacion</button>}
    </div>
  )
}

export default Perfil