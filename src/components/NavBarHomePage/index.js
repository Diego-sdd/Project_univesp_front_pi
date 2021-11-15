import React from 'react';
import {
  Container,
  Navbar,
  Nav
} from "react-bootstrap";
import logo from '../../image/logo.png';
import styles from './styles.module.css';
function HomePage() {


  return (
    <>
      <Navbar style={{ backgroundColor: '#F2F3F5' }} variant="dark" className={styles.divDeskTop}>
        <Container style={{ zIndex: 9999999 }} >
          <Navbar.Brand href="#home"><img src={logo} alt="logo" style={{ width: 150 }} /></Navbar.Brand>
          <Nav className="justify-content-end" >
            <Nav.Link style={{ fontSize: 20, paddingLeft: 20, color: "#0F82E2" }} href="/">Home</Nav.Link>
            <Nav.Link style={{ fontSize: 20, paddingLeft: 20, color: "#0F82E2" }} href="/">Quem somos</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link style={{ fontSize: 20, color: "#0F82E2" }} href="/LoginIn">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className={styles.divMobile} >
        <div class="collapse" id="navbarToggleExternalContent" style={{ backgroundColor: '#0F82E2' }}>
          <div class=" p-4">
            <Nav.Link style={{ fontSize: 20, paddingLeft: 20, color: "white" }} href="/">Home</Nav.Link>
            <Nav.Link style={{ fontSize: 20, paddingLeft: 20, color: "white" }} href="/">Quem somos</Nav.Link>
            <Nav.Link style={{ fontSize: 20, paddingLeft: 20, color: "white" }} href="/LoginIn">Login</Nav.Link>
          </div>
        </div>
        <nav class="navbar navbar-dark " style={{ backgroundColor: '#0f82e2' }}>
          <div class="container-fluid">
            <button class="navbar-toggler" style={{ zIndex: 9999999 }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}

export default HomePage