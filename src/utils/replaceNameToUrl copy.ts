export const replaceNameToUrl = (text: string) => {
    // Substituir espaços em branco por underscores
    const replacedSpaces = text.replace(/\s+/g, '_');
    // Codificar caracteres especiais, incluindo espaços em branco
    const encodedText = encodeURIComponent(replacedSpaces);
    // Substituir barras por "%2F"
    return encodedText.replace(/%2F/g, '||');
}

export const decodeName = (text: string) => {
    // Substituir "||" por barras
    const replacedPipes = text.replace(/\|\|/g, '/');
    // Decodificar o texto
    const decodedText = decodeURIComponent(replacedPipes);
    // Substituir underscores por espaços em branco
    return decodedText.replace(/_/g, ' ');
}