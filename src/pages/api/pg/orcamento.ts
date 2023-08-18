import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      await prisma.orcamento.create({
        data: {
          ...req.body
        }
      })

      return res.status(201).json({status: true})
    } catch (error) {
      console.log(error)
      return res.status(201).json({status: false})
    }
  }