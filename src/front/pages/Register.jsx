import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Register = () => {

  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [shouldSubmit, setShouldSubmit] = useState(false);

  //logica fetch
  useEffect(() => {

    if (!shouldSubmit) return;

    const registerUser = async () => {

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.name);

        dispatch({
          type: "setAuth",
          payload: {
            token: data.token,
            user: data.name
          }
        });

        navigate("/private");

      } else {
        alert(data.msg);
      }

      setShouldSubmit(false);
    };

    registerUser();

  }, [shouldSubmit]);

 
  const handleSubmit = (e) => {
    e.preventDefault();
    setShouldSubmit(true);
  };

  return (
    
    <div className="container-fluid bg-dark py-5">
      <div className="row justify-content-center ">
        <div className="col-md-6">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">Registrarse</h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Dirección email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100"
              >
                Registrarse
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
};