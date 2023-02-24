import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      let categories = await prisma.categories.findMany({
        where: {
          favorite: true,
          is_active: true
        }
      })

      let list: any = []

      for await (const category of categories) {

        let subCategory = await prisma.categories.findMany({
          select: {
            id: true
          },
          where: {
            sub_category_id: category.id,
            is_active: true
          }
        })

        subCategory.push({id: category.id})

        let prods = await prisma.products.findMany({
          where: {
            category_id: {
              in: subCategory.map((el) => el.id)
            },
            isActive: true
          },
          
        })





        list.push({
          category_name: category.name,
          category_id: category.id,
          products: prods
        })
      }

      return res.status(201).json(list)
    } catch (error) {
      console.log(error)
      return res.status(201).json([])
    }
  }