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

    const username = String(req.query.username)
    const allCategoryActives = await prisma.categories.findFirst({
      where: {
        is_active: true,
        name: {
          contains: username.trim(),
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

    allSubCategory.forEach((cg) => category_ids.push(cg.id))
    category_ids.push(allCategoryActives.id)

    const products = await prisma.products.findMany({
      where: {
        isActive: true,
        category_id: {
          in: category_ids
        }
      }
    })

    return res.status(201).json({ products: products, category: allCategoryActives })
  } catch (error) {
    console.log(error)
    return res.status(201).json([])
  }
}