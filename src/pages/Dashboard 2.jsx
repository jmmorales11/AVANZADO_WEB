import { auth } from "../config/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import instancia from "../../Backend/instancia";
import { Link } from 'react-router-dom';


const Registration = () => {
  const navigate = useNavigate();

  const [producto, setProducto] = useState('');
  const [codigo, setCodigo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [result, setResult] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const logOut = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro de cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí",
      });

      if (result.isConfirmed) {
        await signOut(auth);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const postDataHandler = (e) => {
    e.preventDefault();
    const Data = {
      producto,
      codigo,
      cantidad
    };

    if (editingProduct) {
      // Si se está editando un producto, enviar una solicitud PUT
      instancia.put(`/Productos/${editingProduct.id}.json`, Data)
        .then(response => {
          console.log(response);
          fetchProductos(); // Volver a cargar los datos
          setEditingProduct(null); // Limpiar el estado de edición
          clearForm(); // Limpiar el formulario
        })
        .catch(error => {
          console.error('Error al editar producto:', error);
        });
    } else {
      // Si no se está editando, enviar una solicitud POST para agregar un nuevo producto
      instancia.post('/Productos.json', Data)
        .then(response => {
          console.log(response);
          fetchProductos(); // Volver a cargar los datos
          clearForm(); // Limpiar el formulario
        })
        .catch(error => {
          console.error('Error al agregar producto:', error);
        });
    }
  };

  const deleteProductHandler = (id) => {
    instancia.delete(`/Productos/${id}.json`)
      .then(response => {
        console.log(response);
        fetchProductos(); // Volver a cargar los datos
      })
      .catch(error => {
        console.error('Error al eliminar producto:', error);
      });
  };

  const editProductHandler = (id) => {
    // Buscar el producto en el resultado y cargar sus datos en el formulario
    const productToEdit = result.find(product => product.id === id);
    setProducto(productToEdit.producto);
    setCodigo(productToEdit.codigo);
    setCantidad(productToEdit.cantidad);
    setEditingProduct(productToEdit);
  };

  // Función para limpiar el formulario
  const clearForm = () => {
    setProducto('');
    setCodigo('');
    setCantidad('');
  };

  // Función para recuperar los productos desde el servidor
  const fetchProductos = () => {
    instancia.get('/Productos.json')
      .then(response => {
        console.log(response.data);
        const fetchedProductos = [];
        for (let key in response.data) {
          fetchedProductos.unshift({
            ...response.data[key],
            id: key
          });
        }
        setResult(fetchedProductos);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  };

  // Cargar los productos cuando el componente esté montado
  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container mt-2">
      <div className="salir">
        <button className="btn btn-danger" onClick={logOut}>
          Salir
        </button>
      </div>
      <h2 className="text-center mb-4">Lista de Películas</h2>

      <form className="mb-4 formulario" onSubmit={postDataHandler}>
        <div className="mb-3">
          <label className="form-label">Nombre Producto:</label>
          <input type="text" name="producto" className="form-control" value={producto} onChange={(e) => setProducto(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Codigo:</label>
          <input type="text" name="codigo" className="form-control" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Cantidad:</label>
          <input type="text" name="cantidad" className="form-control" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">
          {editingProduct ? "Editar Producto" : "Agregar Producto"}
        </button>
      </form>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Codigo</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {result.map(producto => (
            <tr key={producto.id}>
              <td>{producto.producto}</td>
              <td>{producto.codigo}</td>
              <td>{producto.cantidad}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => editProductHandler(producto.id)}>Editar</button>
                <button className="btn btn-danger" onClick={() => deleteProductHandler(producto.id)}>Eliminar</button>
                <Link to={`/historial/${producto.producto}/${producto.codigo}`} className="btn btn-danger">Ver Historial</Link>

                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Registration;
