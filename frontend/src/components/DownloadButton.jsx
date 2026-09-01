import { getDownloadUrl } from '../services/documentService';

// Link estilizado como botão: aciona o download nativo do navegador via GET.
export default function DownloadButton({ document }) {
  return (
    <a href={getDownloadUrl(document.id)} download={document.originalName}>
      Baixar
    </a>
  );
}
