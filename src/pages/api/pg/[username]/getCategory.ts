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

    const category_ids: number[] = [allCategoryActives.id]

    const fetchSubcategories = async (categoryId: number) => {
      const subcategories = await prisma.categories.findMany({
        select: {
          id: true
        },
        where: {
          is_active: true,
          sub_category_id: categoryId
        }
      })
      category_ids.push(...subcategories.map((cg) => cg.id))
      await Promise.all(subcategories.map(async (subCat) => await fetchSubcategories(subCat.id)))
    }

    await fetchSubcategories(allCategoryActives.id)

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

    return res.status(201).json({ products, category: allCategoryActives })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
