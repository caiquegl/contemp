import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbContemp } from './database_contemp';

async function downloadFile(url: string, localPath: string) {
  const writer = fs.createWriteStream(localPath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

function getFileNameFromUrl(url: string) {
  const filenameMatch = url.match(/\/([^\/?#]+)[^\/]*$/);
  if (!filenameMatch) {
    throw new Error('Não foi possível extrair o nome do arquivo da URL.');
  }
  const fileNameEncoded = filenameMatch[1].split('?')[0];
  const fileNameDecoded = decodeURIComponent(fileNameEncoded);
  const extension = fileNameDecoded.split('.')[1].split('-')[0];
  return `${fileNameDecoded}.${extension}`;
}

export default async function handler(req: any, res: any) {
  try {
    const all = await dbContemp('categories');

    for await (let exist of all) {
      if (!exist) {
        throw new Error('Nenhum registro encontrado');
      }

      await dbContemp('categories')
        .update({
          'backup_urlPicture': exist.backup_urlPicture ? undefined :  exist.urlPicture,
        })
        .where('id', exist.id);

      const url = exist.urlPicture;
      const fileName = getFileNameFromUrl(url);
      const localFilePath = path.join(process.env.STATUS === 'HMG' ? '/var/www/html/arquivos_hmg' : '/var/www/html/arquivos', fileName);
      await downloadFile(url, localFilePath);

      const baseUrl = process.env.STATUS === 'HMG' ? 'https://hmg.contemp.com.br/' : 'https://contemp.com.br/';
      await dbContemp('categories')
        .update('urlPicture', `${baseUrl}api/pictures/${fileName}`)
        .where('id', exist.id);

    }
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao processar a requisição.' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
