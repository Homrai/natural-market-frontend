import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductos } from '../../api/productos.direcciones';
import { addproductos } from '../../features/productoSlice';
import subirImagen from "../../images/descarga.png";
import { sani, validacionAgregarProducto } from '../../utils/validaciones';

const ProductosAgregar = () => {
    const { token } = useSelector(state => state.user);
    const productos = useSelector(state => state.productos);
    const dispatch =useDispatch();

    const initialStateProducto = {
        nombre: "papa",
        precio: "200",
        cantidad: "50",
        descripcion: "pastusa",
    };
    const [producto, setProducto] = useState(initialStateProducto);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const maxNumber = 5;

    const handleOnChangeImages = (imageList) => {
        setImages(imageList);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name==="precio") {
            if(value>1000000) return            
        }
        if (name==="cantidad") {
            if(value>500) return            
        }
        setProducto((old) => ({ ...old, [name]: value }));
    }
    const mensajeError = (e) => {
        if (e.maxNumber)
            return toast.error("El numero maximo de imagenes por producto 5", {
                duration: 4000,
            });
        if (e.acceptType)
            return toast.error("Solo se admiten imagenes", {
                duration: 4000,
            });
        if (e.maxFileSize)
            return toast.error("El tamaño maximo admitido por imagen es de 10mb", {
                duration: 4000,
            });
        if (e.resolution)
            return toast.error("El archivo seleccionado no coincide con la resolución deseada", {
                duration: 4000,
            });
    };

    const enviarProducto = async () => {
        setLoading(false);
        const mensaje = validacionAgregarProducto(producto);
        if (mensaje !== null) {
            setLoading(true);
            return toast.error(mensaje, {
                duration: 4000,
            });
        }
        delete producto.path;
        sani(producto);
        if (images.length === 0) {
            setLoading(true);
            return toast.error("No ha agregado ninguna imagen", {
                duration: 4000,
            });
        }
        const path = images.map((imagen) => {
            return imagen.data_url
        });
        producto.path = path;

        const res = await obtenerProductos(token, "POST", "add", producto);
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
            setProducto(initialStateProducto);
            setImages([]);
            setLoading(true);
            let productosArrayNuevo=productos.map((item)=>item);
            productosArrayNuevo.push(res.producto);
            dispatch(addproductos(productosArrayNuevo));
            return toast.success("Se agrego el producto con exito", {
                duration: 4000,
            });
        }
    }

    return (
        <div className='bg-personalizado text-light rounded-3 shadow-box'>
            <h5>Nombre:</h5><input maxLength={30} className='input-group rounded-3 my-2 ps-3' type="text" name='nombre' value={producto.nombre} onChange={handleOnChange} placeholder="Ingrese el nombre del producto..." />
            <h5>Precio Unidad:</h5><input maxLength={10} className='input-group rounded-3 my-2 ps-3' type="number" name='precio' value={producto.precio} onChange={handleOnChange} placeholder="Ingrese el precio por unidad del producto..." />
            
            <h5>Cantidad:</h5><input className='input-group rounded-3 my-2 ps-3' type="number" name='cantidad' value={producto.cantidad} onChange={handleOnChange} placeholder="Ingrese la cantidad de productos..." maxLength="4" />
            <h5>Descripcion:</h5><input maxLength={150} className='input-group rounded-3 my-2 ps-3' type="text" name='descripcion' value={producto.descripcion} onChange={handleOnChange} placeholder="Ingrese la descripcion del producto..." />
            <ImageUploading
                name="images"
                multiple
                value={images}
                onChange={handleOnChangeImages}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                accept="image/*"
                maxFileSize={10000000}
                onError={mensajeError}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <div className="upload__image-wrapper mt-2 row">
                        <div className='col-sm-6 col-12 pt-4 d-flex flex-column align-items-center text-center'>
                            <img className='rounded-5' width={150} src={subirImagen} alt=""  {...dragProps} onClick={onImageUpload} />
                            {isDragging ? "suelte las imagenes aqui" : "Arrastre las imagenes del producto"}
                            <button className='btn btn-danger mt-2' onClick={onImageRemoveAll}>Remover imagenes</button>
                        </div>
                        <div className='mt-3 col-sm-6 col-12 '>
                            {imageList.map((image, index) => (
                                <div key={"z" + index} className="my-2 image-item d-flex align-align-items-center justify-content-center bg-dark rounded-3 mx-md-4 mx-2">
                                    <h4>{(index + 1) + ")"}</h4>
                                    <img src={image['data_url']} alt="" width="40" />
                                    <button className='border-0 bg-dark text-success text-decoration-underline me-1' onClick={() => onImageUpdate(index)}>Update</button>
                                    <button className='border-0 bg-dark text-danger text-decoration-underline  ms-1' onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ImageUploading>
            <div className="d-flex justify-content-center">
                {loading ?
                    <button className="my-2 btn btn-success align-self-center" onClick={enviarProducto}>Agregar Producto</button>
                    : <h3>Loading...</h3>
                }
            </div>
            <Toaster />
        </div>
    )
}

export default ProductosAgregar