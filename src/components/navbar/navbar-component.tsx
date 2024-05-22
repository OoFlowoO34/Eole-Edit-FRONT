import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import logo from '../../assets/images/Logo_EoleEdit_Blanc.png'; // Chemin relatif depuis le fichier composant

const NavbarComponent: React.FC = () => {

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />{' '}
            EoleEdit
          </Navbar.Brand>
        </Container>
    </Navbar>
  );
};
export default NavbarComponent;