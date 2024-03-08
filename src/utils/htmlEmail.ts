export const HtmlDefault = (name?: string, email?: string, empresa?: string, telefone?: string, mensagem?: string, file?: string, area?: string) => {
    let msg = `<!DOCTYPE html>
    <html lang="pt-br">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pedido de Contato - Contemp</title>
        <style type="text/css">
            body,
            table,
            td,
            a {
                font-family: 'Poppins', sans-serif;
            }
    
            body {
                background-color: #F7F7F7;
                margin: 0;
                padding: 0;
            }
    
            p,
            b,
            a,
            .im {
                color: #242424;
            }
    
            .gt a {
                color: #242424 !important;
            }
    
            .botao-contemp-preto,
            .botao-contemp {
                display: inline-block;
                padding: 10px 20px;
                border-radius: 8px;
                font-weight: bold;
                text-align: center;
                text-decoration: none;
                text-transform: uppercase;
                font-size: 14px;
            }
    
            .botao-contemp-preto {
                background-color: #242424;
                border: 2px solid #242424;
                color: #fff;
            }
    
            .botao-contemp-preto:hover {
                background-color: #fff;
                color: #B60005;
                border-color: #fff;
            }
    
            .botao-contemp {
                background-color: #B60005;
                color: #fff;
                border: 2px solid #B60005;
            }
    
            .botao-contemp:hover {
                color: #242424;
                background-color: #fff;
                border-color: #242424;
            }
    
            .info-text {
                font-size: small;
                font-style: italic;
                text-align: center;
            }
        </style>
    </head>
    
    <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#F7F7F7" style="padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#fff"
                        style="border-radius: 14px; overflow: hidden; box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.08);">
                        <tr>
                            <td
                                style="background-image: url('https://contemp.com.br/api/arquivos/novo_pedido.png'); height: 245px; background-size: cover; background-position: center; color: #fff; font-size: 33px; font-weight: bold; text-align: center;">
                                <!-- Colocar conteúdo do header aqui, se necessário -->
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="padding: 30px; padding-top: 1%; font-family: 'Poppins', sans-serif; font-size: 16px; color: #242424;">
                                <p
                                    style="margin-bottom: 10px; font-size: 22px; font-weight: bold; text-align: center; color: #B60005;">
                                    NOVA SOLICITAÇÃO</p>
                                <p style="margin-bottom: 0px; margin-top: 20px;"><b>Olá 👋, Equipe de Vendas!</b></p>
                                <p style="margin-bottom: 10px;">Vocês receberam solicitação de contato pelo site. Respondam
                                    o quanto antes.</p>
                                <p
                                    style="margin-top: 40px; margin-bottom: 20px; font-weight: bold; color: #242424; text-align: center;">
                                    Esse são os dados da solicitação:</p>
                                <p style="margin-bottom: 0px;"><b>Nome:</b> ${name ? name : ''}</p>
                                <p style="margin-bottom: 0px;"><b>E-mail:</b> ${email ? email : ''}</p>
                                <p style="margin-bottom: 0px;"><b>Telefone:</b> ${telefone ? telefone : ''}</p>
                                <p style="margin-bottom: 0px;"><b>Empresa:</b> ${empresa ? empresa : ''}</p>
                                ${area ? `<p style="margin-bottom: 10px;">
                                    <b>Área desejada:</b> ${area ? area : 'Não selecionado.'}
                                </p>` : ''}
                                <p style="margin-bottom: 0px;"><b>Arquivo:</b> ${file ? file : 'Não enviado.'}</p>
                                <p style="margin-bottom: 0px;"><b>Mensagem:</b></p>
                                <p style="margin-bottom: 30px;">
                                    ${mensagem ? mensagem : ''}
                                </p>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td
                                            style="border-bottom: 1px solid #d3d3d3; height: 1px; line-height: 1px; font-size: 1px;">
                                            &nbsp;
                                        </td>
                                    </tr>
                                </table>
                                <p style="font-size: small; font-style: italic; text-align: center; margin-top: 30px;">Não
                                    responda diretamente esse e-mail. Ele é somente informativo e não tem caixa de entrada!
                                    Caso precise falar com a 3hub envie um e-mail para <a href="mailto:suporte@3hub.co"
                                        style="color: #242424; text-decoration: underline;">suporte@3hub.co</a> ou fale no
                                    nosso <a href="https://api.whatsapp.com/send?phone=5511987328670" target="_blank"
                                        style="color: #242424; text-decoration: underline;">WhatsApp</a>.</p>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="background-image: url('https://contemp.com.br/api/arquivos/contempfundo_3.png'); background-size: cover; background-position: center; height: 35px;">
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding-top: 20px;">
                    <table width="600" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td style="font-size: 14px; text-align: center; color: #242424;">
                                <!-- Conteúdo de copyright e logo -->
                                Copyright ©️ 2024 - <a href="https://3hub.co" style="color: #242424;">3Hub</a> | Todos os
                                direitos reservados
                                <br>
                                <a href="https://3hub.co" target="_blank">
                                    <img src="https://contemp.com.br/api/arquivos/icone3hub.png" alt="Logo 3Hub"
                                        style="margin-top: 10px; width: 15%;">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
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
        <title>Pedido de Novo Orçamento - Contemp</title>
        <style type="text/css">
            body,
            table,
            td,
            a {
                font-family: 'Poppins', sans-serif;
            }
    
            body {
                background-color: #F7F7F7;
                margin: 0;
                padding: 0;
            }
    
            p,
            b,
            a,
            .im {
                color: #242424;
            }
    
            .gt a {
                color: #242424 !important;
            }
    
            .botao-contemp-preto,
            .botao-contemp {
                display: inline-block;
                padding: 10px 20px;
                border-radius: 8px;
                font-weight: bold;
                text-align: center;
                text-decoration: none;
                text-transform: uppercase;
                font-size: 14px;
            }
    
            .botao-contemp-preto {
                background-color: #242424;
                border: 2px solid #242424;
                color: #fff;
            }
    
            .botao-contemp-preto:hover {
                background-color: #fff;
                color: #B60005;
                border-color: #fff;
            }
    
            .botao-contemp {
                background-color: #B60005;
                color: #fff;
                border: 2px solid #B60005;
            }
    
            .botao-contemp:hover {
                color: #fff;
                background-color: #242424;
                border-color: #fff;
            }
    
            .info-text {
                font-size: small;
                font-style: italic;
                text-align: center;
            }
    
            .products-table {
                width: 100%;
                text-align: left;
                margin-top: 20px;
                text-align: center;
                border: 1px solid #242424;
                margin-bottom: 30px;
            }
    
            .products-table tr th {
                border: 1px solid #fff;
                background-color: #B60005;
                color: #fff;
            }
    
            .products-table td td {
                border: 1px solid #242424;
            }
        </style>
    </head>
    
    <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#F7F7F7" style="padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#fff"
                        style="border-radius: 14px; overflow: hidden; box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.08);">
                        <tr>
                            <td
                                style="background-image: url('https://contemp.com.br/api/arquivos/novo_pedido_carrinho_de_compras.png'); height: 245px; background-size: cover; background-position: center; color: #fff; font-size: 33px; font-weight: bold; text-align: center;">
                                <!-- Colocar conteúdo do header aqui, se necessário -->
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="padding: 30px; padding-top: 1%; font-family: 'Poppins', sans-serif; font-size: 16px; color: #242424;">
                                <p
                                    style="margin-bottom: 10px; font-size: 22px; font-weight: bold; text-align: center; color: #B60005;">
                                    NOVA SOLICITAÇÃO</p>
                                <p style="margin-bottom: 0px; margin-top: 20px;"><b>Olá 👋, Equipe de Vendas!</b></p>
                                <p style="margin-bottom: 10px;">Vocês receberam solicitação de orçamento pelo site.
                                    Respondam
                                    o quanto antes.</p>
                                <p
                                    style="margin-top: 40px; margin-bottom: 20px; font-weight: bold; color: #242424; text-align: center;">
                                    Esse são os dados para o orçamento:</p>
    
                                <p style="margin-bottom: 0px;"><b>Nome:</b>${name ? name : ''}</p>
                                <p style="margin-bottom: 0px;"><b>E-mail:</b> ${email ? email : ''}</p>
                                <p style="margin-bottom: 0px;"><b>Telefone:</b> ${telefone ? telefone : ''}</p>
                                <p style="margin-bottom: 0px;"><b>Empresa:</b> ${empresa ? empresa : ''}</p>
                                <p style="margin-bottom: 0px;"><b>Arquivo:</b> ${file ? file : 'Não enviado.'}</p>
                                <p style="margin-bottom: 0px;"><b>Mensagem:</b></p>
                                <p style="margin-bottom: 30px;">
                                    ${mensagem ? mensagem : ''}
                                </p>
                                <table class="products-table" width="100%" border="1" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <th style="color: #fff; background-color: #B60005; border: 1px solid #fff;">Produto
                                        </th>
                                        <th style="color: #fff; background-color: #B60005; border: 1px solid #fff;">Variação
                                        </th>
                                        <th style="color: #fff; background-color: #B60005; border: 1px solid #fff;">Qnt.
                                        </th>
                                    </tr>
                                    ${stringProd}
                                </table>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td
                                            style="border-bottom: 1px solid #d3d3d3; height: 1px; line-height: 1px; font-size: 1px;">
                                            &nbsp;
                                        </td>
                                    </tr>
                                </table>
                                <p style="font-size: 16px; font-style: italic; font-weight: bold; text-align: center; margin-top: 30px; margin-bottom: -3%;">Você
                                    sabia que a Contemp tem um Canal no WhatsApp?</p>
                            </td>
                            <tr>
                                <td align="center"><a class="botao-contemp" href="https://www.whatsapp.com/channel/0029VaKJtjj5Ui2Xk7PNOI1c" target="_blank"
                                    style="color: #fff; text-decoration: none; align-items: center; margin-bottom: 30px;">Acessar Canal do WhatsApp da Contemp</a></td>
                            </tr>
                        </tr>
                        <tr>
                            <td
                                style="background-image: url('https://contemp.com.br/api/arquivos/contempfundo_3.png'); background-size: cover; background-position: center; height: 35px;">
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding-top: 20px;">
                    <table width="600" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td style="font-size: 14px; text-align: center; color: #242424;">
                                <!-- Conteúdo de copyright e logo -->
                                Copyright ©️ 2024 - <a href="https://3hub.co" style="color: #242424;">3Hub</a> | Todos os
                                direitos reservados
                                <br>
                                <a href="https://3hub.co" target="_blank">
                                    <img src="https://contemp.com.br/api/arquivos/icone3hub.png" alt="Logo 3Hub"
                                        style="margin-top: 10px; width: 15%;">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
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
        <title>Recuperação de Senha - Painel da Contemp</title>
        <style type="text/css">
            body,
            table,
            td,
            a {
                font-family: 'Poppins', sans-serif;
            }
    
            body {
                background-color: #F7F7F7;
                margin: 0;
                padding: 0;
            }
    
            p,
            b,
            a,
            .im {
                color: #242424;
            }
    
            .gt a {
                color: #242424 !important;
            }
    
            .botao-contemp-preto,
            .botao-contemp {
                display: inline-block;
                padding: 10px 20px;
                border-radius: 8px;
                font-weight: bold;
                text-align: center;
                text-decoration: none;
                text-transform: uppercase;
                font-size: 14px;
            }
    
            .botao-contemp-preto {
                background-color: #242424;
                border: 2px solid #242424;
                color: #fff;
            }
    
            .botao-contemp-preto:hover {
                background-color: #fff;
                color: #B60005;
                border-color: #fff;
            }
    
            .botao-contemp {
                background-color: #B60005;
                color: #fff;
                border: 2px solid #B60005;
            }
    
            .botao-contemp:hover {
                color: #fff;
                background-color: #242424;
                border-color: #fff;
            }
    
            .info-text {
                font-size: small;
                font-style: italic;
                text-align: center;
            }
    
            .products-table {
                width: 100%;
                text-align: left;
                margin-top: 20px;
                text-align: center;
                border: 1px solid #242424;
                margin-bottom: 30px;
            }
    
            .products-table tr th {
                border: 1px solid #fff;
                background-color: #B60005;
                color: #fff;
            }
    
            .products-table td td {
                border: 1px solid #242424;
            }
    
            .td-flex {
                display: flex;
                flex-direction: column;
            }
        </style>
    </head>
    
    <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#B60005" style="padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#fff"
                        style="border-radius: 14px; overflow: hidden; box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.08);">
                        <tr>
                            <td
                                style="background-image: url('https://contemp.com.br/api/arquivos/recuperaa_a_o_de_senha.png'); height: 245px; background-size: cover; background-position: center; color: #fff; font-size: 33px; font-weight: bold; text-align: center;">
                                <!-- Colocar conteúdo do header aqui, se necessário -->
                            </td>
                        </tr>
                        <tr>
                            <td class="td-flex"
                                style="padding: 30px; padding-top: 1%; font-family: 'Poppins', sans-serif; font-size: 16px; color: #242424; display: flex; flex-direction: column;">
                                <p
                                    style="margin-bottom: 10px; font-size: 22px; font-weight: bold; text-align: center; color: #B60005;">
                                    NOVA SENHA!</p>
                                <p style="margin-bottom: 0px; margin-top: 20px;"><b>Olá 👋, Admin!</b></p>
                                <p style="margin-bottom: 10px;">Você solicitou a recuperação de senha para poder acessar
                                    novamente o painel admin da Contemp. Para criar uma nova senha basta clicar no botão
                                    abaixo:</p>
                                <a class="botao-contemp" href="${link}" target="_blank"
                                    style="color: #fff; text-decoration: none; align-items: center; margin: auto; margin-bottom: 30px; text-align: center; align-self: center;">
                                    Criar Nova Senha
                                </a>
                                <p style="margin-bottom: 10px;">Caso não funcione basta copiar e colar o link abaixo no seu navegador que você será direcionado para criar uma nova senha.</p>
                                    <p style="margin-bottom: 0px;"><b>Link:</b>${link}</p>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td
                                            style="border-bottom: 1px solid #d3d3d3; height: 1px; line-height: 1px; font-size: 1px;">
                                            &nbsp;
                                        </td>
                                    </tr>
                                </table>
                                <p style="font-size: small; font-style: italic; text-align: center; margin-top: 30px;">Não
                                    responda diretamente esse e-mail. Ele é somente informativo e não tem caixa de entrada!
                                    Caso precise falar com a 3hub envie um e-mail para <a href="mailto:suporte@3hub.co"
                                        style="color: #242424; text-decoration: underline;">suporte@3hub.co</a> ou fale no
                                    nosso <a href="https://api.whatsapp.com/send?phone=5511987328670" target="_blank"
                                        style="color: #242424; text-decoration: underline;">WhatsApp</a>.</p>
                            </td>
            </tr>
            <tr>
                <td
                    style="background-image: url('https://contemp.com.br/api/arquivos/contempfundo_2.png'); background-size: cover; background-position: center; height: 35px;">
                </td>
            </tr>
        </table>
        </td>
        </tr>
        <tr>
            <td align="center" style="padding-top: 20px;">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="font-size: 14px; text-align: center; color: #fff;">
                            <!-- Conteúdo de copyright e logo -->
                            Copyright ©️ 2024 - <a href="https://3hub.co" style="color: #fff;">3Hub</a> | Todos os
                            direitos reservados
                            <br>
                            <a href="https://3hub.co" target="_blank">
                                <img src="https://contemp.com.br/api/arquivos/logo_3_2x.png" alt="Logo 3Hub"
                                    style="margin-top: 10px; width: 15%;">
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        </table>
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
    <title>Atualização de Produto Contemp</title>
    <style type="text/css">
        body,
        table,
        td,
        a {
            font-family: 'Poppins', sans-serif;
        }

        body {
            background-color: #242424;
            margin: 0;
            padding: 0;
        }

        p,
        b,
        a,
        .im {
            color: #fff;
        }

        .gt a {
            color: #fff!important;
        }

        .botao-contemp-preto,
        .botao-contemp {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 14px;
        }

        .botao-contemp-preto {
            background-color: #242424;
            border: 2px solid #242424;
            color: #fff;
        }

        .botao-contemp-preto:hover {
            background-color: #fff;
            color: #B60005;
            border-color: #fff;
        }

        .botao-contemp {
            background-color: #B60005;
            color: #fff;
            border: 2px solid #B60005;
        }

        .botao-contemp:hover {
            color: #242424;
            background-color: #fff;
            border-color: #242424;
        }

        .info-text {
            font-size: small;
            font-style: italic;
            text-align: center;
        }
    </style>
</head>

<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#171717" style="padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#242424"
                    style="border-radius: 14px; overflow: hidden; box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.08);">
                    <tr>
                        <td
                            style="background-image: url('https://contemp.com.br/api/arquivos/produto_atualizado_2.png'); height: 245px; background-size: cover; background-position: center; color: #fff; font-size: 33px; font-weight: bold; text-align: center;">
                            <!-- Colocar conteúdo do header aqui, se necessário -->
                        </td>
                    </tr>
                    <tr>
                        <td
                            style="padding: 30px; padding-top: 1%; font-family: 'Poppins', sans-serif; font-size: 16px; color: #fff;">
                            <p style="margin-bottom: 10px; font-size: 22px; font-weight: bold; text-align: center;">
                                NOTIFICAÇÃO AUTOMÁTICA</p>
                            <p style="margin-bottom: 0px; margin-top: 20px;"><b>Olá 👋, administrador!</b></p>
                            <p style="margin-bottom: 10px;">Você está recebendo esse e-mail porque está cadastrado no
                                painel administrativo da Contemp.</p>
                            <p style="margin-top: 40px; margin-bottom: 20px; font-weight: bold;">O produto a seguir foi atualizado:</p>
                            <p style="margin-bottom: 0px;"><b>Nome Anterior:</b> ${old_name || ''}</p>
                            <p style="margin-bottom: 0px;"><b>Nome Atual:</b> ${new_name || ''}</p>
                            <p style="margin-bottom: 0px;"><b>Url Anterior:</b> https://contemp.com.br${old_url || ''}</p>
                            <p style="margin-bottom: 40px;"><b>Url Atual:</b> https://contemp.com.br${new_url || ''}</p>
                            <p style="margin-bottom: 0px;"><b>Data da Modificação:</b> ${date || ''}</p>
                            <p style="margin-bottom: 20px;"><b>Quem Alterou:</b> ${by || ''}</p>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="padding: 10px;">
                                        <a href="https://contemp.com.br${new_url || ''}" target="_blank" class="botao-contemp-preto" style="background-color: #242424; color: #fff; border: 2px solid #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; text-transform: uppercase; font-weight: bold; font-size: 14px;">
                                            Ver Produto
                                        </a>
                                    </td>
                                </tr>                                
                                <tr>
                                    <td align="center" style="padding: 20px;">
                                        </a>
                                        <a href="https://contemp.com.br/adm" target="_blank" class="botao-contemp-preto"
                                            style="background-color: #B60005; color: #fff; border: 2px solid #B60005; padding: 10px 20px; border-radius: 8px; text-decoration: none; text-transform: uppercase; font-weight: bold; font-size: 14px;">Verificar
                                            Alterações</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="border-bottom: 1px solid #d3d3d3; height: 1px; line-height: 1px; font-size: 1px;">
                                        &nbsp;
                                    </td>
                                </tr>
                            </table>
                            <p style="font-size: small; font-style: italic; text-align: center; margin-top: 30px;">Não
                                responda diretamente esse e-mail. Ele é somente informativo e não tem caixa de entrada!
                                Caso precise falar com a 3hub envie um e-mail para <a href="mailto:suporte@3hub.co"
                                    style="color: #fff; text-decoration: underline;">suporte@3hub.co</a> ou fale no
                                nosso <a href="https://api.whatsapp.com/send?phone=5511987328670" target="_blank"
                                    style="color: #fff; text-decoration: underline;">WhatsApp</a>.</p>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style="background-image: url('https://contemp.com.br/api/arquivos/contempfundo.png'); background-size: cover; background-position: center; height: 35px;">
                            <!-- Footer detalhe -->
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding-top: 20px;">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="font-size: 14px; text-align: center; color: #fff;">
                            <!-- Conteúdo de copyright e logo -->
                            Copyright ©️ 2024 - <a href="https://3hub.co" style="color: #fff;">3Hub</a> | Todos os
                            direitos reservados
                            <br>
                            <a href="https://3hub.co" target="_blank">
                                <img src="https://contemp.com.br/api/arquivos/logo_3_2x.png" alt="Logo 3Hub"
                                    style="margin-top: 10px; width: 10%;">
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
    `
}

