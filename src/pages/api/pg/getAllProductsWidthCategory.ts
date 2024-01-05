import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { dbContemp } from '../database_contemp'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {

      let products = await dbContemp('products')
      .select(
        'products.id',
        'products.description',
        'products.description_seo',
        'products.destaque',
        'products.hasVariation',
        'products.isActive',
        'products.key_word_seo',
        'products.name',
        'products.created_at',
        'products.updated_at',
        'products.category_id',
        'products.order',
        'products.layout',
        'categories.id as category_id',
        'categories.description as category_description',
        'categories.description_seo as category_description_seo',
        'categories.favorite as category_favorite',
        'categories.is_active as category_is_active',
        'categories.is_main as category_is_main',
        'categories.key_word_seo as category_key_word_seo',
        'categories.name as category_name',
        'categories.firebase_id as category_firebase_id',
        'categories.sub_category_id as category_sub_category_id',
        'categories.order as category_order',
        'categories.order_all_products as category_order_all_products',
        'categories.url as category_url',
        'categories.all_product as category_all_product',
        'categories.urlPicture as category_url_picture',
        'categories.order_all_products as category_order_all_products',
        'categories.filter as category_filter'
      )
      .leftJoin('categories', 'products.category_id', 'categories.id')
      .orderBy('id','asc')

      let list: any = products.map((item) => {

        return {
          call_product: item.call_product,
          category_id: item.category_id,
          created_at: item.created_at,
          description: item.description,
          description_seo: item.description_seo,
          destaque: item.destaque,
          hasVariation: item.hasVariation,
          id: item.hasVariation,
          isActive: item.isActive,
          key_word_seo: item.key_word_seo,
          listVariation: item.listVariation,
          name: item.name,
          order: item.order,
          tab: item.tab,
          updated_at: item.updated_at,
          urls: item.urls,
          layout: item.layout,
          category: {
            all_product: item.category_all_product,
            description: item.category_description,
            description_seo: item.category_description_seo,
            favorite: item.category_favorite,
            filter: item.category_filter,
            firebase_id: item.category_firebase_id,
            id: item.category_id,
            is_active: item.category_is_active,
            is_main: item.category_is_main,
            key_word_seo: item.category_key_word_seo,
            name: item.category_name,
            order: item.category_order,
            order_all_products: item.category_order_all_products,
            sub_category_id: item.category_sub_category_id,
            url: item.category_url,
            urlPicture: item.category_url_picture
          }
        }
      })

      // for await (let product of products) {

      //   let obj: any = products

      //   obj.category = await dbContemp('categories')
      //   .where('id', '=', product.category_id)
      //   .first()

      //   list.push(obj)
      // }

      // let list = await prisma.products.findMany({
      //   include: {
      //     category: true
      //   },
      //   orderBy: {
      //     order: 'asc'
      //   }
      // })
      // console.log(list[0])
      return res.status(201).json(list)
    } catch (error) {
      console.log(error)
      return res.status(201).json([])
    }
  }