export function slugify(text: string): string {
  return text.replace('.', '').replace(' ', '-').replace('#', '').toLocaleLowerCase()
}
