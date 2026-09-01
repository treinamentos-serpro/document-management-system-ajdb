// Persistência dos metadados dos documentos em memória.

const documents = [];

function save(document) {
  documents.push(document);
  return document;
}

function findAll() {
  return documents;
}

function findById(id) {
  return documents.find((document) => document.id === id);
}

module.exports = { save, findAll, findById };
