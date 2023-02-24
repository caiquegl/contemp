import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      if (req.method !== 'GET') {
        return res.status(405).end()
      }
    
      const username = String(req.query.username)
      const product = await prisma.products.findFirst({
        where: {
          isActive: true,
          id: parseInt(username)
        }
      })
      
      return res.status(201).json(product)
    } catch (error) {
      return res.status(201).json({})
    }
  }