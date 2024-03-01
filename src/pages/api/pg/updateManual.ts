import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { replaceNameToUrl } from '../../../utils/replaceNameToUrl'
import SibApiV3Sdk from 'sib-api-v3-sdk'
import { UpdateCategory } from '../../../utils/htmlEmail'
import moment from 'moment'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { url,  name, status, id, picture } = req.body;

    const findMenu = await prisma.menus.findFirst({
      where: {
        id: id
      }
    });

    await prisma.menus.update({
      where: {
        id: id
      },
      data: {
        url,
        name,
        status,
        updated_at: new Date(),
        picture
      }
    })

    let user: any = JSON.parse(req.cookies['nextAuth.contemp'] as string)
    user = user?.body?.email || ''

    await prisma.logs.create({
      data: {
        user: user,
        description: `Editou menu ${name}`
      }
    })

    let key = process.env.SENDBLUE

    if(findMenu && name != findMenu.name || url != findMenu.url) {

      let newUrl = `/category/${replaceNameToUrl(name).toLowerCase().replaceAll(' ', '_')}`
      let oldUrl = `/category/${replaceNameToUrl(findMenu.name).toLowerCase().replaceAll(' ', '_')}`

      if (key) {
        SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = key

        let send = await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
          "sender": { "email": "marketing@contemp.digital", "name": "Contemp" },
          "subject": 'Atualização de manual',
          "htmlContent": UpdateCategory(
            findMenu.name,
            name,
            oldUrl,
            newUrl,
            moment().format('DD/MM/YYYY HH:mm:ss'),
            user
          ),
          "messageVersions": [
            {
              "to": [{ "email": 'marketing@contemp.digital', name: 'Atualização de manual' }],
              "cc": [{ "email": 'kemelin@3hub.co', name: 'Kemilin' }, {
                "email": 'arq.caique@hotmail.com',
                name: 'caique'
              }],
            }
          ]
        })
      }

      const findRedirect = await prisma.redirectsUrls.findFirst({
        where: {
          source: oldUrl
        }
      });

      if (oldUrl != newUrl) {
        if (findRedirect) {
          if (findRedirect.destination != newUrl)
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
    }

    return res.status(201).json(true);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
