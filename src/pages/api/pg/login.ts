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

    const { email, password } = req.body;

    const userExists = await prisma.users.findFirst({
      where: {
        email: {
          in: [email]
        }
      }
    });


    if (!userExists) throw new Error('EMAIL_NOT_FOUND');

    const HASH = userExists.password
    const PASSWORD = password

    const url = 'https://www.toptal.com/developers/bcrypt/api/check-password.json';
    const body_url = `hash=${HASH}&password=${PASSWORD}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body_url,
    });

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.statusText}`);
    }

    const data = await response.json();


    if (!data.ok) throw new Error('SENHA INVALIDA');

    return res.status(201).json(userExists);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
