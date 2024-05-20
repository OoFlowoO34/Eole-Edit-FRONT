import './App.css';
import React from 'react';

import NavbarComponent from './components/navbar/navbar-component';
import VideoComponent from './components/video/video-component';
import FooterComponent from './components/footer/footer-component';
import { Container } from 'react-bootstrap';

import { VideoProvider } from './contexts/VideoContext';

function App() {
  return (
    <div className="App d-flex flex-column" style={{ minHeight: '100vh' }}>
      <header>
        <NavbarComponent />
      </header>
      <main className="flex-grow-1">
        <VideoProvider>
          <VideoComponent />
        </VideoProvider>
      </main>
      <footer className="bg-dark mt-4">
        <Container>
          <FooterComponent />
        </Container>
      </footer>
    </div>
  );
}

export default App;