import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { dbContemp } from '../database_contemp'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      if (req.method !== 'POST') {
        return res.status(405).end()
      }

      const body = req.body

      const exist = await prisma.products.findFirst({
        where: {
          name: body.name,
          id: {
            not: body.id
          }
        }
      })

      if(exist) return res.status(500).json({msg: 'Nome já existe'})
      // await prisma.products.update({
      //   where: {
      //     id: body.id
      //   },
      //   data: {
      //     description: body.description,
      //     description_seo: body.description_seo,
      //     key_word_seo: body.key_word_seo,
      //     name: body.name,
      //     category_id: body.category,
      //     destaque: body.destaque,
      //     hasVariation: body.hasVariation,
      //     isActive: body.is_active,
      //     listVariation: body.listVariation ? body.listVariation : undefined,
      //     tab: body.tab,
      //     urls: body.urls,
      //     call_product: body.call_product,
      //     layout: body.layout,
      //     updated_at: new Date(),
      //   }
      // })

      await dbContemp('products').update({
        description: body.description,
          description_seo: body.description_seo,
          key_word_seo: body.key_word_seo,
          name: body.name,
          category_id: body.category,
          destaque: body.destaque,
          hasVariation: body.hasVariation,
          isActive: body.is_active,
          listVariation: body.listVariation ? JSON.stringify(body.listVariation) : undefined,
          tab: body.tab ? JSON.stringify(body.tab) : undefined,
          urls: body.urls ? JSON.stringify(body.urls) : undefined,
          call_product: body.call_product,
          layout: body.layout ? parseInt(body.layout) : undefined,
          updated_at: new Date()
      }).where('id', '=', body.id)

      let user: any = JSON.parse(req.cookies['nextAuth.contemp'] as string)
      user = user?.body?.email || ''

      await prisma.logs.create({
        data: {
          user: user,
          description: `Editou Produto ${body.name}`
        }
      })
     

      return res.status(201).json({msg: 'Sucesso ao criar/atualizar produto.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao criar/atualizar produto.'})
    }
  }