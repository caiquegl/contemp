// pages/api/toggleDestaqueProduct.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { productId, destaque } = req.body;

    // Lógica do Prisma para alterar o destaque
    await prisma.products.update({
      where: { id: productId },
      data: {
        destaque: destaque,
      },
    });

    await prisma.$disconnect();

    return res.status(201).json({ msg: 'Destaque alterado com sucesso' });
  } catch (error) {
    await prisma.$disconnect();

    return res.status(500).json({ msg: 'Erro ao alterar destaque' });
  }
}
