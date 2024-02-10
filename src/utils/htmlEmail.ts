export const HtmlDefault = (name?: string, email?: string, empresa?: string, telefone?: string, mensagem?: string, file?: string, area?: string) => {
    let msg = `<!DOCTYPE html>
    <html lang="pt-br">
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
                ${area ? `<p style="margin-bottom: 10px;">
                    <b>Área desejada:</b>  ${area ? area : ''}
                </p>` : ''
        }
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
        if (Object.keys(el.variation)) {
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
    <html lang="pt-br">
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
                Novo Oportunidade de Vendas
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


export const HtmlRecover = (name?: string, link?: string) => {
    let msg = `<!DOCTYPE html>
    <html lang="pt-br">
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
                Nova Senha
            </div>
            <div class="containerBody">
                <p class="big" style="margin-bottom: 20px;">
                    Olá, <b class="bRed">${name || ''}</b>
                </p>
                <p style="margin-bottom: 30px;">
                    Você solicitou para recuperar a senha e o acesso ao painel admin do site da Contemp, então estamos te enviando esse link para cadastrar uma nova senha. Acesse o link abaixo ou copie e cole o link no navegador para criar uma nova senha.
                </p>
                <a href="${link}" style="margin-bottom: 10px;">
                    ${link}
                </a>
                
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


export const UpdateProduct = (old_name: string, new_name: string, old_url: string, new_url: string, date: string, by: string) => {
    return `
    <!DOCTYPE html>
    <html lang="pt-br">
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
                Atualização de Produto
            </div>
            <div class="containerBody">
                <p class="big" style="margin-bottom: 20px;">
                    Olá, <b class="bRed">Super Admin</b>
                </p>
                <p style="margin-bottom: 30px;">
                    O produto a seguir sofreu alteração no nome. Confira para redirecionar:
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Nome Anterior:</b> ${old_name || ''}
                </p>
                <p style="margin-bottom: 30px;">
                    <b>Nome Atual:</b>  ${new_name || ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Url Anterior:</b>  ${old_url || ''}
                </p>
                <p style="margin-bottom: 30px;">
                    <b>Url Atual:</b>  ${new_url || ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Data da Modificação:</b>  ${date || ''}
                </p>
                <p style="margin-bottom: 30px;">
                    <b>Quem Alterou:</b>  ${by || ''}
                </p>
                <div class="divider"> </div>
                
                <div class="footer">
                    <img src="https://firebasestorage.googleapis.com/v0/b/contemp-1e58c.appspot.com/o/LOGO%20SVG.svg?alt=media&token=75b0595b-4fc3-4c1f-917f-3ed895dbc984" alt="">
                </div>
            </div>
        </div>
    </body>
    </html>\`
    `
}


export const CreateProduct = (name: string, url: string, date: string, by: string) => `
    <!DOCTYPE html>
    <html lang="pt-br">
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
                Cadastro de Novo Produto
            </div>
            <div class="containerBody">
                <p class="big" style="margin-bottom: 20px;">
                    Olá, <b class="bRed">Super Admin</b>
                </p>
                <p style="margin-bottom: 30px;">
                    Foi cadastrado um novo produto na Contemp:
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Nomedo Produto:</b> ${name || ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Url do Produto:</b>  ${url || ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Data da Criação:</b>  ${date || ''}
                </p>
                <p style="margin-bottom: 30px;">
                    <b>Quem Criou:</b>  ${by ||''}
                </p>
                <div class="divider"> </div>
                
                <div class="footer">
                    <img src="https://firebasestorage.googleapis.com/v0/b/contemp-1e58c.appspot.com/o/LOGO%20SVG.svg?alt=media&token=75b0595b-4fc3-4c1f-917f-3ed895dbc984" alt="">
                </div>
            </div>
        </div>
    </body>
    </html>\`
`

export const UpdateCategory = (old_name: string, new_name: string, old_url: string, new_url: string, date: string, by: string) => {
    return `
    <!DOCTYPE html>
    <html lang="pt-br">
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
                Atualização de Categoria
            </div>
            <div class="containerBody">
                <p class="big" style="margin-bottom: 20px;">
                    Olá, <b class="bRed">Super Admin</b>
                </p>
                <p style="margin-bottom: 30px;">
                    A categoria a seguir sofreu alteração no nome. Confira para redirecionar:
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Nome Anterior:</b> ${old_name || ''}
                </p>
                <p style="margin-bottom: 30px;">
                    <b>Nome Atual:</b>  ${new_name || ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Url Anterior:</b>  ${old_url || ''}
                </p>
                <p style="margin-bottom: 30px;">
                    <b>Url Atual:</b>  ${new_url || ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Data da Modificação:</b>  ${date || ''}
                </p>
                <p style="margin-bottom: 30px;">
                    <b>Quem Alterou:</b>  ${by || ''}
                </p>
                <div class="divider"> </div>
                
                <div class="footer">
                    <img src="https://firebasestorage.googleapis.com/v0/b/contemp-1e58c.appspot.com/o/LOGO%20SVG.svg?alt=media&token=75b0595b-4fc3-4c1f-917f-3ed895dbc984" alt="">
                </div>
            </div>
        </div>
    </body>
    </html>\`
    `
}

export const CreateCAtegory = (name: string, url: string, date: string, by: string) => `
    <!DOCTYPE html>
    <html lang="pt-br">
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
                Cadastro de Novo Categoria
            </div>
            <div class="containerBody">
                <p class="big" style="margin-bottom: 20px;">
                    Olá, <b class="bRed">Super Admin</b>
                </p>
                <p style="margin-bottom: 30px;">
                    Foi cadastrado uma nova categorua na Contemp:
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Nome da categoria:</b> ${name || ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Url da categoria:</b>  ${url || ''}
                </p>
                <p style="margin-bottom: 10px;">
                    <b>Data da Criação:</b>  ${date || ''}
                </p>
                <p style="margin-bottom: 30px;">
                    <b>Quem Criou:</b>  ${by ||''}
                </p>
                <div class="divider"> </div>
                
                <div class="footer">
                    <img src="https://firebasestorage.googleapis.com/v0/b/contemp-1e58c.appspot.com/o/LOGO%20SVG.svg?alt=media&token=75b0595b-4fc3-4c1f-917f-3ed895dbc984" alt="">
                </div>
            </div>
        </div>
    </body>
    </html>\`
`
