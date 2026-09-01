// Cliente de API do DMS: chamadas fetch para o backend via prefixo /api.

const API_BASE_URL = '/api';

async function parseErrorMessage(response) {
  try {
    const body = await response.json();
    return body.erro || 'Ocorreu um erro inesperado.';
  } catch {
    return 'Ocorreu um erro inesperado.';
  }
}

export async function uploadDocument(file, owner) {
  const formData = new FormData();
  formData.append('file', file);
  if (owner) {
    formData.append('owner', owner);
  }

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
}

export async function listDocuments() {
  const response = await fetch(`${API_BASE_URL}/documents`);

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
}

export function getDownloadUrl(documentId) {
  return `${API_BASE_URL}/documents/${documentId}/download`;
}
