import multer from 'multer'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { prisma } from '../../../lib/prisma'

const upload = multer({
  storage: multer.diskStorage({
    destination: process.env.STATUS === 'HMG' ? '/var/www/arquivos_hmg' : '/var/www/arquivos',
    filename: (req, file, cb) => cb(null, file.originalname.toLocaleLowerCase()),
  }),
})

const apiRoute = nextConnect({
  onError(error, req: any, res: NextApiResponse<any>) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req: any, res: NextApiResponse<any>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

apiRoute.use(upload.array('files'))

apiRoute.post(async (req: any, res: NextApiResponse<any>) => {
  const files = req.files
  try {
    for await (let file of files) {
      const nameFile = file.originalname.toLowerCase()
      let url = `contemp.com.br/api/arquivos/${nameFile}`.replaceAll(' ','_')
      
      await prisma.files.create({
        data: {
          url: url,
          name: nameFile,
          created_at: new Date()
        }
      })
    }

    let user: any = JSON.parse(req.cookies['nextAuth.contemp'] as string)
    user = user?.body?.email || ''

    await prisma.logs.create({
      data: {
        user: user,
        description: `Subiu arquivos`
      }
    })

    return res.status(201).json({
      status: true
    })

  } catch (error) {
    console.log(error)
    return res.status(201).json({
      status: false
    })  }
})

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
export default apiRoute
