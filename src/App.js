// import React, { useState } from 'react';
// import UploadForm from './UploadForm';  // O componente de envio
// import ReadDocument from './ReadDocument';  // O componente de leitura

// const App = () => {
//   const [activeTab, setActiveTab] = useState('upload'); // Estado para controlar qual aba está ativa

//   return (
//     <div>
//       {/* Navbar com abas para alternar */}
//       <div className="d-flex align-items-center mb-3">
//         <img
//           src="https://via.placeholder.com/80" // Adicione sua logo aqui
//           alt="Logo"
//           style={{ width: '80px', height: '80px' }}
//           className="me-3"
//         />
//         <div className="tabs-container w-100 text-center">
//           <button
//             className={`btn tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
//             onClick={() => setActiveTab('upload')}
//           >
//             Envio de documentos
//           </button>
//           <button
//             className={`btn tab-btn ${activeTab === 'read' ? 'active' : ''}`}
//             onClick={() => setActiveTab('read')}
//           >
//             Leitura de documentos
//           </button>
//         </div>
//       </div>

//       {/* Renderiza o componente baseado na aba ativa */}
//       {activeTab === 'upload' && <UploadForm />}
//       {activeTab === 'read' && <ReadDocument />}
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import UploadForm from './UploadForm';  // O componente de envio
import ReadDocument from './ReadDocument';  // O componente de leitura
import logo from './logo/logo.png';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('upload'); // Estado para controlar qual aba está ativa

  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          {/* <img
            src={logo}
            alt="Logo"
            className="App-logo"
          /> */}
            <a
              href="#"
              className={`tab-link ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              Envio de documentos
            </a>
            <a
              href="#"
              className={`tab-link ${activeTab === 'read' ? 'active' : ''}`}
              onClick={() => setActiveTab('read')}
            >
              Leitura de documentos
            </a>
        </div>
      </header>

      {/* Renderiza o componente baseado na aba ativa */}
      <main className="App-main">
        {activeTab === 'upload' && <UploadForm />}
        {activeTab === 'read' && <ReadDocument />}
      </main>
    </div>
  );
};

export default App;


