import React from "react";
import { useNavigate } from "react-router-dom";


export const Principal = () => {
const navigate = useNavigate();

  
  return (
		<div className="bg-dark pb-5">
			<div className="g-color-bg text-white home-hero">
				<div className="container">
					<div className="row align-items-center">

						<div className="col-sm-12 col-md-6 text-center text-md-start mb-5 home-hero-text">
							<h1 className="display-5 fw-bold mb-4 mt-5">
								<span className="text-warning ">ESLO</span> 
							</h1>

							<p className="fs-5 mt-3">
								Cursos gratuitos de Pedagogía, diseñados para potenciar la docencia en México.
							</p>

							<button className="btn btn-light btn-lg mt-3 fw-bold home-cta" 
                            onClick={() => navigate("/register")}>
                                
								Registrate ahora!
							</button>

                        
                            
          
						</div>

						

					</div>
				</div>
			</div>
			<div className="bg-warning py-5 container-fluid d-flex justify-content-center">

				<div className="row text-center g-4">

					<div className="col-sm-12 col-md-4">
						<h2 className="display-3 fw-bold v-color">200+</h2>
						<p className="fs-3 mb-0 fw-bold">Cursos especializados </p>
					</div>

					<div className="col-sm-12 col-md-4">
						<h2 className="display-3 fw-bold v-color">5,000+</h2>
						<p className="fs-3 mb-0 fw-bold">Estudiantes inscritos</p>
					</div>

					<div className="col-sm-12 col-md-4">
						<h2 className="display-3 fw-bold v-color">100+</h2>
						<p className="fs-3 mb-0 fw-bold">Escuelas beneficiadas</p>
					</div>

					

				</div>
			</div>

				

			<div className="container mt-5">
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