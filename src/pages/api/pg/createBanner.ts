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

    const { url_file, type, title, subtitle, description, redirect } = req.body;

    const getLastOrder = await prisma.banners.findFirst({
      select: {
        order: true
      },
      orderBy: {
        order: 'desc'
      }
    })

    const newBanner = await prisma.banners.create({
      data: {
        url: url_file,
        type,
        title,
        subtitle,
        description,
        redirect,
        order: getLastOrder ? getLastOrder.order + 1 : 1
      }
    })

    return res.status(201).json(newBanner);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
