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
      console.log(body)
      const exist = await prisma.home.findFirst({
        where: {
          indexProduct: body.indexProduct
        }
      })

      if(exist) {
        await prisma.home.update({
          where: {
            id: exist.id
          },
          data: {
            category_id: body.category,
            description: body.description,
            destaque: false,
            icon: body.icon,
            indexProduct: body.indexProduct,
            link_name: body.link_name,
            name: body.name,
            urls: body.urls
          }
        })
      } else {
        await prisma.home.create({
          data: {
            category_id: body.category,
            description: body.description,
            destaque: false,
            icon: body.icon,
            indexProduct: body.indexProduct,
            link_name: body.link_name,
            name: body.name,
            urls: body.urls
          }
        })
      }

      return res.status(201).json({msg: 'Sucesso ao criar item na home.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao criar item na home.'})
    }
  }