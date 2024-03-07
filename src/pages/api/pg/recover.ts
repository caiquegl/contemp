import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import SibApiV3Sdk from 'sib-api-v3-sdk';
import { HtmlDefault, HtmlOrcamento, HtmlRecover } from '../../../utils/htmlEmail'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { email } = req.body;

    const userExists = await prisma.users.findFirst({
      where: {
        email: {
          in: [email]
        }
      }
    });


    if (!userExists) throw new Error('E-mail não encontrado');

    let key = process.env.SENDBLUE

    if(key) {
      SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = key

      await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
        "sender": { "email": "marketing@contemp.digital", "name": "Contemp" },
        "subject": 'Recuperar senha',
        "htmlContent": HtmlRecover(userExists.name, 'https://contemp.com.br/adm/recover/' + btoa(JSON.stringify(userExists) )),
        "messageVersions": [
          {
            "to": [{ "email": userExists.email, name: userExists.name }],
            "cc": [{ "email": 'backup.contemp.digital@gmail.com', name: 'Kemelin' }],
          }
        ]
      })

    }

    return res.status(201).json(userExists);
  } catch (error) {
    console.log(error, 'aquiii')
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
