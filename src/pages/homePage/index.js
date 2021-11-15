import React from 'react';
import {
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import HomePageNav from '../../components/NavBarHomePage';
import styles from './styles.module.css';
import { useHistory } from "react-router-dom";
import image from '../../image/image2.png'
function HomePage() {
  const history = useHistory()
  return (
    <>

      <HomePageNav />
      <img src={image} alt="=" className={styles.image} style={{ position: 'absolute' }} />

      <Container fluid style={{ position: 'relative', width: '100%'}}>
        <Row>
          <Col xs={0} sm={0} md={1} lg={1} />
          <Col xs={12} sm={12} md={12} lg={6} className={styles.containerTopText}>

            <h2 className={styles.h1}>GPPP_WEB - Gestão do Perfil Profissiográfico Previdenciário </h2>
            <br></br><br></br>
            <h4 className={styles.h2}>
              Disponibilizar uma aplicação WEB de Gestão do PPP (GPPP_WEB) que viabilize a
              formalização das requisições, a elaboração e disponibilização do PPP, nos termos da legislação vigente, com celeridade e segurança.

            </h4>
            <br></br><br></br>
            <h4 className={styles.h2}>Exigilize o processo de solicitação na sua empresa</h4>
            <br></br><br></br>
            <Button variant="primary" className="btnEdit" onClick={() => history.push('/created_user_employee')}>Cadastrar</Button>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default HomePage