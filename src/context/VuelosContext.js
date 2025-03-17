import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const VuelosContext = createContext();

export const VuelosProvider = ({children}) => {
    const [vuelos, setVuelos] = useState([]);

useEffect(() => {
    fetch('vuelos.json')
    .then(response => response.json())
    .then(data => setVuelos(data))
    .catch(error => console.log(error));
}, []);

const handleAgregarVuelo = (vuelo,flight) => {
    const vuelosActualizados = vuelos.map((v) => {
        if (v.destination === vuelo.destination) {
            return {
                ...v,
                flights: [...v.flights, flight],
            };
        }
        return v;
    });
    setVuelos(vuelosActualizados);
    }

    return(
    <VuelosContext.Provider value={{vuelos, setVuelos , handleAgregarVuelo}}>
    {children}
    </VuelosContext.Provider>
    );
}

