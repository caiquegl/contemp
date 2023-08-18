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

      const products = await prisma.products.findMany({
        where: {
          id: {
            in: body.products
          }
        }
      })

     

      return res.status(201).json(products)
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro.'})
    }
  }