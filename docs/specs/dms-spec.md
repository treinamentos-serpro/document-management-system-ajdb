# Especificação - Document Management System (DMS)

## 1. Objetivo

Prover uma aplicação web simples para upload, listagem e download de
documentos, com armazenamento estritamente local e gestão básica por usuário.

## 2. Escopo

### Dentro do escopo

- Upload de documentos
- Listagem de documentos
- Download de documentos
- Gestão simples por usuário (identificação do dono via campo `owner`)

### Fora do escopo

- Armazenamento externo ou em nuvem
- Versionamento de documentos
- Autenticação/autorização completa (login, sessões, permissões granulares)
- Edição ou exclusão de documentos

## 3. Requisitos funcionais

| ID    | Requisito                                                              |
| ----- | ----------------------------------------------------------------------- |
| RF-01 | O usuário pode enviar um documento via `POST /upload`                  |
| RF-02 | O usuário pode listar os documentos enviados via `GET /documents`       |
| RF-03 | O usuário pode baixar um documento pelo identificador via `GET /documents/:id/download` |
| RF-04 | O sistema deve associar cada documento a um `owner` (identificador de usuário) |
| RF-05 | O sistema deve rejeitar upload sem arquivo anexado, retornando erro claro |
| RF-06 | O sistema deve retornar erro 404 ao tentar baixar um documento inexistente |

## 4. Requisitos não funcionais

| ID     | Requisito                                                          |
| ------ | ------------------------------------------------------------------- |
| RNF-01 | Arquivos gravados no filesystem local (`backend/storage`) via `multer` com `diskStorage` |
| RNF-02 | Metadados dos documentos mantidos em memória nesta fase inicial      |
| RNF-03 | Configuração via variáveis de ambiente (12-Factor App), ex.: `PORT`  |
| RNF-04 | Backend em Node.js + Express (CommonJS), sem TypeScript              |
| RNF-05 | Frontend em React + Vite (ESM), comunicação via `fetch` com prefixo `/api` |
| RNF-06 | Testes de backend com o runner nativo `node:test`                    |
| RNF-07 | Tratamento de erros nos limites do sistema (entrada HTTP, leitura/escrita de arquivos) |
| RNF-08 | Código sem overengineering; funções pequenas e de responsabilidade única |

## 5. Modelo de dados (metadados do documento)

| Campo        | Tipo   | Descrição                                          |
| ------------ | ------ | --------------------------------------------------- |
| id           | string | Identificador único do documento (ex.: UUID)         |
| originalName | string | Nome original do arquivo enviado                     |
| storedName   | string | Nome do arquivo gravado no disco (evita colisões)    |
| mimeType     | string | Tipo MIME do arquivo                                 |
| size         | number | Tamanho em bytes                                     |
| uploadedAt   | string | Data/hora do upload (ISO 8601)                       |
| owner        | string | Identificador do usuário dono                        |

> Armazenamento em memória: um array/Map mantido pelo repository, sem
> persistência em banco de dados nesta fase.

## 6. Contratos de API

Todas as respostas em JSON, exceto o download (binário). Prefixo de proxy no
frontend: `/api`.

### POST /upload

- **Entrada**: `multipart/form-data`
  - Campo de arquivo: `file`
  - Campo opcional: `owner` (string; se ausente, usar um valor padrão, ex.: `"anonimo"`)
- **Saída 201**:
  ```json
  {
    "id": "uuid",
    "originalName": "contrato.pdf",
    "size": 10240,
    "uploadedAt": "2026-09-01T12:00:00.000Z",
    "owner": "anonimo"
  }