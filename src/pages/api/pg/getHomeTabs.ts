import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      const productHome = await prisma.home.findMany({
        include: {
          category: {
            select: {
              name: true
            },
          }
        }
      })
  
      return res.status(201).json(productHome)
    } catch (error) {
      return res.status(201).json([])

    }

  }