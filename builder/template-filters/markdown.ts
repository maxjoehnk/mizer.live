import * as marked from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  highlight(code: string, lang: string): string | void {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'

    return hljs.highlight(code, { language }).value
  }
})

export default marked;
