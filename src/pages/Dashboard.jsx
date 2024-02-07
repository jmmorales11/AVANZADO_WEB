import { useCRUDLogic } from "../../Backend/crud";
import { MagicMotion } from "react-magic-motion";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    producto,
    codigo,
    cantidad,
    setProducto,
    setCodigo,
    setCantidad,
    postDataHandler,
    result,
    logOut,
    deleteProductHandler,
    editProductHandler,
  } = useCRUDLogic();

  function showAlert() {
    Swal.fire({
      title: "Agregar Producto",
      html: `
        <input type="text" id="swal-producto" class="swal2-input" placeholder="Nombre Producto" value="${producto}">
        <input type="text" id="swal-codigo" class="swal2-input" placeholder="Código" value="${codigo}">
        <input type="number" id="swal-cantidad" class="swal2-input" placeholder="Cantidad" value="${cantidad}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        setProducto(document.getElementById('swal-producto').value);
        setCodigo(document.getElementById('swal-codigo').value);
        setCantidad(document.getElementById('swal-cantidad').value);
      }
    }).then((result) => {
      if (result.isConfirmed) {
        postDataHandler();
      }
    });
  }

  return (
    <MagicMotion>
      <div className="container mt-2">
        <div className="salir">
          <button className="btn btn-danger" onClick={logOut}>
            Salir
          </button>
        </div>

        <h2 className="text-center mb-4">Lista de Productos</h2>
        <button
          className="btn btn-success mb-2 btnAgregarProducto"
          onClick={showAlert}
        >
          Agregar productos
        </button>

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
            {result.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.producto}</td>
                <td>{producto.codigo}</td>
                <td>{producto.cantidad}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => editProductHandler(producto.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProductHandler(producto.id)}
                  >
                    Eliminar
                  </button>
                  <Link
                    to={`/historial/${producto.producto}/${producto.codigo}`}
                    className="btn btn-primary"
                  >
                    Ver Historial
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MagicMotion>
  );
};

export default Dashboard;