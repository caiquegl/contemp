module.exports = {
  async redirects() {
    return [
      {
        source: '/vagas',
        destination: '/trabalhe-conosco',
        permanent: true,
      },
    ]
  },
}