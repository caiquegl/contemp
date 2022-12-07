const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

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

        let mailSned = await mail.send({
            // to: 'kemelin@3hub.co',
            to: 'arq.caique@hotmail.com',
            from: 'kemelin@3hub.co',
            subject: 'Novo orçamento',
            text: message,
            html: message.replace(/rn/g, '<br>'),
          })
  
      return response.json({ status: true });
    } catch (error) {
      return response.json({ status: false });
    }
  };