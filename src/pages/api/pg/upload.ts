import multer from 'multer';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

interface MulterRequest extends NextApiRequest {
  file: Express.Multer.File;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'documentos'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default async function handler(
  req: MulterRequest,
  res: NextApiResponse,
) {
  // upload.single('file')(req, res, function (err: any) {
  //   if (err) {
  //     return res.status(500).send(err);
  //   }

  //   const filename = req.file.filename;
  //   const fileUrl = `/documentos/${filename}`;
    res.status(200).send(true);
  ;
}
