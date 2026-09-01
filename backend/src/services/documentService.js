const { randomUUID } = require('node:crypto');
const documentRepository = require('../repositories/documentRepository');

const DEFAULT_OWNER = 'anonimo';

function registerUpload({ originalName, storedName, mimeType, size, owner }) {
  const document = {
    id: randomUUID(),
    originalName,
    storedName,
    mimeType,
    size,
    uploadedAt: new Date().toISOString(),
    owner: owner || DEFAULT_OWNER,
  };

  return documentRepository.save(document);
}

function listDocuments() {
  return documentRepository.findAll();
}

function getDocumentById(id) {
  return documentRepository.findById(id);
}

module.exports = { registerUpload, listDocuments, getDocumentById };
