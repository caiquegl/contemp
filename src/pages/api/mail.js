const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);
// mail.setApiKey("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")

export default async (req, response) => {
    try {
        const body = JSON.parse(req.body);

        let products = ""
        body.product.forEach(el => {
            products = products + `Nome: ${el.name}rn`
            if(Object.keys(el.variation).length > 0) {
                Object.keys(el.variation).forEach(obj => {
                    products = products + `Variação: ${obj} -> ${el.variation[obj]}rn`
                })
            }
        });
        const message = `
            Nome: ${body.name}rn
            Sobrenome: ${body.lastName}rn
            Email: ${body.email}rn
            Telefone: ${body.telephone}rn
            Descrição: ${body.description}rn
            Aprova contato: ${body.isAprove}rn
            Produto: ${products}
        `;

        console.log(message)

        console.log('aquiiii')
        let mailSned = await mail.send({
            bcc: 'arq.caique@hotmail.com',
            to: 'kemelin@3hub.co',
            // to: 'arq.caique@hotmail.com',
            from: 'kemelin@3hub.co',
            subject: 'Novo orçamento',
            text: message,
            html: message.replace(/rn/g, '<br>'),
          })
  
        console.log(mailSned)
      return response.json({ status: true });
    } catch (error) {
      console.log(error);
      return response.json({ status: false });
    }
  };