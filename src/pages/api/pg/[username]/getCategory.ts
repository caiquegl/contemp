import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end()
    }

    const username = String(req.query.username).replaceAll('7777', '/')
    const allCategoryActives = await prisma.categories.findFirst({
      where: {
        is_active: true,
        name: {
          equals: username.trim(),
          mode: 'insensitive'
        }
      }
    })


    if (!allCategoryActives) return res.status(201).json([])

    let category_ids: number[] = []

    const allSubCategory = await prisma.categories.findMany({
      select: {
        id: true
      },
      where: {
        is_active: true,
        sub_category_id: allCategoryActives.id
      }
    })

    
    const allSubCategory2 = await prisma.categories.findMany({
      select: {
        id: true
      },
      where: {
        is_active: true,
        sub_category_id: {
         in: allSubCategory.map((cg) => cg.id)
        }
      }
    })

    const allSubCategory3 = await prisma.categories.findMany({
      select: {
        id: true
      },
      where: {
        is_active: true,
        sub_category_id: {
         in: allSubCategory2.map((cg) => cg.id)
        }
      }
    })


    
    const allSubCategory4 = await prisma.categories.findMany({
      select: {
        id: true
      },
      where: {
        is_active: true,
        sub_category_id: {
         in: allSubCategory3.map((cg) => cg.id)
        }
      }
    })

    allSubCategory.forEach((cg) => category_ids.push(cg.id))
    allSubCategory2.forEach((cg) => category_ids.push(cg.id))
    allSubCategory3.forEach((cg) => category_ids.push(cg.id))
    allSubCategory4.forEach((cg) => category_ids.push(cg.id))
    
    const products = await prisma.products.findMany({
      where: {
        isActive: true,
        category_id: {
          in: category_ids
        }
      },
      orderBy: {
        order: 'asc'
      }
    })

    return res.status(201).json({ products: products, category: allCategoryActives })
  } catch (error) {
    console.log(error)
    return res.status(201).json([])
  }
}