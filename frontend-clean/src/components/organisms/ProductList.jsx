import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ProductForm from "./ProductForm";

function ProductList({ product, onEdit }) {
  const [products, setProducts] = useState([]); // Asegurarse de que sea un arreglo vacío
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sortOption, setSortOption] = useState("priceAsc"); // Nuevo estado para el select

  useEffect(() => {
    const url = import.meta.env.VITE_API_PRODUCTS;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Verificar que la respuesta sea un arreglo
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("La respuesta no es un arreglo:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    // Ordenar los productos según la opción seleccionada
    let sortedProducts = [...products];

    switch (sortOption) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.Price - b.Price); // Ordenar de menor a mayor precio
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.Price - a.Price); // Ordenar de mayor a menor precio
        break;
      case "nameAsc":
        sortedProducts.sort((a, b) => a.Name.localeCompare(b.Name)); // Ordenar alfabéticamente A-Z
        break;
      case "nameDesc":
        sortedProducts.sort((a, b) => b.Name.localeCompare(a.Name)); // Ordenar alfabéticamente Z-A
        break;
      case "newest":
        sortedProducts.sort((a, b) => b.Id - a.Id); // Ordenar por ID, los IDs más grandes son los más recientes
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  }, [sortOption, products]); // Se vuelve a ordenar cuando cambie la opción de ordenación

  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((productId) => productId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDelete = () => {
    if (selectedProducts.length === 0) {
      Swal.fire({
        title: "No hay productos seleccionados",
        text: "Por favor selecciona al menos un producto para eliminar.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás deshacer esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        selectedProducts.forEach((id) => {
          const url = `${import.meta.env.VITE_API_PRODUCTS}${id}`;
          fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(() => {
              setProducts((prevProducts) =>
                prevProducts.filter((product) => product.Id !== id)
              );
            })
            .catch((error) => {
              console.error("Error deleting product:", error);
            });
        });

        Swal.fire({
          title: "Eliminado",
          text: "Los productos seleccionados han sido eliminados.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
  };

  return (
    <div
      id="listaProductos"
      className="w-[100%] h-[90%] bg-gray-400 mx-auto flex flex-col justify-between rounded-2xl border-4"
    >
      {showForm ? (
        <ProductForm onCancel={() => setShowForm(false)} />
      ) : (
        <>
          <div
            id="tableHead"
            className="text-2xl text-center w-full font-black text-white rounded-2xl"
          >
            <p className="text-4xl text-center w-full font-black text-white mb-4 mt-4">
              Lista de Productos
            </p>
          </div>

          {/* Select para ordenar */}
          <div className="w-full flex justify-center mb-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 bg-gray-300 text-xl rounded-lg"
            >
              <option value="priceAsc">Precio: Menor a Mayor</option>
              <option value="priceDesc">Precio: Mayor a Menor</option>
              <option value="nameAsc">Nombre: A-Z</option>
              <option value="nameDesc">Nombre: Z-A</option>
              <option value="newest">Más Recientes</option>
            </select>
          </div>

          <div className="container flex-grow w-12/12">
            {Array.isArray(products) &&
              products.map((product) => (
                <div
                  key={product.Id}
                  onClick={() => handleSelectProduct(product.Id)}
                  onDoubleClick={() => {
                    console.log("Editando producto:", product);
                    onEdit(product);
                  }}
                  className={`mb-2 cursor-pointer ${
                    selectedProducts.includes(product.Id)
                      ? "bg-yellow-100"
                      : "bg-white"
                  } hover:bg-blue-200 transition duration-400`}
                >
                  <div className="flex justify-between items-center w-[70%] mx-6">
                    <h3 className="text-xl font-semibold">{product.Name}</h3>
                    <p className="text-xl font-semibold text-black">
                      Precio: ${product.Price}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex w-full justify-evenly items-center space-x-4 p-4">
            <button
              onClick={handleDelete}
              className="w-[40%] bg-red-500 text-2xl text-white px-6 py-2 rounded-lg hover:bg-red-800 transition duration-200"
              disabled={selectedProducts.length === 0}
            >
              Eliminar
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="w-[40%] bg-lime-500 text-2xl text-white p-2 rounded-md shadow-xl hover:bg-lime-600 transition duration-200"
            >
              Agregar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductList;
