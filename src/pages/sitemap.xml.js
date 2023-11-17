const EXTERNAL_DATA_URL = 'https://www.contemp.com.br/api/get-sitemap';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   ${posts
    .map(({ loc }) => {
      return `
    <url>
        <loc>${`${loc}`}</loc>
    </url>
  `;
    })
    .join('')}

   </urlset>
 `;
}

function SiteMap({ sitemap }) {
  return sitemap;
}

export async function getServerSideProps({ res }) {
  // Fazemos uma chamada à API para obter os URLs do nosso site
  // const request = await fetch(EXTERNAL_DATA_URL);
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();

  // Geramos o sitemap XML com os dados dos posts
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // Enviamos o XML para o navegador
  res.write(sitemap);
  res.end();

  return {
    props: {
      sitemap: sitemap, // Aqui você pode retornar uma mensagem ou o próprio sitemap
    },
  };
}

export default SiteMap;
