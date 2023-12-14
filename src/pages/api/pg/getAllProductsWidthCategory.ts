import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      let list = await prisma.products.findMany({
        include: {
          category: true
        },
        orderBy: {
          order: 'asc'
        }
      })
      console.log(list[0])
      return res.status(201).json(list)
    } catch (error) {
      console.log(error)
      return res.status(201).json([])
    }
  }