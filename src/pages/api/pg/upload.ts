import multer from 'multer';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { prisma } from '../../../lib/prisma';
import { createSlug, SlugifyOptions } from '../pg/slugfyfile'; // Importe a função de slugify

// Configuração do multer para o armazenamento de arquivos
const upload = multer({
  storage: multer.diskStorage({
    destination: process.env.STATUS === 'HMG' ? '/var/www/html/arquivos_hmg' : '/var/www/html/arquivos',
    filename: (req, file, cb) => {
      console.log('aquiiii')
      // Opções para a função de criação de slug
      const slugOptions: SlugifyOptions = {
        replacementChar: '_',
        removePunctuation: true,
        maxLength: 1500, // Ajuste conforme necessário
      };
      console.log('aquiiii multer')

      // Criar um nome de arquivo slugificado usando a função
      const slugifiedName = createSlug(file.originalname, slugOptions);
      console.log('aquiiii multer 3')
      cb(null, slugifiedName);
    },
  }),
  limits: {
    fileSize: 1073741824, // 10 megabytes (ajuste conforme necessário)
  },
});

// Configuração da rota API
const apiRoute = nextConnect({
  // Manipulador de erro global para a rota
  onError(error, req: any, res: NextApiResponse<any>) {
    res.status(501).json({ error: `Desculpe, algo deu errado! ${error.message}` });
  },
  // Manipulador para método não permitido
  onNoMatch(req: any, res: NextApiResponse<any>) {
    res.status(405).json({ error: `Método '${req.method}' não permitido` });
  },
});

// Utilizar o middleware de upload para manipular arquivos
apiRoute.use(upload.array('files'));

// Manipulador de postagem para a rota API
apiRoute.post(async (req: any, res: NextApiResponse<any>) => {
  const files = req.files;
  let picture = req.picture

  let url = ''
  try {
    // Iterar sobre os arquivos enviados
    for await (let file of files) {
      // Criar um nome de arquivo slugificado usando a função
      const nameFile = createSlug(file.originalname, {
        replacementChar: '_',
        removePunctuation: true,
        maxLength: 25000, // Ajuste conforme necessário
      });

      // Construir a URL do arquivo com base no nome slugificado
      let baseFile = process.env.STATUS === 'HMG' ? 'https://hmg.contemp.com.br' : 'https://contemp.com.br'
      url = `${baseFile}/api/arquivos/${nameFile}`;
      if(!picture) {
        // Verificar se o arquivo já existe no banco de dados
        const exist = await prisma.files.findMany({
          where: {
            name: {
              in: nameFile,
            },
          },
        });

        // Se o arquivo já existir, continuar para o próximo arquivo
        if (exist.length > 0) continue;

        // Criar uma entrada no banco de dados para o novo arquivo
        await prisma.files.create({
          data: {
            url: url,
            name: nameFile,
            created_at: new Date(),
          },
        });
      }
    }

    // Obter informações do usuário a partir do cookie
    let user: any = JSON.parse(req.cookies['nextAuth.contemp'] as string);
    user = user?.body?.email || '';

    if(!picture) {
      // Registrar a ação de upload nos logs
      await prisma.logs.create({
        data: {
          user: user,
          description: `Arquivos enviados`,
        },
      });
    }

    // Responder com status de sucesso
    return res.status(201).json({
      status: true,
      url
    });
  } catch (error) {
    console.error(error);
    // Responder com status de erro interno do servidor
    return res.status(500).json({
      status: false,
      error: 'Erro interno do servidor',
    });
  }
});

// Configuração específica da API para desabilitar o parse do corpo (consume como stream)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Exportar a rota API configurada
export default apiRoute;
