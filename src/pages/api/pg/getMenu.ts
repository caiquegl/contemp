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
          let bodySub: any = {
            title: sub_category.name,
            url: sub_category.url,
            order: sub_category.order,
            name: sub_category.name,
            label: sub_category.name,
            id: sub_category.id,
            key: sub_category.name,
            children: []
          }

          const sub3 = await prisma.categories.findMany({
            where: {
              sub_category_id: sub_category.id,
              is_active: true,
            },
            orderBy: {
              order: 'asc'
            }
          })

          for await (let sub_category3 of sub3) {
            let bodySub3: any = {
              title: sub_category3.name,
              url: sub_category3.url,
              order: sub_category3.order,
              name: sub_category3.name,
              label: sub_category3.name,
              id: sub_category3.id,
              key: sub_category3.name,
              children: []
            }

            const sub4 = await prisma.categories.findMany({
              where: {
                sub_category_id: sub_category3.id,
                is_active: true,
              },
              orderBy: {
                order: 'asc'
              }
            })

            for await (let sub_category4 of sub4) {
              let bodySub4: any = {
                title: sub_category4.name,
                url: sub_category4.url,
                order: sub_category4.order,
                name: sub_category4.name,
                label: sub_category4.name,
                id: sub_category4.id,
                key: sub_category4.name,
              }

              bodySub3.children.push(bodySub4)

            }

            if(bodySub3.children && bodySub3.children.length === 0) delete bodySub3.children

            bodySub.children.push(bodySub3)

          }


          if(bodySub.children && bodySub.children.length === 0) delete bodySub.children

          body.children.push(bodySub)
  
        }
        list_menu.push(body)
      }
      return res.status(201).json(list_menu)
    } catch (error) {
      return res.status(201).json([])

    }

  }