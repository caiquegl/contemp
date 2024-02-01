import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {

      const {is_active} = req.body

      let list = await prisma.cards.findMany({
        where: {
          is_active: is_active
        }
      })

      return res.status(201).json(list)
    } catch (error) {
      console.log(error)
      return res.status(201).json([])
    }
  }
