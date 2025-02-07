import InputField from "../molecules/InputField";
import Button from "../molecules/Button";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function ProductForm({ product, onSuccess }) {
  const [name, setName] = useState(product?.Name || "");
  const [price, setPrice] = useState(product?.Price || "");

  const productData = {
    Id: product?.Id,
    Name: name,
    Price: parseInt(price),
  };

  useEffect(() => {
    console.log("Producto recibido en el formulario:", product);
    if (product) {
      setName(product.Name);
      setPrice(product.Price);
    }
  }, [product]);

  const url = product
    ? `${import.meta.env.VITE_API_PRODUCTS}${product.Id}`
    : import.meta.env.VITE_API_PRODUCTS;

  const method = product ? "PUT" : "POST";

  const handleSave = (e) => {
    e.preventDefault();

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("API error");
        }
      })
      .then((data) => {
        Swal.fire({
          title: product ? "Producto actualizado" : "Producto creado",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          onSuccess();
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log("Error: " + error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al guardar los datos",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div
      id="FORMULARIO"
      className="flex items-center justify-center bg-zinc-300 rounded-xl shadow-lg mx-auto w-[50%] h-[50vh] border-4 my-auto"
    >
      <div className="flex flex-col items-center justify-center w-[100%] h-[100%] p-6 rounded-lg">
        <h1 className="bg-zinc-600 w-full py-2 rounded-md text-center relative text-3xl font-semibold text-white mb-4">
          {product ? "Editar Producto" : "Agregar Producto"}
        </h1>

        <form
          onSubmit={handleSave}
          className="flex flex-col items-center h-[50%] "
        >
          <div className="mb-4 text-2xl font-semibold">
            <InputField
              value={name}
              onChange={(e) => setName(e.target.value)}
              text={"Nombre del Producto"}
              type={"text"}
              placeholder="Nombre del Producto"
              required
            />
          </div>
          <div className="mb-4 text-2xl font-semibold">
            <InputField
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              text={"Precio del Producto"}
              type={"text"}
              placeholder="Precio del Producto"
              required
            />
          </div>
          <div className="w-full py-2 bg-[#4AB0C2] text-white rounded-lg shadow-lg hover:bg-[#38818F] transition duration-300">
            <Button
              name={product ? "Actualizar Producto" : "Guardar Producto"}
              onClick={handleSave}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
