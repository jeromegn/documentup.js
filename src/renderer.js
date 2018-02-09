const marked = require('marked')
const prismjs = require('prismjs')

module.exports = class Renderer {
  constructor(login, repo) {
    this.tableOfContents = []
    this.renderer = new marked.Renderer()
    this.baseUrl = `/${login}/${repo}/`

    this.renderer.heading = (text, level, raw) => {
      const id = raw.toLowerCase().replace(/\s+/, "-").replace(/[^\w-]+/, "")
      if (level > 1)
        this.tableOfContents.push({ id: id, level: level, text: text })
      return `<h${level} id="${id}">${text}</h${level}>\n`
    }

    this.renderer.image = function (src, title, alt) {
      if (!/(http|https):\/\//.test(src))
        src = new URL(src, `https://cdn.rawgit.com/${login}/${repo}/master/`).toString()
      return `<img src='${src}' alt='${alt}' title='${title}' />`
    }
  }

  render(markdown) {
    const body = marked(markdown, {
      langPrefix: 'language-',
      renderer: this.renderer,
      baseUrl: this.baseUrl,
      highlight: function (code, lang) {
        const language = !lang || lang === 'html' ? 'markup' : lang === 'yml' ? 'yaml' : lang
        if (!Prism.languages[language])
          require('prismjs/components/prism-' + language + '.js')
        return Prism.highlight(code, Prism.languages[language])
      }
    })
    return {
      tableOfContents: this.tableOfContents,
      body: body
    }
  }
}