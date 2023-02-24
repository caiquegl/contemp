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
      const category = await prisma.categories.findFirst({
        where: {
          is_active: true,
          id: parseInt(username)
        }
      })
      
      return res.status(201).json(category)
    } catch (error) {
      return res.status(201).json({})
    }
  }