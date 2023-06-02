import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      const categoryMain = await prisma.categories.findMany({
        where: {
          is_main: true,
          is_active: true,
          name: {
            not: 'CATEGORY_SECUNDARY'
          }
        },
        orderBy: {
          order: 'asc'
        }
      })
  
      let list_menu = []
      
      for await (let [index, main] of categoryMain.entries()) {
        let body: any = {
          title: main.name,
          url: main.url,
          order: index,
          name: main.name,
          label: main.name,
          id: main.id,
          key: main.name,
          children: []
        }
  
        const sub = await prisma.categories.findMany({
          where: {
            sub_category_id: main.id,
            is_active: true,
          },
          orderBy: {
            order: 'asc'
          }
        })
  
        for await (let sub_category of sub) {
          let bodySub = {
            title: sub_category.name,
            url: sub_category.url,
            order: sub_category.order,
            name: sub_category.name,
            label: sub_category.name,
            id: sub_category.id,
            key: sub_category.name,
          }
  
          body.children.push(bodySub)
  
        }
        list_menu.push(body)
      }
      return res.status(201).json(list_menu)
    } catch (error) {
      return res.status(201).json([])

    }

  }