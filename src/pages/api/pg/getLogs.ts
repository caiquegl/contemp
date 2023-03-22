import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      const logs = await prisma.logs.findMany({
        take: 120,
        orderBy: {
          created_at: 'desc'
        },
      })
        
      return res.status(201).json(logs)
    } catch (error) {
      return res.status(201).json([])

    }

  }