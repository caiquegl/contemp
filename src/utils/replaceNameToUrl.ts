export const replaceNameToUrl = (text: string) => {
    return encodeURI(text.replaceAll(' ', '_').replaceAll('/', '||'))
}

export const decodeName = (text: string) => {
    return decodeURI(text).replaceAll(' ', '_').replaceAll('||', '/')
}