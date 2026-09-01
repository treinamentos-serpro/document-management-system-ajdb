const path = require('node:path');
const documentService = require('../services/documentService');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');

function toPublicDocument(document) {
  const { id, originalName, size, uploadedAt, owner } = document;
  return { id, originalName, size, uploadedAt, owner };
}

function upload(req, res) {
  if (!req.file) {
    return res.status(400).json({ erro: 'Nenhum arquivo foi enviado.' });
  }

  const document = documentService.registerUpload({
    originalName: req.file.originalname,
    storedName: req.file.filename,
    mimeType: req.file.mimetype,
    size: req.file.size,
    owner: req.body.owner,
  });

  return res.status(201).json(toPublicDocument(document));
}

function list(req, res) {
  const documents = documentService.listDocuments().map(toPublicDocument);
  return res.status(200).json(documents);
}

function download(req, res) {
  const document = documentService.getDocumentById(req.params.id);

  if (!document) {
    return res.status(404).json({ erro: 'Documento não encontrado.' });
  }

  const filePath = path.join(STORAGE_DIR, document.storedName);
  return res.download(filePath, document.originalName);
}

module.exports = { upload, list, download };
