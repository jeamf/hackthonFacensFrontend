import React, { useState } from 'react';

const ReadDocument = () => {
  const [randomIdentification, setRandomIdentification] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [documentContent, setDocumentContent] = useState(null);

  const handleSubmit = async () => {
    if (!randomIdentification || !encryptionKey) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/${randomIdentification}?key=${encryptionKey}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setDocumentContent(data);
      } else {
        alert('Erro ao recuperar o documento.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na conexão com o servidor.');
    }
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow-lg upload-container">
      <h1 className="text-center mb-4">Leitura de Documento</h1>

      <div className="mb-3">
        <label htmlFor="docIdRead" className="form-label">Identificação do documento:</label>
        <input
          id="docIdRead"
          type="text"
          value={randomIdentification}
          onChange={(e) => setRandomIdentification(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="authKeyRead" className="form-label">Chave de autenticação:</label>
        <input
          id="authKeyRead"
          type="text"
          value={encryptionKey}
          onChange={(e) => setEncryptionKey(e.target.value)}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary mb-3" onClick={handleSubmit}>Ler Documento</button>

      {documentContent && (
        <div className="mt-4" style={{ position: 'relative' }}>
          {/* Marca d'água com o nome do destinatário, na diagonal */}
          <div className="watermark" style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            fontSize: '5rem',
            color: 'rgba(0, 0, 0, 0.1)', // Transparente
            textAlign: 'center',
            transform: 'rotate(-45deg)', // Aparece na diagonal
            zIndex: 1,
            pointerEvents: 'none', // Não interfere na interação com o conteúdo
            whiteSpace: 'nowrap',
            userSelect: 'none', // Impede que o texto da marca d'água seja selecionado
          }}>
            {documentContent.recipientName} {/* Nome do destinatário */}
          </div>

          {/* Conteúdo descriptografado */}
          <div style={{ position: 'relative', zIndex: 0 }}>
            <h4 style={{ marginBottom: '20px' }}>{documentContent.fileName}</h4>
            <pre style={{ position: 'relative', zIndex: 0 }}>{atob(documentContent.decryptContent)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadDocument;
