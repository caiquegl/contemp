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

      const exist = await prisma.categories.findFirst({
        where: {
          name: body.name
        }
      })

      if(exist) return res.status(500).json({msg: 'Nome já existe'})

      const getLastOrder = await prisma.categories.findFirst({
        select: {
          order: true
        },
        orderBy: {
          order: 'desc'
        }
      })

      if(getLastOrder) {

        await prisma.categories.create({
          data: {
            ...body,
            is_main: body.is_main === 'true' ? true : false,
            order: getLastOrder.order + 1,
            sub_category_id: body.sub_category_id ? body.sub_category_id : null
          }
        })

      } else {
        return res.status(500).json({msg: 'Erro ao verificar a ordem.'})
      }

      let user: any = JSON.parse(req.cookies['nextAuth.contemp'] as string)
      user = user?.body?.email || ''

      await prisma.logs.create({
        data: {
          user: user,
          description: `Criou Categoria ${body.name}`
        }
      })

     

      return res.status(201).json({msg: 'Sucesso ao criar categoria.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao criar categoria.'})
    }
  }