import { useState } from 'react';
import { uploadDocument } from '../services/documentService';

// Formulário de envio de documento; delega o recarregamento da lista ao componente pai.
export default function UploadComponent({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [owner, setOwner] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setError('Selecione um arquivo para enviar.');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      await uploadDocument(file, owner);
      setFile(null);
      setOwner('');
      event.target.reset();
      onUploadSuccess();
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="file">Arquivo</label>
        <input
          id="file"
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
        />
      </div>
      <div>
        <label htmlFor="owner">Dono (opcional)</label>
        <input
          id="owner"
          type="text"
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
        />
      </div>
      <button type="submit" disabled={isUploading}>
        {isUploading ? 'Enviando...' : 'Enviar documento'}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
