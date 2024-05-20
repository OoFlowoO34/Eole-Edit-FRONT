import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer-component.css'; 
const FooterComponent: React.FC = () => {

  return (
    <footer className="bg-dark text-white py-1">
      <Container>
      <Row className="align-items-start"> {/* Utilisez la classe align-items-start ici */}
          <Col>
          <h5 className="footer-title">Informations de contact</h5>
            <p>Email : florian.batt@hotmail.fr</p>
          </Col>
          <Col>
            <h5>Liens utiles</h5>
            <ul className="list-unstyled">
              <li><a href="#">Accueil</a></li>
            </ul>
          </Col>
          <Col>
            <h5>Adresse</h5>
            <p>Clapiers, France</p>
          </Col>
        </Row>
        <hr className="my-1" />
        <p className="text-center">&copy; 2024 Florian Batt.</p>
      </Container>
    </footer>
  );
};
export default FooterComponent;