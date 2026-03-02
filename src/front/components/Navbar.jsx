import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  dispatch({ type: "logout" });
  navigate("/");
};

  return (
    <nav className="bg-warning" style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
      
      <h2 className="text-dark" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        ESLO
      </h2>

      {!store.token ? (
       
        <div>
          <button className="btn btn-dark"
            onClick={() => navigate("/register")}
            style={{ marginRight: "10px" }}
          >
            Registrarse
          </button>

          <button className="btn btn-dark"
            onClick={() => navigate("/login")}
          >
            Acceder
          </button>
        </div>
      ) : (
        
        <button className="btn btn-danger" onClick={handleLogout}>
          Salir
        </button>
      )}

    </nav>
  );
};

