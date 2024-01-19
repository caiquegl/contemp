import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import fs from 'fs';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      
      await prisma.files.delete({
        where: {
          id: req.body.id
        }
      })

      fs.rmSync(`${process.env.STATUS === 'HMG' ? '/var/www/arquivos_hmg' : '/var/www/arquivos'}/${req.body.name}`)

      let user: any = JSON.parse(req.cookies['nextAuth.contemp'] as string)
      user = user?.body?.email || ''

      await prisma.logs.create({
        data: {
          user: user,
          description: `Apagou o arquivo ${req.body.name}`
        }
      })
  
      return res.status(201).json({status: true})
    } catch (error) {
      console.log(error)
      return res.status(400).json({status: false})
    }
  }