export const UpdateManual = (old_name: string, new_name: string, old_url: string, new_url: string, date: string, by: string) => {
    return `
    <!DOCTYPE html>
    <html lang="pt-br">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Atualização de Manual</title>
        <style type="text/css">
            body,
            table,
            td,
            a {
                font-family: 'Poppins', sans-serif;
            }
    
            body {
                background-color: #F7F7F7;
                margin: 0;
                padding: 0;
            }
    
            p,
            b,
            a,
            .im {
                color: #242424;
            }
    
            .gt a {
                color: #242424!important;
            }
    
            .botao-contemp-preto,
            .botao-contemp {
                display: inline-block;
                padding: 10px 20px;
                border-radius: 8px;
                font-weight: bold;
                text-align: center;
                text-decoration: none;
                text-transform: uppercase;
                font-size: 14px;
            }
    
            .botao-contemp-preto {
                background-color: #242424;
                border: 2px solid #242424;
                color: #fff;
            }
    
            .botao-contemp-preto:hover {
                background-color: #fff;
                color: #B60005;
                border-color: #fff;
            }
    
            .botao-contemp {
                background-color: #B60005;
                color: #fff;
                border: 2px solid #B60005;
            }
    
            .botao-contemp:hover {
                color: #242424;
                background-color: #fff;
                border-color: #242424;
            }
    
            .info-text {
                font-size: small;
                font-style: italic;
                text-align: center;
            }
        </style>
    </head>
    
    <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#F7F7F7" style="padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#fff"
                        style="border-radius: 14px; overflow: hidden; box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.08);">
                        <tr>
                            <td
                                style="background-image: url('https://contemp.com.br/api/arquivos/manual_pdf_2.png'); height: 245px; background-size: cover; background-position: center; color: #fff; font-size: 33px; font-weight: bold; text-align: center;">
                                <!-- Colocar conteúdo do header aqui, se necessário -->
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="padding: 30px; padding-top: 1%; font-family: 'Poppins', sans-serif; font-size: 16px; color: #242424;">
                                <p style="margin-bottom: 10px; font-size: 22px; font-weight: bold; text-align: center; color: #B60005;">
                                    NOTIFICAÇÃO AUTOMÁTICA</p>
                                <p style="margin-bottom: 0px; margin-top: 20px;"><b>Olá 👋, administrador!</b></p>
                                <p style="margin-bottom: 10px;">Você está recebendo esse e-mail porque está cadastrado no
                                    painel administrativo da Contemp.</p>
                                <p style="margin-top: 40px; margin-bottom: 20px; font-weight: bold; color: #B60005;">O manual a seguir foi atualizado:</p>
                                <p style="margin-bottom: 0px;"><b>Nome Anterior:</b> ${old_name || ''}</p>
                                <p style="margin-bottom: 0px;"><b>Nome Atual:</b> ${new_name || ''}</p>
                                <p style="margin-bottom: 0px;"><b>Url Anterior:</b> https://contemp.com.br${old_url || ''}</p>
                                <p style="margin-bottom: 40px;"><b>Url Atual:</b> https://contemp.com.br${new_url || ''}</p>
                                <p style="margin-bottom: 0px;"><b>Data da Modificação:</b> ${date || ''}</p>
                                <p style="margin-bottom: 20px;"><b>Quem Alterou:</b> ${by || ''}</p>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center" style="padding: 10px;">
                                            <a href="https://contemp.com.br${new_url || ''}" target="_blank" class="botao-contemp-preto" style="background-color: #242424; color: #fff; border: 2px solid #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; text-transform: uppercase; font-weight: bold; font-size: 14px;">
                                                Ver Manual
                                            </a>
                                        </td>
                                    </tr>                                
                                    <tr>
                                        <td align="center" style="padding: 20px;">
                                            </a>
                                            <a href="https://contemp.com.br/adm" target="_blank" class="botao-contemp-preto"
                                                style="background-color: #B60005; color: #fff; border: 2px solid #B60005; padding: 10px 20px; border-radius: 8px; text-decoration: none; text-transform: uppercase; font-weight: bold; font-size: 14px;">Verificar
                                                Alterações</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style="border-bottom: 1px solid #d3d3d3; height: 1px; line-height: 1px; font-size: 1px;">
                                            &nbsp;
                                        </td>
                                    </tr>
                                </table>
                                <p style="font-size: small; font-style: italic; text-align: center; margin-top: 30px;">Não
                                    responda diretamente esse e-mail. Ele é somente informativo e não tem caixa de entrada!
                                    Caso precise falar com a 3hub envie um e-mail para <a href="mailto:suporte@3hub.co"
                                        style="color: #fff; text-decoration: underline;">suporte@3hub.co</a> ou fale no
                                    nosso <a href="https://api.whatsapp.com/send?phone=5511987328670" target="_blank"
                                        style="color: #fff; text-decoration: underline;">WhatsApp</a>.</p>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="background-image: url('https://contemp.com.br/api/arquivos/contempfundo.png'); background-size: cover; background-position: center; height: 35px;">
                                <!-- Footer detalhe -->
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding-top: 20px;">
                    <table width="600" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td style="font-size: 14px; text-align: center; color: #242424;">
                                <!-- Conteúdo de copyright e logo -->
                                Copyright ©️ 2024 - <a href="https://3hub.co" style="color: #242424;">3Hub</a> | Todos os
                                direitos reservados
                                <br>
                                <a href="https://3hub.co" target="_blank">
                                    <img src="https://contemp.com.br/api/arquivos/icone3hub.png" alt="Logo 3Hub"
                                        style="margin-top: 10px; width: 15%;">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    
    </html>
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
                    <b>Quem Criou:</b>  ${by || ''}
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
    <title>Atualização de Categoria Contemp</title>
    <style type="text/css">
        body,
        table,
        td,
        a {
            font-family: 'Poppins', sans-serif;
        }

        body {
            background-color: #242424;
            margin: 0;
            padding: 0;
        }

        p,
        b,
        a,
        .im {
            color: #fff;
        }

        .gt a {
            color: #fff!important;
        }

        .botao-contemp-preto,
        .botao-contemp {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 14px;
        }

        .botao-contemp-preto {
            background-color: #242424;
            border: 2px solid #242424;
            color: #fff;
        }

        .botao-contemp-preto:hover {
            background-color: #fff;
            color: #B60005;
            border-color: #fff;
        }

        .botao-contemp {
            background-color: #B60005;
            color: #fff;
            border: 2px solid #B60005;
        }

        .botao-contemp:hover {
            color: #242424;
            background-color: #fff;
            border-color: #242424;
        }

        .info-text {
            font-size: small;
            font-style: italic;
            text-align: center;
        }
    </style>
</head>

<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#242424" style="padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#b60005"
                    style="border-radius: 14px; overflow: hidden; box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.08);">
                    <tr>
                        <td
                            style="background-image: url('https://contemp.com.br/api/arquivos/categoria_atualizada.png'); height: 245px; background-size: cover; background-position: center; color: #fff; font-size: 33px; font-weight: bold; text-align: center;">
                            <!-- Colocar conteúdo do header aqui, se necessário -->
                        </td>
                    </tr>
                    <tr>
                        <td
                            style="padding: 30px; padding-top: 1%; font-family: 'Poppins', sans-serif; font-size: 16px; color: #fff;">
                            <p style="margin-bottom: 10px; font-size: 22px; font-weight: bold; text-align: center;">
                                NOTIFICAÇÃO AUTOMÁTICA</p>
                            <p style="margin-bottom: 0px; margin-top: 20px;"><b>Olá 👋, administrador!</b></p>
                            <p style="margin-bottom: 10px;">Você está recebendo esse e-mail porque está cadastrado no
                                painel administrativo da Contemp.</p>
                            <p style="margin-top: 40px; margin-bottom: 20px; font-weight: bold;"><b>A categoria a seguir foi atualizada:</b></p>
                            <p style="margin-bottom: 0px;"><b>Nome Anterior:</b> ${old_name || ''}</p>
                            <p style="margin-bottom: 0px;"><b>Nome Atual:</b> ${new_name || ''}</p>
                            <p style="margin-bottom: 0px;"><b>Url Anterior:</b> <a href="https://contemp.com.br${old_url || ''}" target="_blank">${old_url || ''}</a></p>
                            <p style="margin-bottom: 40px;"><b>Url Atual:</b> <a href="https://contemp.com.br${new_url || ''}" target="_blank">${new_url || ''}</a></p>
                            <p style="margin-bottom: 0px;"><b>Data da Modificação:</b> ${date || ''}</p>
                            <p style="margin-bottom: 20px;"><b>Quem Alterou:</b> ${by || ''}</p>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="padding: 20px;">
                                        <a href="https://contemp.com.br/adm" target="_blank" class="botao-contemp-preto"
                                            style="background-color: #242424; color: #fff; border: 2px solid #242424; padding: 10px 20px; border-radius: 8px; text-decoration: none; text-transform: uppercase; font-weight: bold; font-size: 14px;">Verificar
                                            Alterações</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="border-bottom: 1px solid #d3d3d3; height: 1px; line-height: 1px; font-size: 1px;">
                                        &nbsp;</td>
                                </tr>
                            </table>
                            <p style="font-size: small; font-style: italic; text-align: center; margin-top: 30px;">Não
                                responda diretamente esse e-mail. Ele é somente informativo e não tem caixa de entrada!
                                Caso precise falar com a 3hub envie um e-mail para <a href="mailto:suporte@3hub.co"
                                    style="color: #fff; text-decoration: underline;">suporte@3hub.co</a> ou fale no
                                nosso <a href="https://api.whatsapp.com/send?phone=5511987328670" target="_blank"
                                    style="color: #fff; text-decoration: underline;">WhatsApp</a>.</p>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style="background-image: url('https://contemp.com.br/api/arquivos/contempfundo_2.png'); background-size: cover; background-position: center; height: 35px;">
                            <!-- Footer detalhe -->
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding-top: 20px;">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="font-size: 14px; text-align: center; color: #fff;">
                            <!-- Conteúdo de copyright e logo -->
                            Copyright ©️ 2024 - <a href="https://3hub.co" style="color: #fff;">3Hub</a> | Todos os
                            direitos reservados
                            <br>
                            <a href="https://3hub.co" target="_blank">
                                <img src="https://contemp.com.br/api/arquivos/logo_3_2x.png" alt="Logo 3Hub"
                                    style="margin-top: 10px; width: 10%;">
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
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
                    <b>Quem Criou:</b>  ${by || ''}
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