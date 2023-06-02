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

      const CATEGORY_SECUNDARY = await prisma.categories.findFirst({
        where: {
          name: 'CATEGORY_SECUNDARY'
        }
      })

      
      await prisma.categories.updateMany({
        where: {
          sub_category_id: body.id
        },
        data: {
          sub_category_id: CATEGORY_SECUNDARY?.id
        }
      })

      await prisma.home.updateMany({
        where: {
          category_id: body.id
        },
        data: {
          category_id: CATEGORY_SECUNDARY?.id
        }
      })


      await prisma.products.updateMany({
        where: {
          category_id: body.id
        },
        data: {
          category_id: CATEGORY_SECUNDARY?.id
        }
      })

      const category = await prisma.categories.findFirst({
        where: {
          id: body.id
        }
      })

      await prisma.categories.delete({
        where: {
          id: body.id
        }
      })

      let user: any = JSON.parse(req.cookies['nextAuth.contemp'] as string)
      user = user?.body?.email || ''

      await prisma.logs.create({
        data: {
          user: user,
          description: `Excluíu Categoria ${category?.name}`
        }
      })
     
      return res.status(201).json({msg: 'Sucesso ao deletar categoria.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao deletar categoria.'})
    }
  }