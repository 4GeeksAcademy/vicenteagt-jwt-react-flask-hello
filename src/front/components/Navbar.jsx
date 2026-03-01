import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  dispatch({ type: "logout" });
  navigate("/login");
};

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#eee" }}>
      
      <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Mi App
      </h3>

      {!store.token ? (
       
        <div>
          <button
            onClick={() => navigate("/register")}
            style={{ marginRight: "10px" }}
          >
            Registrarse
          </button>

          <button
            onClick={() => navigate("/login")}
          >
            Acceder
          </button>
        </div>
      ) : (
        
        <button onClick={handleLogout}>
          Salir
        </button>
      )}

    </nav>
  );
};

