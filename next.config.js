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
      creatRedirectObj ('/2022/04/12/defeitos-comuns-no-mau-uso-do-sensor-de-temperatura-industrial', 'https://blog.contemp.com.br/defeitos-comuns-no-mau-uso-do-sensor-de-temperatura-industrial'),
      creatRedirectObj ('/categoria-produto/potencia/reles-de-estado-solido-ssr', '/category/RELÉS_DE_ESTADO_SÓLIDO_SSR'),
      creatRedirectObj ('/produto/instrumentos/controladores-de-temperatura-e-processo/c714-controlador-de-processos-linha-avancada', '/produto/C714'),
      creatRedirectObj ('/2022/04/12/sensor-pt-100-como-ele-auxilia-os-processos-da-sua-industria/', 'https://blog.contemp.com.br/sensor-pt-100-como-ele-auxilia-os-processos-da-sua-industria/'),
      creatRedirectObj ('/produto/instrumentos/placas-controladoras-de-temperatura-e-processo/c130-controlador-de-temperatura/', '/produto/C130'),
      creatRedirectObj ('/produto/instrumentos/transmissores-de-temperatura-trilho-din/s211-transmissor-de-temperatura-isolado-cabecote/', '/produto/S211E'),
      creatRedirectObj ('/produto/instrumentos/controladores-de-temperatura-e-processo/c414-controlador-de-processos-linha-economica/', '/produto/C414'),
      creatRedirectObj ('/produto/instrumentos/cta3-conversor-de-sinais-e-isolador-galvanico/', '/produto/CTA_'),
      creatRedirectObj ('/produto/potencia/reles-de-estado-solido-ssr/cr1dc-rele-de-estado-solido-monofasico-comando-dc/', '/category/RELÉS_DE_ESTADO_SÓLIDO_SSR'),
      creatRedirectObj ('/produto/sensores/cabos-de-extensao-tc-tr/cabo-termorresistencia-3x24-awg/', '/category/CABOS_E_EXTENS%C3%95ES_TC%7CTR'),
      creatRedirectObj ('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-alta-performance/ctlaser-05m-pirometro-fixo-optris-para-metais-e-metais-fundidos', '/produto/CTLaser_05M'),
      creatRedirectObj ('/produto/sensores/termopares/tccl-termopar-cabecote-e-tubo-protecao-ceramico-10mm-luva-metalica-85-mm/', '/category/TERMOPAR'),
      creatRedirectObj ('/produto/instrumentos/indicadores-de-temperatura-e-processo/i414-indicador-de-processos-linha-economica/', '/produto/I414'),
      creatRedirectObj ('/2022/03/10/controladores-de-temperatura-o-que-sao/', '/controladores-de-temperatura-o-que-sao-2/'),
      creatRedirectObj ('/produto/sensores/cabos-de-extensao-tc-tr/cabo-de-extensao-termopar-k-2x24-awg/', '/category/TIPO_%22K%22'),
      creatRedirectObj ('/produto/sensores/termopares/tmcm-termopar-mineral-conector-macho-standard/', '/category/TERMOPAR'),
      creatRedirectObj ('/2022/03/10/termopar-onde-utilizar/', '/termopar-onde-utilizar-2/'),
      creatRedirectObj ('/produto/potencia/controladores-de-potencia/p501-controlador-de-potencia-linha-avancada-duas-fases-300a/', '/produto/P501'),
      creatRedirectObj ('/produto/sensores/cabos-de-extensao-tc-tr/cabo-de-compensacao-termopar-n-2x24-awg/', '/category/TIPO_%22N%22'),
      creatRedirectObj ('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-alta-performance/csvideo-3m-pirometro-fixo-optris-para-metais/', '/produto/CSvideo_3M_para_metal'),
      creatRedirectObj ('/produto/potencia/reles-de-estado-solido-ssr/cr1ac-rele-de-estado-solido-monofasico-comando-ac/', '/category/REL%C3%89S_DE_ESTADO_S%C3%93LIDO_SSR'),
      creatRedirectObj ('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-compacta/ctlt-pirometro-fixo-optris-compacto-para-espacos-limitados/', '/category/PIR%C3%94METROS_FIXOS_OPTRIS'),
      creatRedirectObj ('/produto/potencia/controladores-de-potencia/p501-controlador-de-potencia-linha-avancada/', '/produto/P501'),
      creatRedirectObj ('/produto/sensores/cabos-de-extensao-tc-tr/cabo-de-extensao-termopar-t-2x24-awg/', '/category/TIPO_%22T%22'),
      creatRedirectObj ('/produto/instrumentos/contadores-e-temporizadores/k304-contador-e-totalizador/', '/produto/K304'),
      creatRedirectObj ('/produto/potencia/controladores-de-potencia/p501-controlador-de-potencia-linha-desempenho/', '/produto/P501'),
      creatRedirectObj ('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-compacta/cslt-pirometro-fixo-optris-para-fabricantes-de-maquinas/', '/produto/CSLT'),
      creatRedirectObj ('/produto/sensores/cabos-de-extensao-tc-tr/cabo-de-extensao-termopar-j-2x24-awg/', '/category/TIPO_%22J%22'),
      creatRedirectObj ('/produto/instrumentos/transmissores-de-umidade-e-temperatura/s501a-transmissor-de-temperatura-e-umidade/', '/produto/S501'),
      creatRedirectObj ('/produto/instrumentos/controladores-de-temperatura-e-processo/c719-controlador-de-temperatura-e-processos-linha-avancada/', '/produto/C719'),
      creatRedirectObj ('/2022/03/11/monitoramento-termico-na-transferencia-forno-panela/', '/monitoramento-termico-na-transferencia-forno-panela-2/'),
      creatRedirectObj ('/produto/instrumentos/registradores-graficos-e-insumos/phz1002-cabeca-impressora-phe9-phc-pha/', '/category/INSTRUMENTA%C3%87%C3%83O_E_CONTROLE'),
      creatRedirectObj ('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-alta-performance/ctlaser-4m-pirometro-fixo-optris-para-metais-oxidos-metais-e-ceramica/', '/produto/CTLaser_4M'),
      creatRedirectObj ('/produto/potencia/reles-de-estado-solido-ssr/cr3-linear-rele-de-estado-solido-trifasico-comando-linear-0a10v-ou-4a20ma/', '/produto/CR3_LN'),
      creatRedirectObj ('/2022/03/10/cameras-de-infravermelho-optris/', '/cameras-de-infravermelho-optris-2/'),
      creatRedirectObj ('/produto/instrumentos/transmissores-de-temperatura-cabecote-tc-tr/s201-transmissor-de-temperatura/', '/produto/S202E'),
      creatRedirectObj ('/produto/potencia/controladores-de-potencia/p301-controlador-de-potencia/', '/produto/P301'),
      creatRedirectObj ('/produto/instrumentos/placas-controladoras-de-temperatura-e-processo/etc-lcd-controlador-de-processos/', '/produto/ETC_LCD'),
      creatRedirectObj ('/produto/potencia/reles-de-estado-solido-ssr/cr3ac-rele-de-estado-solido-trifasico-comando-ac/', '/category/RELÉS_DE_ESTADO_SÓLIDO_SSR'),
      creatRedirectObj ('/produto/instrumentos/controladores-de-temperatura-e-processo/c715-controlador-de-processos-linha-avancada/', '/produto/C715'),
      creatRedirectObj ('/produto/instrumentos/indicadores-de-temperatura-e-processo/i716-linha-avancada-indicador-de-temperatura-e-processo/', '/produto/I716'),
      creatRedirectObj ('/produto/instrumentos/transmissores-de-temperatura-cabecote-tc-tr/s222-transmissor-de-temperatura-trilho-din/', '/produto/S222'),
      creatRedirectObj ('/produto/instrumentos/contadores-e-temporizadores/t304-temporizador/', '/produto/T304'),
      creatRedirectObj ('/produto/instrumentos/controladores-de-temperatura-e-processo/c515-controlador-de-processos-linha-desempenho/', '/produto/C515'),
      creatRedirectObj ('/todos-os-produtos', '/todosProdutos'),
    ]
  },
}