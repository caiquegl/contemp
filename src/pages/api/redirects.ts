// pages/api/redirects.ts
import { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as Joi from 'joi';

const redirectsPath = path.resolve(__dirname, './next.config.js');

interface Redirect {
  source: string;
  destination: string;
}

const redirectSchema = Joi.object({
  source: Joi.string().required(),
  destination: Joi.string().required(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const nextConfig = await fs.readFile(redirectsPath, 'utf-8');
      const redirects = parseRedirects(nextConfig);
      res.status(200).json({ redirects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro ao obter redirecionamentos' });
    }
  } else if (req.method === 'POST') {
    const { source, destination } = req.body;
    const validationResult = redirectSchema.validate({ source, destination });

    if (validationResult.error) {
      res.status(400).json({ msg: 'Erro de validação' });
      return;
    }

    try {
      const nextConfig = await fs.readFile(redirectsPath, 'utf-8');
      const updatedConfig = addOrUpdateRedirect(nextConfig, { source, destination });
      await fs.writeFile(redirectsPath, updatedConfig);
      res.status(201).json({
        id: 1,
        message: 'Redirecionamento adicionado/editado com sucesso',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro ao processar a solicitação' });
    }
  } else if (req.method === 'DELETE') {
    const { source } = req.query;

    try {
      const nextConfig = await fs.readFile(redirectsPath, 'utf-8');
      const updatedConfig = deleteRedirect(nextConfig, source as string);
      await fs.writeFile(redirectsPath, updatedConfig);
      res.status(201).json({ msg: 'Redirecionamento excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro ao processar a solicitação' });
    }
  } else {
    res.status(405).json({ msg: 'Método não permitido' });
  }
}

function parseRedirects(config: string): Redirect[] {
  const redirects: Redirect[] = [];

  const redirectRegex = /redirects\s*:\s*\[\s*{([^}]+)}\s*\]/;
  const match = config.match(redirectRegex);

  if (match) {
    const redirectConfig = match[1];
    const redirectPairs = redirectConfig.split(',').map((pair) => pair.trim());

    redirectPairs.forEach((pair) => {
      const [key, value] = pair.split(':').map((item) => item.trim().replace(/'/g, ''));
      if (key && value) {
        redirects.push({ source: key, destination: value });
      }
    });
  }

  console.log('redirects:', redirects);

  return redirects;
}

function addOrUpdateRedirect(config: string, { source, destination }: Redirect): string {
  const existingRedirect = parseRedirects(config).find((redirect) => redirect.source === source);

  if (existingRedirect) {
    const updatedConfig = config.replace(
      `${existingRedirect.source}: ${existingRedirect.destination}`,
      `'${source}': '${destination}'`
    );
    return updatedConfig;
  }

  const newConfig = config.replace(
    /redirects\s*:\s*\[\s*{/,
    `redirects: [{ '${source}': '${destination}',`
  );
  return newConfig;
}

function deleteRedirect(config: string, source: string): string {
  const redirects = parseRedirects(config);

  const redirectIndex = redirects.findIndex((redirect) => redirect.source === source);

  if (redirectIndex !== -1) {
    redirects.splice(redirectIndex, 1);

    const updatedConfig = config.replace(
      /redirects\s*:\s*\[\s*{([^}]+)}\s*\]/,
      `redirects: [${formatRedirects(redirects)}]`
    );
    return updatedConfig;
  }

  return config;
}

function formatRedirects(redirects: Redirect[]): string {
  return redirects.map((redirect) => `'{ ${redirect.source} }': '{ ${redirect.destination} }'`).join(', ');
}
