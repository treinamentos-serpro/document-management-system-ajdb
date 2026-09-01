import DownloadButton from './DownloadButton';

// Lista simples de documentos; a busca dos dados fica a cargo do componente pai.
export default function DocumentList({ documents }) {
  if (documents.length === 0) {
    return <p>Nenhum documento enviado ainda.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tamanho (bytes)</th>
          <th>Enviado em</th>
          <th>Dono</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document) => (
          <tr key={document.id}>
            <td>{document.originalName}</td>
            <td>{document.size}</td>
            <td>{new Date(document.uploadedAt).toLocaleString()}</td>
            <td>{document.owner}</td>
            <td>
              <DownloadButton document={document} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
