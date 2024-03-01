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

      const {id, status} = req.body

      const exist = await prisma.menus.findFirst({
        where: {
          id
        }
      })

      if(exist) {
        await prisma.menus.update({
          where: {
            id: exist.id
          },
          data: {
            status: status
          }
        })
      }

      return res.status(201).json({msg: 'Sucesso ao atualizar manuais.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao atualizar manuais.'})
    }
  }
