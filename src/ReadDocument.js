import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const ReadDocument = () => {
  const [randomIdentification, setRandomIdentification] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [documentContent, setDocumentContent] = useState(null);
  const [watermarkCount, setWatermarkCount] = useState(0);
  const [pdfBlobUrl, setPdfBlobUrl] = useState('');
  const contentRef = useRef(null);
  const iframeRef = useRef(null);

  const handleSubmit = async () => {
    if (!randomIdentification || !passphrase) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const arrayRandomIdAndEncryption = randomIdentification.split('#');
    setRandomIdentification(arrayRandomIdAndEncryption[0]);
    setEncryptionKey(arrayRandomIdAndEncryption[1]);

    const localRandomIdentification = arrayRandomIdAndEncryption[0];
    const localEncryptionKey = arrayRandomIdAndEncryption[1];

    try {
      const response = await fetch(`http://localhost:8080/${localRandomIdentification}?key=${localEncryptionKey}&passphrase=${passphrase}`, {
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

  useEffect(() => {
    if (contentRef.current) {
      const { offsetWidth: width, offsetHeight: height } = contentRef.current;
      const watermarkSize = 200;

      const columns = Math.ceil(width / watermarkSize);
      const rows = Math.ceil(height / watermarkSize);
      setWatermarkCount(columns * rows);
    }
  }, [contentRef.current, documentContent]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        alert("Printing is disabled on this page.");
      }
    };

    const handleBeforePrint = () => {
      if (contentRef.current) {
        contentRef.current.style.visibility = 'hidden';
      }
      alert("Printing is disabled.");
    };

    const handleAfterPrint = () => {
      if (contentRef.current) {
        contentRef.current.style.visibility = 'visible';
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  const isPDF = documentContent && documentContent.fileName && documentContent.fileName.endsWith('.pdf');

  useEffect(() => {
    if (isPDF && documentContent && documentContent.decryptContent) {
      const byteCharacters = atob(documentContent.decryptContent); // base64 decode
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      const blob = new Blob(byteArrays, { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      setPdfBlobUrl(blobUrl);
    }
  }, [documentContent]);

  return (
    <div className="container mt-5 p-4 border rounded shadow-lg upload-container">
      <h1 className="text-center mb-4">Leitura de Documento</h1>

      <div className="mb-3">
        <label htmlFor="docIdRead" className="form-label">Palavra-chave:</label>
        <input
          id="docIdRead"
          type="text"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          className="form-control"
        />
      </div>

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

      <button className="btn btn-secondary mb-3" onClick={handleSubmit}>Ler Documento</button>

      {documentContent && (
        <div className="no-print mt-4" style={{ position: 'relative', overflow: 'hidden' }} ref={contentRef}>
          <div className="watermark" style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gridTemplateRows: 'repeat(auto-fill, minmax(200px, 1fr))',
            color: 'rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            zIndex: 3,
            pointerEvents: 'none',
            userSelect: 'none',
          }}>
            {Array.from({ length: watermarkCount }).map((_, index) => (
              <span key={index} style={{
                fontSize: '5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                transform: 'rotate(-45deg)',
              }}>
                {documentContent.recipientName}
              </span>
            ))}
          </div>

          <div style={{ position: 'relative', zIndex: 0 }}>
            <h4 style={{ marginBottom: '20px' }}>{documentContent.fileName}</h4>
            {isPDF ? (
              <div style={{ width: '100%', height: '600px' }} >
                <embed
                  src={pdfBlobUrl}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                  style={{ position: 'absolute', top: '0', left: '0', border: 'none' }}
                />
                {/* Cover top portion where toolbar usually appears */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '40px', // Adjust based on toolbar height
                  backgroundColor: 'white', // Match your background color
                  zIndex: 2,
                }} />
                {/* Overlay div to block right-click */}
                <div
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'transparent',
                    pointerEvents: 'auto',  // Ensures overlay captures right-clicks
                  }}
                />
              </div>

            ) : (
              <pre style={{ position: 'relative', zIndex: 0 }}>
                {atob(documentContent.decryptContent)}
              </pre>
            )}
          </div>
        </div>
      )
      }
    </div >
  );
};

export default ReadDocument;
