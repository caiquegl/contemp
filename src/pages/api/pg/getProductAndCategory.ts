import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      let list = await prisma.categories.findMany({
        where: {
          is_active: true,
        }
      })

      let listProducts = await prisma.products.findMany({
        where: {
          isActive: true,
        }
      })

      
      return res.status(201).json([...list, ...listProducts])
    } catch (error) {
      console.log(error)
      return res.status(201).json([])
    }
  }