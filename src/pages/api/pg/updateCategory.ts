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
          is_main: body.is_main === 'true' || body.is_main === true ? true : false,
          sub_category_id: body.is_main === 'true' || body.is_main === true ? null : body.sub_category_id ? body.sub_category_id : null,
          updated_at: new Date(),
        }
      })

      let user: any = JSON.parse(req.cookies['nextAuth.contemp'] as string)
      user = user?.body?.email || ''

      await prisma.logs.create({
        data: {
          user: user,
          description: `Editou Categoria ${body.name}`
        }
      })
  
      return res.status(201).json({msg: 'Sucesso ao atualizar categoria.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao atualizar categoria.'})
    }
  }