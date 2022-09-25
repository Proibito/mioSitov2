export interface PostPreviewType {
  titolo: string;
  frontmatter: Record<string, any>;
  url: string | undefined;
  ultimaModifica: string;
  ultimaModificaInNumeri: number;
}
