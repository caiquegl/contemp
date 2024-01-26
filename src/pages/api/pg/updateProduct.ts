import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import SibApiV3Sdk from 'sib-api-v3-sdk'
import { UpdateProduct } from '../../../utils/htmlEmail'
import moment from 'moment';
import { replaceNameToUrl } from '../../../utils/replaceNameToUrl'

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

      const findProduct = await prisma.products.findFirst({
        where: {
          id: body.id
        }
      });

      if(!findProduct) return res.status(500).json({msg: 'Produto não encontrado'})

      await prisma.products.update({
        where: {
          id: body.id
        },
        data: {
          description: body.description,
          description_seo: body.description_seo,
          key_word_seo: body.key_word_seo,
          name: body.name,
          category_id: body.category,
          destaque: body.destaque,
          hasVariation: body.hasVariation,
          isActive: body.is_active,
          listVariation: body.listVariation ? body.listVariation : undefined,
          tab: body.tab,
          urls: body.urls,
          call_product: body.call_product,
          layout: body.layout ? parseInt(body.layout) : null,
          updated_at: new Date(),
        }
      })

      let user: any = JSON.parse(req.cookies['nextAuth.contemp'] as string)
      user = user?.body?.email || ''

      await prisma.logs.create({
        data: {
          user: user,
          description: `Editou Produto ${body.name}`
        }
      })

      let key = process.env.SENDBLUE

      let newUrl = `/produto/${replaceNameToUrl(body.name).toLowerCase().replaceAll(' ', '_')}`
      let oldUrl = `/produto/${replaceNameToUrl(findProduct.name).toLowerCase().replaceAll(' ', '_')}`
      if(key) {
        SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = key

        let send = await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
          "sender": { "email": "marketing@contemp.digital", "name": "Contemp" },
          "subject": 'Atualização de produto',
          "htmlContent": UpdateProduct(
            findProduct.name,
            body.name,
            oldUrl,
            newUrl,
            moment().format('DD/MM/YYYY HH:mm:ss'),
            user
          ),
          "messageVersions": [
            {
              "to": [{ "email": 'marketing@contemp.digital', name: 'Atualização de produto' }],
              "cc": [{ "email": 'kemelin@3hub.co', name: 'Kemilin' }],
            }
          ]
        })
      }

      const findRedirect = await prisma.redirectsUrls.findFirst({
        where: {
          source: oldUrl
        }
      });

      if(oldUrl != newUrl) {
        if(findRedirect) {
          if(findRedirect.destination != newUrl)
            await prisma.redirectsUrls.update({
              where: {
                id: findRedirect.id
              },
              data: {
                destination: newUrl,
                updated_at: new Date(),
              }
            })
        } else {
          await prisma.redirectsUrls.create({
            data: {
              source: oldUrl,
              destination: newUrl
            }
          })
        }
      }

      return res.status(201).json({msg: 'Sucesso ao criar/atualizar produto.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao criar/atualizar produto.'})
    }
  }
