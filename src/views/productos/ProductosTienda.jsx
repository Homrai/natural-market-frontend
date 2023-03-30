import React from 'react'
import { useSelector } from 'react-redux'
import LinkProducto from '../../components/productos/LinkProducto';
const ProductosTienda = () => {
  const productos = useSelector(state => state.productos);
  return (
    <div className='row pb-4'>
      {productos.map((item, index) => {
        return <LinkProducto key={"producto" + index} producto={item} />
      })}
    </div>
  )
}

export default ProductosTienda