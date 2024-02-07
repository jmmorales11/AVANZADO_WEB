import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import instancia from "./instancia";
import { auth } from "../src/config/firebase";
import Swal from "sweetalert2";

export const useCRUDLogic = () => {
  const navigate = useNavigate();
  const [producto, setProducto] = useState("");
  const [codigo, setCodigo] = useState("");
  const [cantidad, setCantidad] = useState("");
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

  const postDataHandler = () => {
    const producto = document.getElementById("swal-producto").value;
  const codigo = document.getElementById("swal-codigo").value;
  const cantidad = document.getElementById("swal-cantidad").value;

    const Data = {
      producto,
      codigo,
      cantidad
    };

    if (editingProduct) {
      // Si se está editando un producto, enviar una solicitud PUT
      instancia
        .put(`/Productos/${editingProduct.id}.json`, Data)
        .then((response) => {
          console.log(response);
          fetchProductos(); // Volver a cargar los datos
          setEditingProduct(null); // Limpiar el estado de edición
          clearForm(); // Limpiar el formulario
        })
        .catch((error) => {
          console.error("Error al editar producto:", error);
        });
    } else {
      // Si no se está editando, enviar una solicitud POST para agregar un nuevo producto
      instancia
        .post("/Productos.json", Data)
        .then((response) => {
          console.log(response);
          fetchProductos(); // Volver a cargar los datos
          clearForm(); // Limpiar el formulario
        })
        .catch((error) => {
          console.error("Error al agregar producto:", error);
        });
    }
  };

  const deleteProductHandler = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este producto?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        instancia
          .delete(`/Productos/${id}.json`)
          .then((response) => {
            console.log(response);
            fetchProductos(); // Volver a cargar los datos
          })
          .catch((error) => {
            console.error("Error al eliminar producto:", error);
            Swal.fire(
              "Error",
              "Hubo un error al eliminar el producto",
              "error",
            ); // Mostrar mensaje de error
          });
      }
    });
  };

  const editProductHandler = (id) => {
    // Buscar el producto en el resultado y cargar sus datos en el formulario
    const productToEdit = result.find((product) => product.id === id);

    Swal.fire({
      title: "Editar Producto",
      html: `
        <input type="text" id="swal-producto" class="swal2-input" placeholder="Nombre Producto" value="${productToEdit.producto}">
        <input type="text" id="swal-codigo" class="swal2-input" placeholder="Código" value="${productToEdit.codigo}">
        <input type="number" id="swal-cantidad" class="swal2-input" placeholder="Cantidad" value="${productToEdit.cantidad}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const editedProducto = document.getElementById("swal-producto").value;
        const editedCodigo = document.getElementById("swal-codigo").value;
        const editedCantidad = document.getElementById("swal-cantidad").value;

        // Validaciones
        if (!editedProducto.trim() || !editedCodigo.trim() || !editedCantidad.trim()) {
          Swal.showValidationMessage("Por favor, completa todos los campos.");
          return false;
        }

        if (!/^\d{6}$/.test(editedCodigo)) {
          Swal.showValidationMessage("El código debe tener exactamente 6 dígitos y ser números.");
          return false;
        }

        // Actualizar el producto
        const updatedProduct = {
          producto: editedProducto,
          codigo: editedCodigo,
          cantidad: editedCantidad,
        };

        instancia
          .put(`/Productos/${id}.json`, updatedProduct)
          .then((response) => {
            console.log(response);
            setEditingProduct(null); // Limpiar el estado de edición
            clearForm(); // Limpiar el formulario
          })
          .then(fetchProductos) // Actualizar la lista de productos
          .then(() => Swal.fire("Producto actualizado", "", "success")) // Mostrar mensaje de éxito
          .catch((error) => {
            console.error("Error al editar producto:", error);
            Swal.fire("Error", "Hubo un error al editar el producto", "error"); // Mostrar mensaje de error
          });
      },
    });
  };

  // Función para limpiar el formulario
  const clearForm = () => {
    setProducto("");
    setCodigo("");
    setCantidad("");
  };

  // Función para recuperar los productos desde el servidor
  const fetchProductos = () => {
    instancia.get("/Productos.json")
      .then((response) => {
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
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        Swal.fire("Error", "Hubo un error al obtener los productos", "error"); // Mostrar mensaje de error
      });
  };

  // Cargar los productos cuando el componente esté montado
  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    producto,
    codigo,
    cantidad,
    result,
    editingProduct,
    setProducto,
    setCodigo,
    setCantidad,
    setResult,
    setEditingProduct,
    logOut,
    postDataHandler,
    deleteProductHandler,
    editProductHandler,
    clearForm,
    fetchProductos,
  };
};
