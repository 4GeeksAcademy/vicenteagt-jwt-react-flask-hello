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
    <div className="container-fluid mt-3 text-center">
      <div className="row text-start mt-3">
        <h1 className="text-white" >Hola, bienvenido <span className="text-warning">{userData?.name}</span></h1>
      </div>
       <div className="container">
      <div className="row text-center mt-3 bg-white py-3 m-auto">
        <h1 className="text-dark" >Nuestros Cursos</h1>
      </div>
      </div>
      <div className="container mt-3 mb-5">
				<div className="row text-center g-4 ">

					<div className="col-sm-12 col-md-6 col-lg-3">
						<div className="bg-white rounded-3 shadow-sm p-4 h-100">
							<i className="fa-solid fa-clock fa-3x mb-3 g-color"></i>
							<h4 className="fw-bold mb-3">Cursos de Manejo del Tiempo</h4>
							<p>
								Optimiza tu día a día con estrategías con resplados pedagógicos
							</p>
							<p>
								Este método garantiza una mayor eficiencia en la gestión académica.
							</p>
						</div>
					</div>

					<div className="col-sm-12 col-md-6 col-lg-3">
						<div className="bg-white rounded-3 shadow-sm p-4 h-100">
							<i className="fa-solid fa-users fa-3x mb-3 g-color"></i>
							<h4 className="fw-bold mb-3">Cursos de Trabajo Grupal</h4>
							<p>
								Facilita la interacción entre estudiantes y docentes, promoviendo un ambiente colaborativo.
							</p>
							<p>
								Garantiza la comunicación entre todos los involucrados en el proceso educativo.
							</p>
						</div>
					</div>

					<div className="col-sm-12 col-md-6 col-lg-3">
						<div className="bg-white rounded-3 shadow-sm p-4 h-100">
							<i className="fa-solid fa-chart-line fa-3x mb-3 g-color"></i>
							<h4 className="fw-bold mb-3">Cursos de Análisis Cuantitativos</h4>
							<p>
								Proporciona herramientas para monitorear el rendimiento académico.
							</p>
							<p>
								Permite un seguimiento detallado del progreso de los estudiantes.
							</p>
						</div>
					</div>
					<div className="col-sm-12 col-md-6 col-lg-3">
						<div className="bg-white rounded-3 shadow-sm p-4 h-100">
							<i className="fa-solid fa-shield-halved fa-3x mb-3 g-color"></i>
							<h4 className="fw-bold mb-3">Seguridad y privacidad</h4>
							<p>
								Garantiza la protección de datos personales.
							</p>
							<p>
								ESLO cumple con los estándares de seguridad más altos.
							</p>
						</div>
					</div>

				</div>
			</div>
    </div>
  );
};

