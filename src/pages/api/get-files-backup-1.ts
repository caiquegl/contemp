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
    const all = await dbContemp('home');

    for await (let exist of all) {
      if (!exist) {
        throw new Error('Nenhum registro encontrado');
      }

      await dbContemp('home')
        .update({
          'backup_icon': exist.backup_icon ? undefined :  exist.icon,
          'backup_url': exist.backup_url ? undefined : JSON.stringify(exist.urls)

        })
        .where('id', exist.id);

      const iconUrl = exist.icon;
      const fileName = getFileNameFromUrl(iconUrl);
      const localFilePath = path.join(process.env.STATUS === 'HMG' ? '/var/www/html/arquivos_hmg' : '/var/www/html/arquivos', fileName);
      await downloadFile(iconUrl, localFilePath);

      const baseUrl = process.env.STATUS === 'HMG' ? 'https://hmg.contemp.com.br/' : 'https://contemp.com.br/';
      await dbContemp('home')
        .update('icon', `${baseUrl}api/pictures/${fileName}`)
        .where('id', exist.id);

      let newUrls = [];

      for await (let item of exist.urls) {
        const old_url = item;
        const fileName = getFileNameFromUrl(old_url);
        const localFilePath = path.join(process.env.STATUS === 'HMG' ? '/var/www/html/arquivos_hmg' : '/var/www/html/arquivos', fileName);
        await downloadFile(old_url, localFilePath);
        const baseUrl = process.env.STATUS === 'HMG' ? 'https://hmg.contemp.com.br/' : 'https://contemp.com.br/';
        newUrls.push(`${baseUrl}api/pictures/${fileName}`);
      }
      await dbContemp('home')
        .update('urls', JSON.stringify(newUrls))
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
