import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      let list = await prisma.products.findMany({
        where: {
          isActive: true,
          destaque: true
        },
        include: {
          category: {
            select: {
              name: true
            }
          }
        }
      })
      return res.status(201).json(list)
    } catch (error) {
      return res.status(201).json([])
    }
  }