import React from 'react';
import {
    Box,
    Button,
    Img
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const languageOptions = [
    {
        name: "Pt-Br",
        value: 'ptBr',
        flag: 'https://contemp.com.br/api/arquivos/brazil.png'
    },
    {
        name: "En",
        value: 'en',
        flag: 'https://contemp.com.br/api/arquivos/usa.jpg'
    },
    {
        name: "Es",
        value: 'es',
        flag: 'https://contemp.com.br/api/arquivos/espanha.png'
    },
    {
        name: "De",
        value: 'de',
        flag: 'https://contemp.com.br/api/arquivos/germany.png'
    },
];

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    return (
        <Box className='language-switcher' style={{ position: 'fixed', top: '50%', right: '20px', zIndex: '999999999999', transform: 'translateY(-50%)', backgroundColor: 'white', borderRadius:'8px', boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1);', }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {languageOptions.map(languageOption => (
                    <li key={languageOption.value} style={{ marginBottom: '5px' }}>
                        <Button
                            onClick={() => i18n.changeLanguage(languageOption.value)}
                            size="sm"
                            variant="ghost"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Img src={languageOption.flag} alt={' '} style={{ width: '20px', height: 'auto', marginRight: '0px' }} />
                        </Button>
                    </li>
                ))}
            </ul>
        </Box>
    );
};
