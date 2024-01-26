import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { replaceNameToUrl } from '../../../utils/replaceNameToUrl'
import SibApiV3Sdk from 'sib-api-v3-sdk'
import { CreateProduct } from '../../../utils/htmlEmail'
import moment from 'moment'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      if (req.method !== 'POST') {
        return res.status(405).end()
      }

      const body = req.body

      const exist = await prisma.categories.findFirst({
        where: {
          name: body.name
        }
      })

      if(exist) return res.status(500).json({msg: 'Nome já existe'})

      const getLastOrder = await prisma.categories.findFirst({
        select: {
          order: true
        },
        orderBy: {
          order: 'desc'
        }
      })

      if(getLastOrder) {

        await prisma.categories.create({
          data: {
            ...body,
            is_main: body.is_main === 'true' ? true : false,
            order: getLastOrder.order + 1,
            sub_category_id: body.sub_category_id ? body.sub_category_id : null
          }
        })

      } else {
        await prisma.categories.create({
          data: {
            ...body,
            is_main: body.is_main === 'true' ? true : false,
            order: 1,
            sub_category_id: body.sub_category_id ? body.sub_category_id : null
          }
        })
      }

      let user: any = JSON.parse(req.cookies['nextAuth.contemp'] as string)
      user = user?.body?.email || ''

      await prisma.logs.create({
        data: {
          user: user,
          description: `Criou Categoria ${body.name}`
        }
      })

      let key = process.env.SENDBLUE

      let url = `/category/${replaceNameToUrl(body.name).toLowerCase().replaceAll(' ', '_')}`
      if(key) {
        SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = key

        await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
          "sender": { "email": "marketing@contemp.digital", "name": "Contemp" },
          "subject": 'Criação de categoria',
          "htmlContent": CreateProduct(
            body.name,
            url,
            moment().format('DD/MM/YYYY HH:mm:ss'),
            user
          ),
          "messageVersions": [
            {
              "to": [{ "email": 'marketing@contemp.digital', name: 'Criação de categoria' }],
              "cc": [{ "email": 'kemelin@3hub.co', name: 'Kemilin' }],
            }
          ]
        })
      }


      return res.status(201).json({msg: 'Sucesso ao criar/atualizar categoria.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao criar/atualizar categoria.'})
    }
  }
