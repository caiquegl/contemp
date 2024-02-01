import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      if (req.method !== 'PUT') {
        return res.status(405).end()
      }

      const {order, card} = req.body

      const exist = await prisma.cards.findFirst({
        where: {
          order
        }
      })

      if(exist) {
        await prisma.cards.update({
          where: {
            id: exist.id
          },
          data: {
            order: 999999
          }
        })
      }

      await prisma.cards.update({
        where: {
          id: card.id
        },
        data: {
          order
        }
      })

      if(exist) {
        await prisma.cards.update({
          where: {
            id: exist.id
          },
          data: {
            order: card.order
          }
        })
      }

      return res.status(201).json({msg: 'Sucesso ao atualizar card.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao atualizar card.'})
    }
  }
