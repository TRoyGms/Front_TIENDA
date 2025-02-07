import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ServiceForm from "./ServiceForm";

function ServiceList({ service, onEdit }) {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sortOption, setSortOption] = useState("priceAsc"); // Nuevo estado para el select

  useEffect(() => {
    const url = import.meta.env.VITE_API_SERVICES;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  useEffect(() => {
    // Ordenar los servicios según la opción seleccionada
    let sortedServices = [...services];

    switch (sortOption) {
      case "priceAsc":
        sortedServices.sort((a, b) => a.price - b.price); // Ordenar de menor a mayor precio
        break;
      case "priceDesc":
        sortedServices.sort((a, b) => b.price - a.price); // Ordenar de mayor a menor precio
        break;
      case "nameAsc":
        sortedServices.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente A-Z
        break;
      case "nameDesc":
        sortedServices.sort((a, b) => b.name.localeCompare(a.name)); // Ordenar alfabéticamente Z-A
        break;
      case "newest":
        sortedServices.sort((a, b) => b.id - a.id); // Ordenar por ID, los IDs más grandes son los más recientes
        break;
      default:
        break;
    }

    setServices(sortedServices);
  }, [sortOption, services]); // Se vuelve a ordenar cuando cambie la opción de ordenación

  const handleSelectService = (id) => {
    setSelectedServices((prev) => {
      if (prev.includes(id)) {
        return prev.filter((serviceId) => serviceId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Elimina los servicios seleccionados
  const handleDelete = () => {
    if (selectedServices.length === 0) {
      Swal.fire({
        title: "No hay servicios seleccionados",
        text: "Por favor selecciona al menos un servicio para eliminar.",
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
        // Realizar la eliminación
        selectedServices.forEach((id) => {
          const url = `${import.meta.env.VITE_API_SERVICES}${id}`;
          fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(() => {
              // Remover el servicio eliminado de la lista
              setServices((prevServices) =>
                prevServices.filter((service) => service.id !== id)
              );
            })
            .catch((error) => {
              console.error("Error deleting service:", error);
            });
        });

        Swal.fire({
          title: "Eliminado",
          text: "Los servicios seleccionados han sido eliminados.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
  };

  return (
    <div
      id="listaServicios"
      className="w-[100%] h-[90%] bg-gray-400 mx-auto flex flex-col justify-between rounded-2xl border-4"
    >
      {showForm ? (
        <ServiceForm onCancel={() => setShowForm(false)} />
      ) : (
        <>
          <div
            id="tableHead"
            className="text-2xl text-center w-full font-black text-white rounded-2xl"
          >
            <p className="text-4xl text-center w-full font-black text-white mb-4 mt-4">
              Lista de Servicios
            </p>
          </div>

          <div className="w-full flex justify-center mb-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 bg-gray-200 text-2xl rounded-lg"
            >
              <option value="priceAsc">Precio: Menor a Mayor</option>
              <option value="priceDesc">Precio: Mayor a Menor</option>
              <option value="nameAsc">Nombre: A-Z</option>
              <option value="nameDesc">Nombre: Z-A</option>
              <option value="newest">Más Recientes</option>
            </select>
          </div>

          <div className="container flex-grow w-12/12">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleSelectService(service.id)}
                onDoubleClick={() => {
                  console.log("Editando servicio:", service);
                  onEdit(service);
                }}
                className={`p-2 mb-6 cursor-pointer ${
                  selectedServices.includes(service.id)
                    ? "bg-yellow-100"
                    : "bg-white"
                } hover:bg-blue-200 transition duration-400`}
              >
                <div className="flex justify-between items-center w-[70%] mx-6">
                  <h3 className="text-3xl font-semibold">{service.name}</h3>
                  <p className="text-3xl font-semibold text-black">
                    Precio: ${service.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-full justify-evenly items-center space-x-4 p-4">
            <button
              onClick={handleDelete}
              className="w-[40%] bg-red-500 text-2xl text-white px-6 py-2 rounded-lg hover:bg-red-800 transition duration-200"
              disabled={selectedServices.length === 0}
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

export default ServiceList;
