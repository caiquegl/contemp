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

      const exist = await prisma.products.findFirst({
        where: {
          name: body.name
        }
      })

      if(exist) return res.status(500).json({msg: 'Nome já existe'})
     
      await prisma.products.create({
        data: {
          description: body.description,
          description_seo: body.description_seo,
          key_word_seo: body.key_word_seo,
          name: body.name,
          category_id: body.category,
          destaque: body.destaque,
          hasVariation: body.hasVariation,
          isActive: body.is_active,
          listVariation: body.listVariation ? body.listVariation : undefined,
          tab: body.tab,
          urls: body.ul,
          call_product: body.call_product
        }
      })
     

      return res.status(201).json({msg: 'Sucesso ao criar produto.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao criar produto.'})
    }
  }