import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbContemp } from './database_contemp';

export default async function handler(req: any, res: any) {
  try {
    const all = await dbContemp('categories')
      .whereNotNull('backup_url');

    for await (let item of all) {
      await dbContemp('categories')
        .update('urlPicture', item.backup_urlPicture)
        .where('id', item.id)
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
