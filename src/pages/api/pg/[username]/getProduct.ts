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
    const product = await prisma.products.findFirst({
      where: {
        isActive: true,
        name: {
          equals: username.replaceAll('333', '/').trim(),
          mode: 'insensitive'
        }
      }
    })

    if (!product) return res.status(201).json([])


    let category_ids: number[] = []

    const category = await prisma.categories.findFirst({
      select: {
        id: true,
        name: true,
        sub_category_id: true
      },
      where: {
        is_active: true,
        id: product.category_id
      }
    })

    if (!category) return res.status(201).json([])

    category_ids.push(product.category_id)

    const sub_category = await prisma.categories.findMany({
      where: {
        is_active: true,
        sub_category_id: category.id
      }
    })

    sub_category.forEach((cg) => category_ids.push(cg.id))

    const products = await prisma.products.findMany({
      where: {
        isActive: true,
        category_id: {
          in: category_ids
        }
      }
    })

    let bradName = []
    if (category.sub_category_id) {
      const firstCategory = await prisma.categories.findFirst({
        where: {
          is_active: true,
          id: category.sub_category_id
        }
      })
      if (firstCategory) bradName.push(firstCategory.name)
    }
    bradName.push(category.name)

    return res.status(201).json({ detail: product, allProducts: products, bradName })
  } catch (error) {
    console.log(error)
    return res.status(201).json([])
  }
}