import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method !== 'POST') {
      return res.status(405).end()
    }


    const { homeTabs } = req.body
    for await (const el of homeTabs) {
      let data = await prisma.categories.findFirst({
        where: {
          firebase_id: el.category
        }
      })
      if(data) {
      await prisma.home.create({
        data: {
          description: el.description,
          category_id: data.id,
          indexProduct: el.indexProduct,
          name: el.name,
          urls: el.urls,
          destaque: el.destaque,
          icon: el.icon,
          link_name: el.link_name
        }
      })
      }


    }
    
    return res.status(201).json({})
  }