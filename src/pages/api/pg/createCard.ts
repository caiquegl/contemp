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

    const { icon, title, description, redirect } = req.body;

    const getLastOrder = await prisma.cards.findFirst({
      select: {
        order: true
      },
      orderBy: {
        order: 'desc'
      }
    })

    const newCard = await prisma.cards.create({
      data: {
        icon,
        title,
        description,
        redirect,
        order: getLastOrder ? getLastOrder.order + 1 : 1
      }
    })

    return res.status(201).json(newCard);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
