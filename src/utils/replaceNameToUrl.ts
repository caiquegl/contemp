export const replaceNameToUrl = (text: string) => {
    if (!text) return ''; // Adicione verificação para garantir que o texto não seja nulo ou indefinido
    return encodeURI(text.replaceAll(' ', '_').replaceAll('/', '||'));
  };
  

export const decodeName = (text: string) => {
    return decodeURI(text).replaceAll(' ', '_').replaceAll('||', '/')
}
