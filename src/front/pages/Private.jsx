import useGlobalReducer from "../hooks/useGlobalReducer";
import { Navigate } from "react-router-dom";

export const Private = () => {

  const { store } = useGlobalReducer();

  if (!store.token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Hola, bienvenido {store.user}</h1>
    </div>
  );
};

