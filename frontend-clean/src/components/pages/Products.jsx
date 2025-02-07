import Display from "../organisms/Display";
import Header from "../organisms/Header";
import ProductList from "../organisms/ProductList";
import ProductForm from "../organisms/ProductForm";
import { useState } from "react";

function Products() {
  const [displayElement, setDisplayElement] = useState("listas");
  const [productToEdit, setProductToEdit] = useState(null);

  const handleEdit = (product) => {
    setProductToEdit(product);
    setDisplayElement("form");
  };

  const renderElement = () => {
    if (displayElement === "listas") {
      return <ProductList onEdit={handleEdit} />;
    } else if (displayElement === "form") {
      return (
        <ProductForm
          product={productToEdit}
          onSuccess={() => setDisplayElement("listas")}
        />
      );
    }
  };

  return (
    <div className="bg-zinc-300 mx-auto w-screen h-screen">
      <div className="w-full">
        <Header />
      </div>
      <div className="w-full flex flex-wrap items-center justify-between w-screen h-screen">
        <Display>{renderElement()}</Display>
      </div>
    </div>
  );
}

export default Products;
