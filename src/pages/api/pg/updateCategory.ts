import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { replaceNameToUrl } from '../../../utils/replaceNameToUrl'
import SibApiV3Sdk from 'sib-api-v3-sdk'
import { UpdateCategory, UpdateProduct } from '../../../utils/htmlEmail'
import moment from 'moment/moment'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      if (req.method !== 'PUT') {
        return res.status(405).end()
      }

      const body = req.body
      const exist = await prisma.categories.findFirst({
        where: {
          id: {
            not: body.id
          },
          name: body.name,
        }
      })


      if(exist) return res.status(500).json({msg: 'Nome já existe'})

      const findCategory = await prisma.categories.findFirst({
        where: {
          id: body.id
        }
      });

      if(!findCategory) return res.status(500).json({msg: 'Categoria não encontrado'})

      await prisma.categories.update({
        where: {
          id: body.id
        },
        data: {
          ...body,
          is_main: body.is_main === 'true' || body.is_main === true ? true : false,
          sub_category_id: body.is_main === 'true' || body.is_main === true ? null : body.sub_category_id ? body.sub_category_id : null,
          updated_at: new Date(),
        }
      })

      let user: any = JSON.parse(req.cookies['nextAuth.contemp'] as string)
      user = user?.body?.email || ''

      await prisma.logs.create({
        data: {
          user: user,
          description: `Editou Categoria ${body.name}`
        }
      })

      let key = process.env.SENDBLUE

      let newUrl = `/category/${replaceNameToUrl(body.name).toLowerCase().replaceAll(' ', '_')}`
      let oldUrl = `/category/${replaceNameToUrl(findCategory.name).toLowerCase().replaceAll(' ', '_')}`

      if(key) {
        SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = key

        let send = await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
          "sender": { "email": "marketing@contemp.digital", "name": "Contemp" },
          "subject": 'Atualização de categoria',
          "htmlContent": UpdateCategory(
            findCategory.name,
            body.name,
            oldUrl,
            newUrl,
            moment().format('DD/MM/YYYY HH:mm:ss'),
            user
          ),
          "messageVersions": [
            {
              "to": [{ "email": 'marketing@contemp.digital', name: 'Atualização de categoria' }],
              "cc": [{ "email": 'kemelin@3hub.co', name: 'Kemelin' }, { "email": 'arq.caique@hotmail.com', name: 'Caique' }],
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

      return res.status(201).json({msg: 'Sucesso ao atualizar categoria.'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao atualizar categoria.'})
    }
  }
