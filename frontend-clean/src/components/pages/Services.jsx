import Display from "../organisms/Display";
import Header from "../organisms/Header";
import ServiceList from "../organisms/ServiceList";
import ServiceForm from "../organisms/ServiceForm";
import { useState, useEffect } from "react";

function Services() {
  const [displayElement, setDisplayElement] = useState("listas");
  const [serviceToEdit, setServiceToEdit] = useState(null);

  const handleEdit = (service) => {
    setServiceToEdit(service);
    setDisplayElement("form");
  };

  const renderElement = () => {
    if (displayElement === "listas") {
      return <ServiceList onEdit={handleEdit} />;
    } else if (displayElement === "form") {
      return (
        <ServiceForm
          service={serviceToEdit}
          onSuccess={() => setDisplayElement("listas")}
        />
      );
    }
  };

  return (
    <div className="bg-zinc-300 mx-auto w-screen h-lhv w-screen h-screen">
      <div className="w-full">
        <Header />
      </div>
      <div className="w-full flex flex-wrap items-center justify-between w-screen h-screen">
        <Display>{renderElement()}</Display>
      </div>
    </div>
  );
}

export default Services;
