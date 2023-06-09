import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import products from '../../../../backup/public_products_export_2023-06-09_102108.json'
import logs from '../../../../backup/public_logs_export_2023-06-09_102156.json'
import home from '../../../../backup/public_home_export_2023-06-09_102207.json'
import category from '../../../../backup/public_categories_export_2023-06-09_102214.json'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method !== 'POST') {
      return res.status(405).end()
    }

    for await (let item of category){
        await prisma.categories.create({
            data: {
               description: item.description,
               description_seo: item.description_seo,
               key_word_seo: item.key_word_seo,
               name: item.name,
               order: item.order,
               all_product: item.all_product,
               favorite: item.favorite,
               filter: item.filter,
               firebase_id: item.firebase_id,
               is_active: item.is_active,
               is_main: item.is_main,
               order_all_products: item.order_all_products,
               sub_category_id: item.sub_category_id,
               url: item.url,
               urlPicture: item.urlPicture
            }
        })
    } 

    for await (let item of products){
        await prisma.products.create({
            data: {
                call_product: item.call_product,
                description: item.description,
                description_seo: item.description_seo,
                key_word_seo: item.key_word_seo,
                name: item.name,
                category_id: item.category_id,
                destaque: item.destaque,
                hasVariation: item.hasVariation,
                isActive: item.isActive,
                listVariation: item.listVariation || '',
                tab: item.tab || '',
                urls: item.urls || ''
            }
        })
    }   

    for await (let item of logs){
        await prisma.logs.create({
            data: {
                description: item.description,
                user: item.user,
            }
        })
    }   

    for await (let item of home){
        await prisma.home.create({
            data: {
                description: item.description,
                indexProduct: item.indexProduct,
                name: item.name,
                urls: item.urls || '',
                category_id: item.category_id,
                destaque: item.destaque,
                icon: item.icon,
                link_name: item.link_name
            }
        })
    }  

    return res.status(201).json({})
  }