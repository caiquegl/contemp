// pages/api/redirects.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const redirectsPath = path.resolve(__dirname, './next.config.js');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Lógica para obter redirecionamentos do next.config.js
    const nextConfig = fs.readFileSync(redirectsPath, 'utf-8');
    const redirects = parseRedirects(nextConfig);
    res.status(200).json({ redirects });
  } else if (req.method === 'POST') {
    // Lógica para adicionar ou editar redirecionamento no next.config.js
    const { source, destination } = req.body as { source: string; destination: string };
    const nextConfig = fs.readFileSync(redirectsPath, 'utf-8');
    const updatedConfig = addOrUpdateRedirect(nextConfig, { source, destination });
    fs.writeFileSync(redirectsPath, updatedConfig);
    res.status(201).json({ msg: 'Redirecionamento adicionado/editado com sucesso' });
  } else if (req.method === 'DELETE') {
    // Lógica para excluir redirecionamento no next.config.js
    const { source } = req.query;
    const nextConfig = fs.readFileSync(redirectsPath, 'utf-8');
    const updatedConfig = deleteRedirect(nextConfig, source as string);
    fs.writeFileSync(redirectsPath, updatedConfig);
    res.status(201).json({ msg: 'Redirecionamento excluído com sucesso' });
  } else {
    res.status(405).json({ msg: 'Método não permitido' });
  }
}

function parseRedirects(config: string) {
  const redirects: { source: string; destination: string }[] = [];

  // Use expressão regular para encontrar as configurações de redirecionamento
  const redirectRegex = /redirects\s*:\s*\[\s*{([^}]+)}\s*\]/;
  const match = config.match(redirectRegex);

  if (match) {
    // Se houver uma correspondência, analise as configurações de redirecionamento encontradas
    const redirectConfig = match[1];
    const redirectPairs = redirectConfig.split(',').map((pair) => pair.trim());

    redirectPairs.forEach((pair) => {
      const [key, value] = pair.split(':').map((item) => item.trim().replace(/'/g, ''));
      if (key && value) {
        redirects.push({ source: key, destination: value });
      }
    });
  }

  return redirects;
}

function addOrUpdateRedirect(config: string, { source, destination }: { source: string; destination: string }) {
  // Verifica se o redirecionamento já existe
  const existingRedirect = parseRedirects(config).find((redirect) => redirect.source === source);

  // Se o redirecionamento existir, atualiza a configuração
  if (existingRedirect) {
    const updatedConfig = config.replace(
      `${existingRedirect.source}: ${existingRedirect.destination}`,
      `'${source}': '${destination}'`
    );
    return updatedConfig;
  }

  // Se o redirecionamento não existir, adiciona à configuração
  const newConfig = config.replace(
    /redirects\s*:\s*\[\s*{/,
    `redirects: [{ '${source}': '${destination}',`
  );
  return newConfig;
}

function deleteRedirect(config: string, source: string) {
  const redirects = parseRedirects(config);

  // Verifica se o redirecionamento a ser excluído existe
  const redirectIndex = redirects.findIndex((redirect) => redirect.source === source);

  // Se o redirecionamento existe, exclua-o da lista de redirecionamentos
  if (redirectIndex !== -1) {
    redirects.splice(redirectIndex, 1);

    // Reconstrua a string de configuração com os redirecionamentos atualizados
    const updatedConfig = config.replace(
      /redirects\s*:\s*\[\s*{([^}]+)}\s*\]/,
      `redirects: [${formatRedirects(redirects)}]`
    );
    return updatedConfig;
  }

  // Se o redirecionamento não existir, retorne o config original
  return config;
}

// Função auxiliar para formatar os redirecionamentos para a string de configuração
function formatRedirects(redirects: { source: string; destination: string }[]) {
  return redirects.map((redirect) => `'{ ${redirect.source} }': '{ ${redirect.destination} }'`).join(', ');
}
 
