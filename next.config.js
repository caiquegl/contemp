const routes = require('./routes.json');

async function creatRedirectObj(source, destination, permanent = true) {
  const exist = await prisma.products.findFirst()

  return {
    source,
    destination,
    permanent
  }
}
module.exports = {
  reactStrictMode: false,
  api: {
    bodyParser: {
      sizeLimit: '500mb',
    },
  },
  images: {
    domains: ['contemp.com.br', 'hmg.contemp.com.br'], // Adicione o domínio do seu host de imagem aqui
  },
  async redirects() {
    return routes
  },

  compress: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'blog.contemp.com.br', 'contemp.com.br', 'hmg.contemp.com.br'],
  },
  async headers() {
    return [
      {
        // cache all static assets for 1 year
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
}