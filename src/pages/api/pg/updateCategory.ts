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

      const body = req.body
      const exist = await prisma.categories.findFirst({
        where: {
          id: {
            not: body.id
          },
          name: body.name,
        }
      })


      if(exist) return res.status(500).json({msg: 'Nome já existe'})

      await prisma.categories.update({
        where: {
          id: body.id
        },
        data: {
          ...body,
          is_main: body.is_main === 'true' ? true : false,
          sub_category_id: body.is_main === 'true' ? null : body.sub_category_id ? body.sub_category_id : null
        }
      })
  
      return res.status(201).json({msg: 'Sucesso ao atualizar categoria.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao atualizar categoria.'})
    }
  }