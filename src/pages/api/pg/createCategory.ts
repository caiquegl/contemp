import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method !== 'POST') {
      return res.status(405).end()
    }


    const { category } = req.body

    const is_main = category.filter((el: any) => el.is_main == 'true')

        for await (const main of is_main) {
        await prisma.categories.create({
            data: {
                description: main.description,
                description_seo: main.description_seo,
                key_word_seo: main.key_word_seo,
                name: main.name.trim(),
                order: main.order,
                favorite: main.favorite,
                is_active: main.is_active,
                is_main: true,
                url: main.url,
                firebase_id: main.id,
            }
        })
    }

    console.log(is_main.length)
    const categoryExist = await prisma.categories.findMany()

    
    for await (let father of categoryExist) {
        const is_sub = category.filter((el: any) => el.sub_categorie == father.firebase_id)
        for await (let sub of is_sub) {
            await prisma.categories.create({
                data: {
                    description: sub.description,
                    description_seo: sub.description_seo,
                    key_word_seo: sub.key_word_seo,
                    name: sub.name.trim(),
                    order: sub.order,
                    favorite: sub.favorite,
                    is_active: sub.is_active,
                    is_main: false,
                    url: sub.url,
                    firebase_id: sub.id,
                    sub_category_id: father.id
                }
            })
        }
    }

    // const categoryExist = await prisma.categories.findMany({
    //     where: {
    //         is_main: false
    //     }
    // })
    
    // for await (let father of categoryExist) {
    //     const is_sub = category.filter((el: any) => el.sub_categorie == father.firebase_id)
    //     for await (let sub of is_sub) {
    //         await prisma.categories.create({
    //             data: {
    //                 description: sub.description,
    //                 description_seo: sub.description_seo,
    //                 key_word_seo: sub.key_word_seo,
    //                 name: sub.name.trim(),
    //                 order: sub.order,
    //                 favorite: sub.favorite,
    //                 is_active: sub.is_active,
    //                 is_main: false,
    //                 url: sub.url,
    //                 firebase_id: sub.id,
    //                 sub_category_id: father.id
    //             }
    //         })
    //     }
    // }
    

  
    return res.status(201).json({})
  }