export interface SlugifyOptions {
  maxLength?: number;
  removePunctuation?: boolean;
  replacementChar?: string;
}

export function createSlug(input: string, options: SlugifyOptions = {}): string {
  const {
    maxLength = 50,
    removePunctuation = true,
    replacementChar = '-',
  } = options;

  let slug = input.trim().toLowerCase();

  if (removePunctuation) {
    slug = slug.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  }

  slug = slug
    .replace(/[áàâãä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[íìîï]/g, 'i')
    .replace(/[óòôõö]/g, 'o')
    .replace(/[úùûü]/g, 'u')
    .replace(/ç/g, 'c');

  slug = slug.replace(/[^a-z0-9.]+/g, replacementChar);

  slug = slug.replace(new RegExp(`${replacementChar}+`, 'g'), replacementChar);

  slug = slug.slice(0, maxLength);

  slug = slug.replace(new RegExp(`^${replacementChar}+|${replacementChar}+$`, 'g'), '');

  return slug;
}