import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { hashSync } from 'bcrypt'

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

    // Criar o hash da senha
    const hash = hashSync(password, 10);

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
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
