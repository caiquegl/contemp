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

    const { name, email, password, picture } = req.body;

    // Verificar se o email já existe
    const userExists = await prisma.users.findMany({
      where: {
        email: {
          in: [email]
        }
      }
    });

    if (userExists.length > 0) {
      throw new Error('Usuário já cadastrado');
    }

    const PASSWORD = password

    const url = 'https://www.toptal.com/developers/bcrypt/api/generate-hash.json';
    const body_url = `cost=10&password=${PASSWORD}`;

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

    const hash = data.hash

    // Criar o novo usuário
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        picture,
        password: hash,
        super_adm: false
      }
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
