import { GrayMatterFile } from 'gray-matter';

export interface MarkdownFile extends GrayMatterFile<string> {
  url: string;
}
