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

      await prisma.redirectsUrls.update({
        where: {
          id: body.id
        },
        data: {
          source: !body.source.startsWith('/') ? `/${body.source.replaceAll(' ', '')}` : body.source.replaceAll(' ', '') ,
          destination: !body.destination.startsWith('/') ? `/${body.destination.replaceAll(' ', '')}` : body.destination.replaceAll(' ', '') ,
          updated_at: new Date(),
        }
      })

      return res.status(201).json([])
    } catch (error) {
      console.log(error)
      return res.status(201).json([])
    }
  }