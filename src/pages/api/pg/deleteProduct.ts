import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      if (req.method !== 'POST') {
        return res.status(405).end()
      }

      const body = req.body      

      await prisma.products.delete({
        where: {
          id: body.id
        }
      })
     
      return res.status(201).json({msg: 'Sucesso ao deletar produto.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao deletar produto.'})
    }
  }