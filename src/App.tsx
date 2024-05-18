import React from 'react';
import logo from './logo.svg';
import './App.css';
import UploadFormComponent from './components/upload-form-component';

function App() {
  return (
    <div className="App">
      <header>
        {/* Éléments du header */}
      </header>
      <main className="App-header">
          {/* Contenu de l'application */}
        <UploadFormComponent/>
      </main>
      <footer>
        {/* Éléments de pied de page */}
      </footer>

    </div>
  );
}

export default App;
