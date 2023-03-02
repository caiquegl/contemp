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

      await prisma.categories.updateMany({
        where: {
          sub_category_id: body.id
        },
        data: {
          sub_category_id: 59
        }
      })

      await prisma.home.updateMany({
        where: {
          category_id: body.id
        },
        data: {
          category_id: 59
        }
      })


      await prisma.products.updateMany({
        where: {
          category_id: body.id
        },
        data: {
          category_id: 59
        }
      })

      await prisma.categories.delete({
        where: {
          id: body.id
        }
      })
     
      return res.status(201).json({msg: 'Sucesso ao deletar categoria.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao deletar categoria.'})
    }
  }