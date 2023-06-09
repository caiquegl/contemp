import fs from 'fs';
import path from 'path';

export default function handler(req: any, res: any) {
  const { fileName } = req.query;
  const directoryPath =  process.env.STATUS === 'HMG' ? '/var/www/arquivos_hmg' : '/var/www/arquivos'
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Erro ao ler o diretório:", err);
      res.status(500).send("Erro ao buscar arquivos");
      return;
    }

    const matchingFiles = files.filter((file) => file.startsWith(fileName.replaceAll('_', ' ')));

    if (matchingFiles.length > 0) {
      const filePath = path.join(directoryPath, matchingFiles[0]);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${matchingFiles[0]}"`
      );
      res.setHeader('Content-Type', 'application/octet-stream');
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.status(404).send("Arquivo não encontrado");
    }
  });
}
