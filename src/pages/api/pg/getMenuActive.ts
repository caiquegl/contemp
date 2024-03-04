import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      let list = await prisma.menus.findMany({
        where: {
          status: true,
        }
      })
      return res.status(201).json(list)
    } catch (error) {
      console.log(error)
      return res.status(201).json([])
    }
  }