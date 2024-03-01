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

      const {order, manual} = req.body

      const exist = await prisma.menus.findFirst({
        where: {
          order
        }
      })

      if(exist) {
        await prisma.menus.update({
          where: {
            id: exist.id
          },
          data: {
            order: 999999
          }
        })
      }

      await prisma.menus.update({
        where: {
          id: manual.id
        },
        data: {
          order
        }
      })

      if(exist) {
        await prisma.menus.update({
          where: {
            id: exist.id
          },
          data: {
            order: manual.order
          }
        })
      }

      return res.status(201).json({msg: 'Sucesso ao atualizar manuais.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao atualizar manuais.'})
    }
  }
