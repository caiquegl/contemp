import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { compareSync } from 'bcrypt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { id } = req.body;

    const userExists = await prisma.users.findFirst({
      where: {
        id: {
          in: [id]
        }
      }
    });

    return res.status(201).json(userExists);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
