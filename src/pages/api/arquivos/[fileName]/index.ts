import fs from 'fs';
import path from 'path';

export default function handler(req: any, res: any) {
  const { fileName } = req.query;
  const directoryPath = process.env.STATUS === 'HMG' ? '/var/www/html/arquivos_hmg' : '/var/www/html/arquivos';

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Erro ao ler o diretório:", err);
      res.status(500).send("Erro ao buscar arquivos");
      return;
    }

    const matchingFiles = files.filter((file) => file.replaceAll('_', ' ').startsWith(fileName.replaceAll('_', ' ')));
    if (matchingFiles.length > 0) {
      const filePath = path.join(directoryPath, matchingFiles[0]);
      const fileStream = fs.createReadStream(filePath);

      const filename = matchingFiles[0];
      const encodedFilename = encodeURIComponent(filename);

      res.setHeader('Content-Disposition', 'inline; filename="' + encodedFilename + '"');

      // Define o tipo de conteúdo com base no tipo de arquivo
      const fileExtension = path.extname(filename).toLowerCase();
      const contentType = getContentType(fileExtension);
      console.log('Content-Type', contentType)
      res.setHeader('Content-Type', contentType);

      fileStream.pipe(res);
    } else {
      res.status(404).send("Arquivo não encontrado");
    }
  });
}

// Função auxiliar para obter o tipo de conteúdo com base na extensão do arquivo
function getContentType(fileExtension: string): string {
  switch (fileExtension) {
    case '.pdf':
      return 'application/pdf';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.mp4':
      return 'video/mp4';
    case '.exe':
      return 'application/octet-stream';
    case '.mp3':
      return 'audio/mpeg';
    case '.zip':
      return 'application/zip';
    case '.rar':
      return 'application/x-rar-compressed';
    // Adicione outros tipos de arquivo conforme necessário
    default:
      return 'application/octet-stream';
  }
}

