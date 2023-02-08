export const replaceNameToUrl = (text: string) => {
    return encodeURI(text).replaceAll('/', '||')
}

export const decodeName = (text: string) => {
    return decodeURI(text).replaceAll('||', '/')
}