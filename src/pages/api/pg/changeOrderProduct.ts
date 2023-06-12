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

      const {order, product} = req.body

      const exist = await prisma.products.findFirst({
        where: {
          order
        }
      })

      if(exist) {
        await prisma.products.update({
          where: {
            id: exist.id
          },
          data: {
            order: 999999
          }
        })
      }

      await prisma.products.update({
        where: {
          id: product.id
        },
        data: {
          order
        }
      })

      if(exist) {
        await prisma.products.update({
          where: {
            id: exist.id
          },
          data: {
            order: product.order
          }
        })
      }


      const cat = await prisma.products.findFirst({
        where: {
          id: product.id
        }
      })

      let user: any = JSON.parse(req.cookies['nextAuth.contemp'] as string)
      user = user?.body?.email || ''

      await prisma.logs.create({
        data: {
          user: user,
          description: `Atualizou ordem da categoria ${cat?.name}`
        }
      })
  
      return res.status(201).json({msg: 'Sucesso ao atualizar categoria.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao atualizar categoria.'})
    }
  }