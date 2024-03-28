import React, { useEffect } from 'react';

const GTranslateComponent: React.FC = () => {  useEffect(() => {     const script = document.createElement('script');    script.src = 'https://cdn.gtranslate.net/widgets/latest/dwf.js';    script.defer = true;    document.body.appendChild(script);  }, []);   return <div className="gtranslate_wrapper"></div>;};

export default GTranslateComponent;