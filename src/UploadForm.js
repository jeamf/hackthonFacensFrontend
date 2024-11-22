import React, { useState } from 'react';
import './UploadForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo/logo.png';

const UploadForm = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [authKeyUpload, setAuthKeyUpload] = useState('');
  const [docIdUpload, setDocIdUpload] = useState('');
  const [recipientUpload, setRecipientUpload] = useState('');
  const [authKeyRead, setAuthKeyRead] = useState('');
  const [docIdRead, setDocIdRead] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === 'application/pdf' ||
        selectedFile.type === 'application/msword' ||
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        selectedFile.type === 'text/plain')
    ) {
      setFile(selectedFile);
    } else {
      alert('Por favor, selecione um arquivo PDF, DOC, DOCX ou TXT.');
      setFile(null);
    }
  };

  const handleAuthKeyUploadChange = (event) => {
    setAuthKeyUpload(event.target.value);
  };

  const handleDocIdUploadChange = (event) => {
    setDocIdUpload(event.target.value);
  };

  const handleRecipientUploadChange = (event) => {
    setRecipientUpload(event.target.value);
  };

  const handleAuthKeyReadChange = (event) => {
    setAuthKeyRead(event.target.value);
  };

  const handleDocIdReadChange = (event) => {
    setDocIdRead(event.target.value);
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow-lg upload-container">
      <div className="d-flex align-items-center mb-3">
        <img
          src={logo}
          alt="Logo"
          style={{ width: '80px', height: '80px' }}
          className="me-3"
        />
        <div className="tabs-container w-100 text-center">
          <button
            className={`btn tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            Envio de documentos
          </button>
          <button
            className={`btn tab-btn ${activeTab === 'read' ? 'active' : ''}`}
            onClick={() => setActiveTab('read')}
          >
            Leitura de documentos
          </button>
        </div>
      </div>

      <h1 className="text-center title mb-4">Gerenciamento de Documentos Criptografados</h1>

      {activeTab === 'upload' && (
        <div>
          <h2 className="mb-3">Envio de documentos</h2>
          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">
              Escolha um arquivo:
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="docIdUpload" className="form-label">
              Identificação do documento:
            </label>
            <input
              id="docIdUpload"
              type="text"
              value={docIdUpload}
              onChange={handleDocIdUploadChange}
              className="form-control"
              style={{
                width: '250px',
                height: '40px',
                borderWidth: '2px',
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="authKeyUpload" className="form-label">
              Chave de autenticação:
            </label>
            <input
              id="authKeyUpload"
              type="text"
              value={authKeyUpload}
              onChange={handleAuthKeyUploadChange}
              className="form-control"
              style={{
                width: '250px',
                height: '40px',
                borderWidth: '2px',
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="recipientUpload" className="form-label">
              Receptor/Destinatário:
            </label>
            <input
              id="recipientUpload"
              type="text"
              value={recipientUpload}
              onChange={handleRecipientUploadChange}
              className="form-control"
              style={{
                width: '250px',
                height: '40px',
                borderWidth: '2px',
              }}
            />
          </div>
        </div>
      )}

      {activeTab === 'read' && (
        <div>
          <h2 className="mb-3">Leitura de documentos</h2>
          <div className="mb-3">
            <label htmlFor="docIdRead" className="form-label">
              Identificação do documento:
            </label>
            <input
              id="docIdRead"
              type="text"
              value={docIdRead}
              onChange={handleDocIdReadChange}
              className="form-control"
              style={{
                width: '250px',
                height: '40px',
                borderWidth: '2px',
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="authKeyRead" className="form-label">
              Chave de autenticação:
            </label>
            <input
              id="authKeyRead"
              type="text"
              value={authKeyRead}
              onChange={handleAuthKeyReadChange}
              className="form-control"
              style={{
                width: '250px',
                height: '40px',
                borderWidth: '2px',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
