import fs from 'fs';
import path from 'path';

export default function handler(req: any, res: any) {
  const { fileName } = req.query;
  const directoryPath = process.env.STATUS === 'HMG' ? '/var/www/html/arquivos_hmg' : '/var/www/html/arquivos';

  let extension = fileName.split('.')
  // Lê o conteúdo do arquivo
  const conteudo = fs.readFileSync(path.join(directoryPath, fileName));

  // Define o tipo de conteúdo como imagem
  res.setHeader('Content-Type', getContentType(extension[extension.length - 1])); // Aqui você pode ajustar o tipo conforme necessário

  // Retorna o conteúdo do arquivo como resposta
  res.end(conteudo);

  // Importante: Como estamos retornando diretamente a resposta aqui,
  // não é necessário retornar nada em `props`.
  return {
    props: {},
  };
}

// Função auxiliar para obter o tipo de conteúdo com base na extensão do arquivo
function getContentType(fileExtension: string): string {
  switch (fileExtension) {
    case 'pdf':
      return 'application/pdf';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'mp4':
      return 'video/mp4';
    case 'exe':
      return 'application/octet-stream';
    case 'mp3':
      return 'audio/mpeg';
    case 'zip':
      return 'application/zip';
    case 'rar':
      return 'application/x-rar-compressed';
    case 'svg':
      return 'image/svg+xml';
    // Adicione outros tipos de arquivo conforme necessário
    default:
      return 'application/octet-stream';
  }
}

