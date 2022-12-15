module.exports = {
  async redirects() {
    return [
      {
        source: '/vagas',
        destination: '/trabalhe-conosco',
        permanent: true,
      },
      {
        source: '/contato',
        destination: 'https://contemp.com.br',
        permanent: true,
      },
      {
        source: '/empresa',
        destination: '/a-contemp',
        permanent: true,
      },
      {
        source: '/laboratorio-de-calibracao',
        destination: '/calibracao',
        permanent: true,
      },
      {
        source: '/blog',
        destination: 'https://blog.contemp.com.br/',
        permanent: true,
      },
      {
        source: '/',
        destination: 'https://contemp.com.br',
        permanent: true,
      },
    ]
  },
}