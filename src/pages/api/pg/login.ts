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

    const { email, password } = req.body;

    const userExists = await prisma.users.findFirst({
      where: {
        email: {
          in: [email]
        }
      }
    });

    if (!userExists) throw new Error('EMAIL_NOT_FOUND');
    if (!compareSync(password, userExists.password)) throw new Error('SENHA INVALIDA');

    return res.status(201).json(userExists);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
