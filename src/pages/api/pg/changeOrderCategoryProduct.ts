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

      const {order_all_products, category} = req.body

      const exist = await prisma.categories.findFirst({
        where: {
          order_all_products
        }
      })

      if(exist) {
        await prisma.categories.update({
          where: {
            id: exist.id
          },
          data: {
            order_all_products: 999999
          }
        })
      }

      await prisma.categories.update({
        where: {
          id: category.id
        },
        data: {
          order_all_products
        }
      })
      if(exist) {
        await prisma.categories.update({
          where: {
            id: exist.id
          },
          data: {
            order_all_products: category.order_all_products
          }
        })
      }

      // await prisma.categories.update({
      //   where: {
      //     id: body.id
      //   },
      //   data: {
      //     ...body,
      //     is_main: body.is_main === 'true' ? true : false,
      //     sub_category_id: body.is_main === 'true' ? null : body.sub_category_id ? body.sub_category_id : null
      //   }
      // })

      const cat = await prisma.categories.findFirst({
        where: {
          id: category.id
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