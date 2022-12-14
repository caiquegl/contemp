const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, response) => {
    try {
        const {body, id} = JSON.parse(req.body);

        // let products = ""
        // body.product.forEach(el => {
        //     products = products + `Nome: ${el.name}rn`
        //     if(Object.keys(el.variation).length > 0) {
        //         Object.keys(el.variation).forEach(obj => {
        //             products = products + `Variação: ${obj} -> ${el.variation[obj]}rn`
        //         })
        //     }
        // });
        // const message = `
        //     Nome: ${body.name}rn
        //     Sobrenome: ${body.lastName}rn
        //     Email: ${body.email}rn
        //     Telefone: ${body.telephone}rn
        //     Descrição: ${body.description}rn
        //     Aprova contato: ${body.isAprove}rn
        //     Produto: ${products}
        // `;

        let text = JSON.stringify(body, null, 2)
        let mailSned = await mail.send({
            // to: 'kemelin@3hub.co',
            to: 'arq.caique@hotmail.com',
            // cc: ['vendas@contemp.com', 'kemelin@3hub.co'],
            cc: ['kemelin@3hub.co'],
            from: 'marketing@contemp.com.br',
            subject: id,
            text: text.toString().replace('{','').replace('}',''),
            // html: body.replace(/rn/g, '<br>'),
          })

  console.log(mailSned)
      return response.json({ status: true });
    } catch (error) {
        console.log(error, 'error')
      return response.json({ status: false });
    }
  };