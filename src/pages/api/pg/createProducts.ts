import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method !== 'POST') {
      return res.status(405).end()
    }


    const { products } = req.body

    for await (const [index ,el] of products.entries()) {
      let data = await prisma.categories.findFirst({
        where: {
          firebase_id: el.category
        }
      })
      if(data) {

      await prisma.products.create({
        data: {
          description: el.description,
          category_id: data.id,
          name: el.name,
          urls: el.urls,
          destaque: el.destaque,
          description_seo: el.description_seo ? el.description_seo : '',
          key_word_seo: el.key_word_seo ? el.key_word_seo : '',
          hasVariation: el.hasVariation,
          isActive: el.is_active,
          listVariation: el.listVariation,
          tab: el.tab,
          call_product: el.call_product
        }
      })
      }
      console.log(index)

    }
    
    return res.status(201).json({})
  }