export const HtmlDefault = (name?: string, email?: string, empresa?: string, telefone?: string, mensagem?: string, file?: string) => {
    let msg = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contemp</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
        *{
            font-family: 'Poppins', sans-serif;
        }
        body {
            background-color: #F7F7F7;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    
        .container {
            width: 100%;
            max-width: 600px;
            border-radius: 8px;
            background-color: #fff;
        }
    
        .header {
            width: 100%;
            height: 108px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url("https://firebasestorage.googleapis.com/v0/b/contemp-1e58c.appspot.com/o/Banner%20Contemp%402x.png?alt=media&token=a496a2da-26a1-4bbd-9b1a-909f94d62a65");
            color: #fff;
            font-size: 33px;
            font-weight: bold;
            border-top-right-radius: 8px;
            border-top-left-radius: 8px;
        }
    
        .containerBody {
            padding: 30px;
            border-bottom-right-radius: 8px;
            border-bottom-left-radius: 8px;
        }
    
        p{
            font-size: 16px;
        }
    
        .bRed{
            color: #B60005;
        }
    
        .big {
            font-size: 24px;
            font-weight: bold;
        }
    
        .bold {
            font-weight: bold;
        }
    
        .divider {
            width: 100%;
            border-bottom: 1px solid lightslategray;
        }
    
        .footer {
            margin-top: 20px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    </style>
    <body>
        <div class="container">
            <div class="header">
                Novo contato
            </div>
            <div class="containerBody">
                <p class="big" style="margin-bottom: 20px;">
                    Olá, <b class="bRed">Equipe de vendas!</b>
                </p>
                <p style="margin-bottom: 30px;">
                    Você recebeu uma nova solicitação de contato através do site da Contemp. Esses são os dados:
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Nome:</b> ${name ? name : ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>E-mail:</b>  ${email ? email : ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Empresa:</b>  ${empresa ? empresa : ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Telefone:</b>  ${telefone ? telefone : ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Arquivo:</b>  ${file ? file : ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Mensagem:</b>
                </p>
                <p style="margin-bottom: 30px;">
                ${mensagem ? mensagem : ''}
                </p>
                <div class="divider"> </div>
                
                <div class="footer">
                    <img src="https://firebasestorage.googleapis.com/v0/b/contemp-1e58c.appspot.com/o/LOGO%20SVG.svg?alt=media&token=75b0595b-4fc3-4c1f-917f-3ed895dbc984" alt="">
                </div>
            </div>
        </div>
    </body>
    </html>`

    return msg
}


export const HtmlOrcamento = (
    name?: string, 
    email?: string, 
    empresa?: string, 
    telefone?: string, 
    mensagem?: string, 
    file?: string, 
    produto?: any
) => {
    let stringProd = ''

    produto.forEach((el: any) => {
        let variation = ''
        if(Object.keys(el.variation)) {
            Object.keys(el.variation).forEach((v) => {
                variation = `${variation}${v}:${el.variation[v]}<br/>`
            })
        }

        stringProd = `${stringProd} <tr>
        <td>${el.name}</td>
        <td>${variation}</td>
        <td>${el.qtd}</td>
        </tr>`
    })
    
    let msg = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contemp</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
        *{
            font-family: 'Poppins', sans-serif;
        }
        body {
            background-color: #F7F7F7;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    
        .container {
            width: 100%;
            max-width: 600px;
            border-radius: 8px;
            background-color: #fff;
        }
    
        .header {
            width: 100%;
            height: 108px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url("https://firebasestorage.googleapis.com/v0/b/contemp-1e58c.appspot.com/o/Banner%20Contemp%402x.png?alt=media&token=a496a2da-26a1-4bbd-9b1a-909f94d62a65");
            color: #fff;
            font-size: 33px;
            font-weight: bold;
            border-top-right-radius: 8px;
            border-top-left-radius: 8px;
        }
    
        .containerBody {
            padding: 30px;
            border-bottom-right-radius: 8px;
            border-bottom-left-radius: 8px;
        }
    
        p{
            font-size: 16px;
        }
    
        .bRed{
            color: #B60005;
        }
    
        .big {
            font-size: 24px;
            font-weight: bold;
        }
    
        .bold {
            font-weight: bold;
        }
    
        .divider {
            width: 100%;
            border-bottom: 1px solid lightslategray;
        }
    
        .footer {
            margin-top: 20px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }

        .table {
            width: 100%;
            text-align: left;
            margin-bottom: 20px;
            text-align: center;
        }
    
        .table tr th {
            border: 2px solid lightgrey;
            background-color: rgb(184, 184, 184);
        }
    
        .table tr td {
            border: 2px solid lightgrey;
        }
    </style>
    <body>
        <div class="container">
            <div class="header">
                Novo contato
            </div>
            <div class="containerBody">
                <p class="big" style="margin-bottom: 20px;">
                    Olá, <b class="bRed">Equipe de vendas!</b>
                </p>
                <p style="margin-bottom: 30px;">
                    Você recebeu uma nova solicitação de contato através do site da Contemp. Esses são os dados:
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Nome:</b> ${name ? name : ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>E-mail:</b>  ${email ? email : ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Empresa:</b>  ${empresa ? empresa : ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Telefone:</b>  ${telefone ? telefone : ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Arquivo:</b>  ${file ? file : ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Mensagem:</b>
                </p>
                <p style="margin-bottom: 30px;">
                ${mensagem ? mensagem : ''}
                </p>
                <table class="table">
                    <tr>
                    <th>Produto</th>
                    <th>Variação</th>
                    <th>Qnt.</th>
                    </tr>
                    ${stringProd}
                </table>
                <div class="divider"> </div>
                
                <div class="footer">
                    <img src="https://firebasestorage.googleapis.com/v0/b/contemp-1e58c.appspot.com/o/LOGO%20SVG.svg?alt=media&token=75b0595b-4fc3-4c1f-917f-3ed895dbc984" alt="">
                </div>
            </div>
        </div>
    </body>
    </html>`

    return msg
}