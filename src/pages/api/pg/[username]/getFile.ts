import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    
    const filename = String(req.query.username)
  
    if (!filename) {
      return res.status(400).send('É necessário fornecer um nome de arquivo.');
    }
  
    const filePath = path.join('../../../', 'documentos', filename.toString());
  
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('Arquivo não encontrado.');
    }
  
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.log(error,' error')
  }
}
