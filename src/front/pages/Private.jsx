import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Navigate } from "react-router-dom";

export const Private = () => {

  const { store, dispatch } = useGlobalReducer();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!store.token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {

    const getPrivateData = async () => {

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/private`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${store.token}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error("Token inválido");
        }

        const data = await response.json();

        setUserData(data);

      
        dispatch({
          type: "setAuth",
          payload: {
            token: store.token,
            user: data.name
          }
        });

      } catch (error) {
        console.error(error);

        
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        dispatch({ type: "logout" });
      }

      setLoading(false);
    };

    getPrivateData();

  }, []);

  if (loading) {
    return <h3 className="text-center mt-5">Cargando...</h3>;
  }

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow p-4">
        <h1>Hola, bienvenido {userData?.name}</h1>
        <p className="mt-3">Tu correo es: {userData?.email}</p>
      </div>
    </div>
  );
};