function creatRedirectObj(source, destination, permanent = true) {
  return {
    source,
    destination,
    permanent
  }
}
module.exports = {
    images: {
      domains: ['contemp.com.br'], // Adicione o domínio do seu host de imagem aqui
    },
  
  async redirects() {
    return [
      creatRedirectObj('/vagas', '/trabalhe-conosco'),
      creatRedirectObj('/contato', 'https://contemp.com.br'),
      creatRedirectObj('/empresa', '/a-contemp'),
      creatRedirectObj('/laboratorio-de-calibracao', '/calibracao'),
      creatRedirectObj('/2022/04/12/defeitos-comuns-no-mau-uso-do-sensor-de-temperatura-industrial', 'https://blog.contemp.com.br/defeitos-comuns-no-mau-uso-do-sensor-de-temperatura-industrial'),
      creatRedirectObj('/categoria-produto/potencia/reles-de-estado-solido-ssr', '/category/RELÉS_DE_ESTADO_SÓLIDO_SSR'),
      creatRedirectObj('/produto/instrumentos/controladores-de-temperatura-e-processo/c714-controlador-de-processos-linha-avancada', '/produto/C714'),
      creatRedirectObj('/2022/04/12/sensor-pt-100-como-ele-auxilia-os-processos-da-sua-industria/', 'https://blog.contemp.com.br/sensor-pt-100-como-ele-auxilia-os-processos-da-sua-industria/'),
      creatRedirectObj('/produto/instrumentos/placas-controladoras-de-temperatura-e-processo/c130-controlador-de-temperatura/', '/produto/C130'),
      creatRedirectObj('/produto/instrumentos/transmissores-de-temperatura-trilho-din/s211-transmissor-de-temperatura-isolado-cabecote/', '/produto/S211E'),
      creatRedirectObj('/produto/instrumentos/controladores-de-temperatura-e-processo/c414-controlador-de-processos-linha-economica/', '/produto/C414'),
      creatRedirectObj('/produto/instrumentos/cta3-conversor-de-sinais-e-isolador-galvanico/', '/produto/CTA_'),
      creatRedirectObj('/produto/potencia/reles-de-estado-solido-ssr/cr1dc-rele-de-estado-solido-monofasico-comando-dc/', '/category/RELÉS_DE_ESTADO_SÓLIDO_SSR'),
      creatRedirectObj('/produto/sensores/cabos-de-extensao-tc-tr/cabo-termorresistencia-3x24-awg/', '/category/CABOS_E_EXTENS%C3%95ES_TC%7CTR'),
      creatRedirectObj('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-alta-performance/ctlaser-05m-pirometro-fixo-optris-para-metais-e-metais-fundidos', '/produto/CTLaser_05M'),
      creatRedirectObj('/produto/sensores/termopares/tccl-termopar-cabecote-e-tubo-protecao-ceramico-10mm-luva-metalica-85-mm/', '/category/TERMOPAR'),
      creatRedirectObj('/produto/instrumentos/indicadores-de-temperatura-e-processo/i414-indicador-de-processos-linha-economica/', '/produto/I414'),
      creatRedirectObj('/2022/03/10/controladores-de-temperatura-o-que-sao/', '/controladores-de-temperatura-o-que-sao-2/'),
      creatRedirectObj('/produto/sensores/cabos-de-extensao-tc-tr/cabo-de-extensao-termopar-k-2x24-awg/', '/category/TIPO_%22K%22'),
      creatRedirectObj('/produto/sensores/termopares/tmcm-termopar-mineral-conector-macho-standard/', '/category/TERMOPAR'),
      creatRedirectObj('/2022/03/10/termopar-onde-utilizar/', '/termopar-onde-utilizar-2/'),
      creatRedirectObj('/produto/potencia/controladores-de-potencia/p501-controlador-de-potencia-linha-avancada-duas-fases-300a/', '/produto/P501'),
      creatRedirectObj('/produto/sensores/cabos-de-extensao-tc-tr/cabo-de-compensacao-termopar-n-2x24-awg/', '/category/TIPO_%22N%22'),
      creatRedirectObj('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-alta-performance/csvideo-3m-pirometro-fixo-optris-para-metais/', '/produto/CSvideo_3M_para_metal'),
      creatRedirectObj('/produto/potencia/reles-de-estado-solido-ssr/cr1ac-rele-de-estado-solido-monofasico-comando-ac/', '/category/REL%C3%89S_DE_ESTADO_S%C3%93LIDO_SSR'),
      creatRedirectObj('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-compacta/ctlt-pirometro-fixo-optris-compacto-para-espacos-limitados/', '/category/PIR%C3%94METROS_FIXOS_OPTRIS'),
      creatRedirectObj('/produto/potencia/controladores-de-potencia/p501-controlador-de-potencia-linha-avancada/', '/produto/P501'),
      creatRedirectObj('/produto/sensores/cabos-de-extensao-tc-tr/cabo-de-extensao-termopar-t-2x24-awg/', '/category/TIPO_%22T%22'),
      creatRedirectObj('/produto/instrumentos/contadores-e-temporizadores/k304-contador-e-totalizador/', '/produto/K304'),
      creatRedirectObj('/produto/potencia/controladores-de-potencia/p501-controlador-de-potencia-linha-desempenho/', '/produto/P501'),
      creatRedirectObj('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-compacta/cslt-pirometro-fixo-optris-para-fabricantes-de-maquinas/', '/produto/CSLT'),
      creatRedirectObj('/produto/sensores/cabos-de-extensao-tc-tr/cabo-de-extensao-termopar-j-2x24-awg/', '/category/TIPO_%22J%22'),
      creatRedirectObj('/produto/instrumentos/transmissores-de-umidade-e-temperatura/s501a-transmissor-de-temperatura-e-umidade/', '/produto/S501'),
      creatRedirectObj('/produto/instrumentos/controladores-de-temperatura-e-processo/c719-controlador-de-temperatura-e-processos-linha-avancada/', '/produto/C719'),
      creatRedirectObj('/2022/03/11/monitoramento-termico-na-transferencia-forno-panela/', '/monitoramento-termico-na-transferencia-forno-panela-2/'),
      creatRedirectObj('/produto/instrumentos/registradores-graficos-e-insumos/phz1002-cabeca-impressora-phe9-phc-pha/', '/category/INSTRUMENTA%C3%87%C3%83O_E_CONTROLE'),
      creatRedirectObj('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-alta-performance/ctlaser-4m-pirometro-fixo-optris-para-metais-oxidos-metais-e-ceramica/', '/produto/CTLaser_4M'),
      creatRedirectObj('/produto/potencia/reles-de-estado-solido-ssr/cr3-linear-rele-de-estado-solido-trifasico-comando-linear-0a10v-ou-4a20ma/', '/produto/CR3_LN'),
      creatRedirectObj('/2022/03/10/cameras-de-infravermelho-optris/', '/cameras-de-infravermelho-optris-2/'),
      creatRedirectObj('/produto/instrumentos/transmissores-de-temperatura-cabecote-tc-tr/s201-transmissor-de-temperatura/', '/produto/S202E'),
      creatRedirectObj('/produto/potencia/controladores-de-potencia/p301-controlador-de-potencia/', '/produto/P301'),
      creatRedirectObj('/produto/instrumentos/placas-controladoras-de-temperatura-e-processo/etc-lcd-controlador-de-processos/', '/produto/ETC_LCD'),
      creatRedirectObj('/produto/potencia/reles-de-estado-solido-ssr/cr3ac-rele-de-estado-solido-trifasico-comando-ac/', '/category/RELÉS_DE_ESTADO_SÓLIDO_SSR'),
      creatRedirectObj('/produto/instrumentos/controladores-de-temperatura-e-processo/c715-controlador-de-processos-linha-avancada/', '/produto/C715'),
      creatRedirectObj('/produto/instrumentos/indicadores-de-temperatura-e-processo/i716-linha-avancada-indicador-de-temperatura-e-processo/', '/produto/I716'),
      creatRedirectObj('/produto/instrumentos/transmissores-de-temperatura-cabecote-tc-tr/s222-transmissor-de-temperatura-trilho-din/', '/produto/S222'),
      creatRedirectObj('/produto/instrumentos/contadores-e-temporizadores/t304-temporizador/', '/produto/T304'),
      creatRedirectObj('/produto/instrumentos/controladores-de-temperatura-e-processo/c515-controlador-de-processos-linha-desempenho/', '/produto/C515'),
      creatRedirectObj('/todos-os-produtos', '/todosProdutos'),
      creatRedirectObj('/categoria-produto/instrumentos/controladores-de-temperatura-e-processo', '/category/CONTROLADORES_DE_TEMPERATURA_E_PROCESSOS'),
      creatRedirectObj('/categoria-produto/sensores/termopares/', '/category/TERMOPAR'),
      creatRedirectObj('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-compacta/ct-g5-pirometro-fixo-optris-para-vidro/', '/produto/CT_G5_para_vidro'),
      creatRedirectObj('/produto/instrumentos/conversores-digitais/d501-conversor-de-usb/', '/produto/D501'),
      creatRedirectObj('/produto/instrumentos/aquisitor-analogico-datalogger/a202-datalogger-8-canais-fundo-de-painel/', '/produto/A202'),
      creatRedirectObj('/produtos/c/controladores-e-indicadores-de-temperatura-e-processos/', 'https://contemp.com.br'),
      creatRedirectObj('/produtos/transmissores-de-pressao-relativa/transmissores-de-pressao-relativa/transmissor-de-pressao-relativa-ctp', '/produto/CTP'),
      creatRedirectObj('/wp-content/uploads/2010/12/a202-menor.png', 'https://contemp.com.br'),
      creatRedirectObj('/wp-content/uploads/TAML-METALICO.png', 'https://contemp.com.br'),
      creatRedirectObj('/produtos/controladores-e-indicadores-de-temperatura-e-processos/', '/category/CONTROLADORES_DE_TEMPERATURA_E_PROCESSOS'),
      creatRedirectObj('/wp-content/themes/contemp/images/contemp-768.png', 'https://contemp.com.br'),
      creatRedirectObj('/wp-content/uploads/2019/10/Contemp-Optris_CT_XL_3M_b.jpg', 'https://contemp.com.br'),
      creatRedirectObj('/produto/data-logger/instalador-masterlogger-a202-v10-001-03/', 'https://contemp.com.br'),
      creatRedirectObj('/wp-content/uploads/CDR-2022-SITE-1.png', 'https://contemp.com.br'),
      creatRedirectObj('/wp-content/uploads/C714-Controlador-de-Temperatura-e-Processos-Contemp-Linha-Avancada.png', 'https://contemp.com.br'),
      creatRedirectObj('/2022/10/12/write-my-essay-online/', 'https://contemp.com.br'),
      creatRedirectObj('/wp-content/uploads/OAC-Rele-de-Estado-Solido-Monofasico-Comando-AC.png', 'https://contemp.com.br'),
      creatRedirectObj('/wp-content/uploads/2010/12/fotod501.png', 'https://contemp.com.br'),
      creatRedirectObj('/produtos/aquisitores-registradores-sistemas-supervisorios/registradores-com-papel/registrador-grafico-pha', '/produto/AQUISITOR_DE_DADOS'),
      creatRedirectObj('/wp-content/plugins/webp-express/test/test-pattern-tv.jpg', '/todosProdutos'),
      creatRedirectObj('/wp-content/uploads/2017/06/D501-F.jpg', 'https://contemp.com.br'),
      creatRedirectObj('/wp-content/uploads/2012/04/Contemp-P501-1.jpg', 'https://contemp.com.br'),
      creatRedirectObj('/ukzzv-17538-procesador-SLGTE-Intel-Core-Duo-E7500', 'https://contemp.com.br'),
      creatRedirectObj('/allProduct', '/todosProdutos'),
      //Erro de redirecionamento Google Search
      creatRedirectObj('/cjbeewii-154907-DTAP-pour-câble-de-montage-DSLR-Utilisation-de/', '/todosProdutos'),
      creatRedirectObj('/lhnab-3642-quilates-ohrhänger-pendiente-Aretes-chysopras/', '/todosProdutos'),
      creatRedirectObj('/pjnawf-897229-combustible-de-gasolina-Anillo-de-Retención-Correa-Ajuste-Para-Volvo/', '/todosProdutos'),
      creatRedirectObj('/vlwkiydh-564950-de-dígitos-descodificar-Land-Rover-Discovery/', '/todosProdutos'),
      creatRedirectObj('/vozvnobt-920779-eliminaciónEliminador-de-HICAS-con-Superpro-Arbustos-Para-Horizonte-R-GTR/', '/todosProdutos'),
      creatRedirectObj('/wp-content/uploads/2022/02/C71X_V1.05-REV.03.pdf', '/category/LINHA_AVAN%C3%87ADA_-_C71X'),
      creatRedirectObj('/produto/instrumentos/controladores-de-temperatura-e-processo/c714-controlador-de-processos-linha-avancada/', '/produto/CONTROLADOR_DE_TEMPERATURA_E_PROCESSOS_-_C714'),
      creatRedirectObj('/wp-content/uploads/2022/02/C41X_V1.05-REV.2-1.pdf', '/category/LINHA_ECON%C3%94MICA_-_C41X'),
      creatRedirectObj('/produto/potencia/controladores-de-potencia/p501-controlador-de-potencia-linha-avancada', '/category/CONTROLADORES_DE_POT%C3%8ANCIA'),
      creatRedirectObj('/produto/optris-ctratio-1m/', '/category/CÂMERAS_TERMOGRÁFICAS_FIXAS'),
      creatRedirectObj('/produto/FONTE_-__F401_-_24V/60W', '/produto/FONTE_-__F401_-_24V%7C%7C60W'),
      creatRedirectObj('/produto/COMPENSA%C3%87%C3%83O_TIPO_%22S/R%22', '/produto/CABO_COMPENSA%C3%87%C3%83O_TIPO_%22S%7C%7CR%22'),
      creatRedirectObj('/produto/CABO_TERMORRESIST%C3%8ANCIA_-_3X24_AWG_TEFLON_/_TEFLON', '/produto/CABO_TERMORRESISTÊNCIA_-_3X24_AWG_TEFLON_%7C%7C_TEFLON'),
      creatRedirectObj('/produto/CABO_TERMORRESIST%C3%8ANCIA_-_3x24_AWG_SILICONE_/_SILICONE', '/produto/CABO_TERMORRESISTÊNCIA_-_3x24_AWG_SILICONE_%7C%7C_SILICONE'),
      creatRedirectObj('/produto/CABO_TERMORRESIST%C3%8ANCIA_-_6X14_AWG_-_TEFLON/TEFLON', '/produto/CABO_TERMORRESISTÊNCIA_-_6X14_AWG_-_TEFLON%7C%7CTEFLON'),
      creatRedirectObj('/categoria-produto/sensores/termopares', '/category/TERMOPARES'),
      creatRedirectObj('/solicitar-orcamento', '/orcamento'),
      creatRedirectObj('/categoria-produto/imageamento-termico-industrial/cameras-termograficas-optris-linha-automacao', '/category/CÂMERAS_TERMOGRÁFICAS_FIXAS'),
      creatRedirectObj('/category/CONTADOR_/_TEMPORIZADOR_/_VELOC%C3%8DMETRO', '/category/CONTADOR_%7C%7C_TEMPORIZADOR_%7C%7C_VELOCÍMETRO'),
      creatRedirectObj('/catalogo_optris', '/category/C%C3%82MERAS_TERMOGR%C3%81FICAS_FIXAS#viewCategory'),
      creatRedirectObj('/produto/instrumentos/controladores-de-temperatura-e-processo/c719-controlador-de-temperatura-e-processos-linha-avancada/', '/produto/CONTROLADOR_DE_TEMPERATURA_E_PROCESSOS_-_C719'),
      creatRedirectObj('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-compacta/ct-1m-2m-pirometro-fixo-optris-para-metais-oxidos-metais-e-ceramica/', '/category/PIRÔMETROS_INFRAVERMELHOS_FIXOS'),
      creatRedirectObj('/categoria-produto/instrumentos/', 'https://contemp.com.br/'),
      creatRedirectObj('/wp-content/uploads/2022/02/C51X_V1.05-REV.2-1.pdf', '/category/LINHA_DESEMPENHO_-_C51X'),
      creatRedirectObj('/wp-content/uploads/2022/02/S501_V1.05-REV.12.pdf', '/category/LINHA_DESEMPENHO_-_C51X'),
      creatRedirectObj('/downloads/pdf/Manual', 'https://www.contemp.com.br/'),
      creatRedirectObj('/wp-content/uploads/2022/02/C41X_V1.05-REV.2.pdf', '/category/LINHA_ECONÔMICA_-_C41X'),
      creatRedirectObj('/wp-content/uploads/2022/02/KT507-Manual-do-Produto.pdf', '/produto/CONTADOR,_TEMPORIZADOR_E_VELOCÍMETRO_-_KT507'),
      creatRedirectObj('/categoria-produto/imageamento-termico-industrial/pirometros-portateis-infravermelho/', '/category/PIRÔMETROS_PORTÁTEIS'),
      creatRedirectObj('/produto/instrumentos/contadores-e-temporizadores/k304-contador-e-totalizador/', '/produto/CONTADOR_-_K304'),
      creatRedirectObj('/wp-content/uploads/2022/02/ETC-Lcd-Manual-do-Produto.pdf', '/category/PLACAS_CONTROLADORAS'),
      creatRedirectObj('/produto/instrumentos/controladores-de-temperatura-e-processo/c417-controlador-de-temperatura-linha-economica/', '/produto/CONTROLADOR_DE_TEMPERATURA_-_C417'),
      creatRedirectObj('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-compacta/cslt-pirometro-fixo-optris-para-fabricantes-de-maquinas/', '/category/PIRÔMETROS_INFRAVERMELHOS_FIXOS'),
      creatRedirectObj('/produto/potencia/reles-de-estado-solido-ssr/cr3-linear-rele-de-estado-solido-trifasico-comando-linear-0a10v-ou-4a20ma/', '/category/RELÉS_DE_ESTADO_SÓLIDO_SSR'),
      creatRedirectObj('/produtos/controladores-e-indicadores-de-', '/category/CONTROLADORES_DE_PROCESSOS'),
      creatRedirectObj('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-alta-performance/ctlaser-f2-pirometro-fixo-optris-para-medicao-em-chamas-co2/', '/category/PIRÔMETROS_INFRAVERMELHOS_FIXOS'),
      creatRedirectObj('/wp-content/uploads/2015/12/A502_view.pdf', '/produto/AQUISITOR_DE_DADOS_ANALÓGICOS_-_A502'),
      creatRedirectObj('/produto/instrumentos/controladores-de-temperatura-e-processo/c719-controlador-de-temperatura-e-processos-linha-avancada/', '/produto/CONTROLADOR_DE_TEMPERATURA_E_PROCESSOS_-_C719'),
      creatRedirectObj('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-compacta/ct-1m-2m-pirometro-fixo-optris-para-metais-oxidos-metais-e-ceramica/', '/category/COMPACTA_-_OPTRIS'),
      creatRedirectObj('/categoria-produto/instrumentos/', 'https://www.contemp.com.br/'),
      creatRedirectObj('/wp-content/uploads/2022/02/C51X_V1.05-REV.2-1.pdf', '/category/LINHA_DESEMPENHO_-_C51X'),
      creatRedirectObj('/wp-content/uploads/2022/02/S501_V1.05-REV.12.pdf', '/produto/TRANSMISSOR_DE_TEMPERATURA_E_UMIDADE_-_S501'),
      creatRedirectObj('/produto/sensores/termopares/tccl-termopar-cabecote-e-tubo-protecao-ceramico-10mm-luva-metalica-85-mm/', '/category/TERMOPARES'),
      creatRedirectObj('/produto/instrumentos/contadores-e-temporizadores/t304-temporizador/', '/produto/TEMPORIZADOR_-_T304'),
      creatRedirectObj('/wp-content/uploads/2022/02/C41X_V1.05-REV.2.pdf', '/category/LINHA_ECONÔMICA_-_C41X'),
      creatRedirectObj('/wp-content/uploads/2022/02/KT507-Manual-do-Produto.pdf', '/produto/CONTADOR,_TEMPORIZADOR_E_VELOCÍMETRO_-_KT507'),
      creatRedirectObj('/categoria-produto/imageamento-termico-industrial/pirometros-portateis-infravermelho/', '/category/PIRÔMETROS_INFRAVERMELHOS_FIXOS'),
      creatRedirectObj('/produto/instrumentos/controladores-de-temperatura-e-processo/c417-controlador-de-temperatura-linha-economica/', '/produto/CONTROLADOR_DE_TEMPERATURA_-_C417'),
      creatRedirectObj('/produto/imageamento-termico-industrial/pirometros-fixos-optris-serie-compacta/cslt-pirometro-fixo-optris-para-fabricantes-de-maquinas/', '/category/PIRÔMETROS_INFRAVERMELHOS_FIXOS'),
      creatRedirectObj('/produto/potencia/reles-de-estado-solido-ssr/cr3-linear-rele-de-estado-solido-trifasico-comando-linear-0a10v-ou-4a20ma/', '/category/RELÉS_DE_ESTADO_SÓLIDO_SSR'),
      creatRedirectObj('/produto/sensores/cabos-de-extensao-tc-tr/cabo-termorresistencia-3x24-awg/', '/produto/CABO_TERMORRESISTÊNCIA_-_3x24_AWG_SILICONE_%7C%7C_SILICONE'),
      creatRedirectObj('/produtos/sem-categoria/', 'https://www.contemp.com.br'),
      creatRedirectObj('/eventos/', 'https://www.contemp.com.br'),
      creatRedirectObj('/wp-content/uploads/2022/02/CR1PT-Manual-do-Produto.pdf', '/category/RELÉS_DE_ESTADO_SÓLIDO_SSR'),
      creatRedirectObj('/wp-content/uploads/2010/12/Cross_Reference_2009____.pdf', 'https://www.contemp.com.br'),
      creatRedirectObj('/wp-sitemap.xml', 'sitemap.xml'),
      creatRedirectObj('/wp-content/uploads/2012/03/Manual-C304_C404_C407_C409.pdf', '/produto/CONTROLADOR_DE_TEMPERATURA_-_C404'),
      creatRedirectObj('/produto/sensores/cabos-de-extensao-tc-tr/cabo-de-extensao-termopar-k-2x24-awg/', '/category/CABOS_TERMOPARES'),
      creatRedirectObj('/produto/controlador-de-processos/c702_v1-02-rev-01/', '/produto/CONTROLADOR_DE_TEMPERATURA_E_PROCESSOS_-_C702'),
      creatRedirectObj('/produto/imageamento-termico-industrial/pirometros-portateis-infravermelho/msplus-lt-termometro-portatil-optris/', '/category/LINHA_PERFORMANCE_-_OPTRIS'),
      creatRedirectObj('/wp-content/uploads/2022/02/C71X_V1.05-REV.03-2-1.pdf', '/category/LINHA_AVANÇADA_-_C71X'),
      creatRedirectObj('/downloads/pdf/CTM45_view.pdf', '/produto/CONTROLADOR_DE_TEMPERATURA_E_PROCESSOS_-_CTM45'),
      creatRedirectObj ('/arquivos/temnacontemp.pdf', '/api/arquivos/temnacontemp.pdf'),
      // creatRedirectObj ('', ''),
    ]
  },
  compress: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'blog.contemp.com.br'],
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