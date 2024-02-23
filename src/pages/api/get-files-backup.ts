import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import multer from 'multer';
import nextConnect from 'next-connect';
import { createSlug, SlugifyOptions } from './pg/slugfyfile';
import { dbContemp } from './database_contemp' // Importe a função de slugify

// Configuração do multer para o armazenamento de arquivos
const upload = multer({
  storage: multer.diskStorage({
    destination: process.env.STATUS === 'HMG' ? '/var/www/html/arquivos_hmg' : '/var/www/html/arquivos',
    filename: (req, file, cb) => {
      // Opções para a função de criação de slug
      const slugOptions: SlugifyOptions = {
        replacementChar: '_',
        removePunctuation: true,
        maxLength: 1500, // Ajuste conforme necessário
      };

      // Criar um nome de arquivo slugificado usando a função
      const slugifiedName = createSlug(file.originalname, slugOptions);
      cb(null, slugifiedName);
    },
  }),
  limits: {
    fileSize: 1073741824, // 10 megabytes (ajuste conforme necessário)
  },
});

// Função para baixar um arquivo de uma URL e salvá-lo localmente
async function downloadFile(url, localPath) {
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

// Dentro do seu manipulador de rota
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const all = await dbContemp('home')
      .where('id', 1)

    for await (let exist of all) {
      if (!exist) {
        throw new Error('Nenhum registro encontrado');
      }

      await dbContemp('home')
        .update('backup_icon', exist.icon)
        .where('id', exist.id)

      const iconUrl = exist.icon;

      // Extrair o nome do arquivo da URL
      const filenameMatch = iconUrl.match(/\/([^\/?#]+)[^\/]*$/);
      if (!filenameMatch) {
        throw new Error('Não foi possível extrair o nome do arquivo da URL.');
      }
// Extrair o nome do arquivo da URL
      const urlParts = iconUrl.split('/');
      const fileNameEncoded = urlParts[urlParts.length - 1].split('?')[0]; // Remove os parâmetros de consulta da URL
      let fileName = decodeURIComponent(fileNameEncoded);

      const extension = fileNameEncoded.split('.')[1].split('-')[0]
      fileName = `${fileName}.${extension}`
      console.log(fileName, fileNameEncoded)
// Verificar se o nome do arquivo foi obtido com sucesso
      if (!fileName) {
        throw new Error('Não foi possível obter o nome do arquivo da URL.');
      }

      // Download do arquivo de imagem
      const localFilePath = path.join(process.env.STATUS === 'HMG' ? '/var/www/html/arquivos_hmg' : '/var/www/html/arquivos', fileName);
      await downloadFile(iconUrl, localFilePath);

      await dbContemp('home')
        .update('icon', `contemp.com.br/api/arquivos/${fileName}`)
        .where('id', exist.id)
    }
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao processar a requisição.' });
  }
}

// Configuração da rota API para fazer o upload de arquivos
export const config = {
  api: {
    bodyParser: false,
  },
};

// Utilizar o middleware de upload para manipular arquivos
