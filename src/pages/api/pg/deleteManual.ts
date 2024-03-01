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

      await prisma.menus.delete({
        where: {
          id: body.id
        }
      })

      return res.status(201).json([])
    } catch (error) {
      console.log(error)
      return res.status(201).json([])
    }
  }
