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

    const { url_file, type, title, subtitle, description, redirect, id } = req.body;

    await prisma.banners.update({
      where: {
        id: id
      },
      data: {
        url: url_file,
        type,
        title,
        subtitle,
        description,
        redirect,
        updated_at: new Date(),
      }
    })

    return res.status(201).json(true);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
