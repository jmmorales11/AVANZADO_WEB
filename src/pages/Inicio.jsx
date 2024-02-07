
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Inicio.css";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Modal, Button, Carousel } from "react-bootstrap";


const Inicio = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleResumeClick = () => {
        // Redireccionar a la clase py5
        const py5Element = document.querySelector(".col-xxl-7");
        if (py5Element) {
            py5Element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <body>
            <div className="">
                <main className="flex-shrink-0">
                    <nav className="navbar navbar-expand-lg py-3">
                        <div className="container px-5">
                            <Link className="navbar-brand" to="/inicio"><img src="../../public/logo1.png"></img></Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fwbolder-">
                                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                                    <li className="nav-item"><Link className="nav-link" onClick={handleResumeClick}>Resume</Link></li>
                                    <li className="nav-item btnSesion "><Link className="nav-link" to="/" style={{ color: 'white' }}>Iniciar Sesión</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="py-5">
                        <div className="container px-5 pb-5">
                            <div className="row gx-5 align-items-center">
                                <div className="col-xxl-5">
                                    <div className="text-center text-xxl-start">
                                        <div className="badge bg-gradient-primary-to-secondary text-white mb-4"><div className="text-uppercase">Gestion &middot; Productos &middot; Alimentos</div></div>
                                        <div className="fs-3 fw-light text-muted">Productos alimenticios diseñada para satisfacer tus necesidades nutricionales con calidad, frescura y variedad en cada bocado.</div>
                                        <h1 className="display-3 fw-bolder mb-5"><span className="text-gradient d-inline">Gestión de productos</span></h1>
                                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                                            <center>
                                                <Button className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" onClick={handleShow}>
                                                    Ver Productos
                                                </Button>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-7">

                                    <div className="d-flex justify-content-center mt-5 mt-xxl-0">
                                        <div className="profile bg-gradient-primary-to-secondary">
                                            <div className="dots-3">
                                                <img src="../../public/mujeruwu.png"></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="bg-light py-4">
                        <Container>
                            <div className="text-center text-muted">
                                <p>&copy; 2024 Mi Empresa. Todos los derechos reservados.</p>
                            </div>
                        </Container>
                    </footer>
                </main>

                {/* Modal */}
                <Modal show={showModal} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Productos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Carousel controls={false} interval={1000}>
                            <Carousel.Item className="Cimg">
                                <img
                                    className="d-block w-100"
                                    src="../../public/frutas.jpg"
                                    alt="First slide"
                                />
                                <Carousel.Caption className="cinfo">
                                    <h3 className="titulo">FRUTAS</h3>
                                    <p className="info">Frutas frescas </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item className="Cimg">
                                <img
                                    className="d-block w-100"
                                    src="../../public/carnes.jpg"
                                    alt="Second slide"
                                />

                                <Carousel.Caption className="cinfo">
                                    <h3 className="titulo">CERNES</h3>
                                    <p className="info">Carne de calidad</p>
                                </Carousel.Caption  >
                            </Carousel.Item>
                            <Carousel.Item className="Cimg">
                                <img
                                    className="d-block w-100"
                                    src="../../public/lacteos.jpg"
                                    alt="Third slide"
                                />

                                <Carousel.Caption className="cinfo">
                                    <h3 className="titulo">LACTEOS</h3>
                                    <p className="info">Lacteos de todo tipo a tu alcance</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item className="Cimg">
                                <img
                                    className="d-block w-100"
                                    src="../../public/verdura.jpg"
                                    alt="Third slide"
                                />

                                <Carousel.Caption className="cinfo">
                                    <h3 className="titulo">VERDURAS</h3>
                                    <p className="info">Del campo a tu hogar</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </body>
    );
}

export default Inicio;
