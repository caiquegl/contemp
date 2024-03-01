import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { url, name, picture} = req.body;

    const getLastOrder = await prisma.menus.findFirst({
      select: {
        order: true
      },
      orderBy: {
        order: 'desc'
      }
    })

    const newBanner = await prisma.menus.create({
      data: {
        url,
        name,
        picture,
        order: getLastOrder ? getLastOrder.order + 1 : 1
      }
    })

    return res.status(201).json(newBanner);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
