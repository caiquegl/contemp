import React, { useEffect } from 'react';

const GTranslateWrapper = () => {
  useEffect(() => {
    const initGTranslate = () => {
      if (!document.querySelector('script[src="https://cdn.gtranslate.net/widgets/latest/float.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.gtranslate.net/widgets/latest/float.js';
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
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
        };
      }
    };

    // Adiciona um atraso antes de inicializar o GTranslate
    setTimeout(initGTranslate, 5000); // Ajuste o tempo conforme necessário

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (!document.querySelector('.gtranslate_wrapper')) {
          initGTranslate();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return <div className="gtranslate_wrapper"></div>;
};

export default GTranslateWrapper;
