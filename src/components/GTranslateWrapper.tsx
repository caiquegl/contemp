import React, { useEffect } from 'react';

const GTranslateWrapper = () => {
  useEffect(() => {
    // Função para inicializar o GTranslate (pode precisar ser ajustada)
    const initGTranslate = () => {
      // Verifica se o script do GTranslate já está carregado
      if (!document.querySelector('script[src="https://cdn.gtranslate.net/widgets/latest/float.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.gtranslate.net/widgets/latest/float.js';
        script.defer = true;
        document.body.appendChild(script);

        // Configuração do GTranslate, ajuste conforme necessário
        window.gtranslateSettings = {
          default_language: 'pt',
          native_language_names: true,
          detect_browser_language: true,
          languages: ['pt', 'es', 'de', 'en'],
          wrapper_selector: '.gtranslate_wrapper',
          switcher_vertical_position: 'top',
          float_switcher_open_direction: 'right',
          alt_flags: { en: 'usa', pt: 'brazil' },
        };
      }
    };

    // Inicializa o GTranslate
    initGTranslate();

    // Configura o MutationObserver para monitorar mudanças no elemento wrapper
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (!document.querySelector('.gtranslate_wrapper')) {
          // Se o wrapper foi removido, tenta reinicializar o GTranslate
          initGTranslate();
        }
      });
    });

    // Observa mudanças no corpo do documento
    observer.observe(document.body, {
      childList: true, // Observa a adição/remoção de elementos
      subtree: true, // Observa toda a árvore de elementos
    });

    // Limpeza ao desmontar o componente
    return () => observer.disconnect();
  }, []);

  return <div className="gtranslate_wrapper"></div>;
};

export default GTranslateWrapper;