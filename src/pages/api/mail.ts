import { HtmlDefault, HtmlOrcamento } from "../../utils/htmlEmail";

const SibApiV3Sdk = require('sib-api-v3-sdk');

export default async (req: any, response: any) => {
    try {
        const body = JSON.parse(req.body);
        SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDBLUE
        await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
          "sender":{ "email":"marketing@contemp.digital", "name":"Contemp"},
          "subject": body.id ? body.id == 'vagas' ? 'Novo currículo' : 'Novo contato' : 'Orçamento',
          "htmlContent":body.id ? HtmlDefault(body.name, body.email, body.empresa,body.telephone,  body.description, body.file, body.area) : HtmlOrcamento(body.name, body.email, '',body.telephone,  body.description, '', body.products ),
          "messageVersions":[
            // { "to": [{ "email": body.id && body.id == 'vagas' ? 'rh@contemp.com.br' : 'vendas@contemp.com.br', name: 'contemp' }],
            { "to": [{ "email": body.id && body.id == 'vagas' ? 'rh@contemp.com.br' : 'vendas@contemp.com.br', name: 'contemp' }],
            "cc": [{ "email": 'backup.contemp.digital@gmail.com', name: 'Kemilin' }],
           }
          ]
        })
  
        return response.json({ status: true });
  
    } catch (error: any) {
      console.log(error)
      return response.json({ status: false });
    }
  };