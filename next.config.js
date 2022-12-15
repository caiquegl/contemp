function creatRedirectObj (source, destination, permanent = true) {
  return {
    source,
    destination,
    permanent
  }
}
module.exports = {
  async redirects() {
    return [
      creatRedirectObj ('/vagas', '/trabalhe-conosco'),
      creatRedirectObj ('/contato', 'https://contemp.com.br'),
      creatRedirectObj ('/empresa', '/a-contemp'),
      creatRedirectObj ('/laboratorio-de-calibracao', '/calibracao'),
      creatRedirectObj ('/blog', 'https://blog.contemp.com.br/'),
    ]
  },
}