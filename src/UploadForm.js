import React, { useState } from 'react';
import './UploadForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadForm = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [randomIdentification, setRandomIdentification] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleRecipientChange = (event) => {
    setRecipientName(event.target.value);
  };

  const handlePassphraseChange = (event) => {
    setPassphrase(event.target.value);
  };

  const handleCopyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    alert('Copiado para o clipboard!');
  };

  const handleSubmit = async () => {
    if (!file || !recipientName || !passphrase) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    
    const formData = new FormData();

     /*file.name.split('.').slice(0, -1).join('.');*/
     const localFileName = file.name;
     setFileName(localFileName);

    formData.append('file', file);
    formData.append('fileName', localFileName);
    formData.append('recipientName', recipientName);
    formData.append('passphrase', passphrase);

    try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setRandomIdentification(data.randomIdentification);
        setEncryptionKey(data.encryptionKey);
        setShowResult(true);
      } else {
        alert('Erro ao enviar o documento. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na conexão com o servidor.');
    }
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow-lg upload-container">
      {/* Upload Form */}
      {activeTab === 'upload' && (
        <>
          <h1 className="text-center mb-4">Envio de Documento</h1>

          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">
              Escolha um arquivo:
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="recipientName" className="form-label">
              Destinatário:
            </label>
            <input
              id="recipientName"
              type="text"
              value={recipientName}
              onChange={handleRecipientChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="recipientName" className="form-label">
              Palavra-chave:
            </label>
            <input
              id="passphrase"
              type="text"
              value={passphrase}
              onChange={handlePassphraseChange}
              className="form-control"
            />
          </div>

          <button className="btn btn-primary mb-3" onClick={handleSubmit}>
            Enviar Documento
          </button>

          {showResult && (
            <div className="mt-4">
              <div className="mb-3">
                <label htmlFor="encryptionKey" className="form-label">
                  Chave de autenticação:
                </label>
                <div className="d-flex align-items-center">
                  <input
                    id="encryptionKey"
                    type="text"
                    value={randomIdentification + '#' + encryptionKey}
                    readOnly
                    className="form-control me-2"
                  />
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleCopyToClipboard(randomIdentification + '#' + encryptionKey)}
                  >
                    Copiar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UploadForm;