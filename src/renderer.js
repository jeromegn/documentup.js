const marked = require('marked')

module.exports = class Renderer {
  constructor(login, repo) {
    this.tableOfContents = []
    this.renderer = new marked.Renderer()

    this.renderer.heading = (text, level, raw) => {
      if (level > 1)
        this.tableOfContents.push({ level: level, text: text })
      return `<h${level} id="${raw.toLowerCase().replace(/\s+/, "-").replace(/[^\w-]+/, "")}">${text}</h${level}>\n`
    }

    this.renderer.image = function (src, title, alt) {
      if (!/(http|https):\/\//.test(src))
        src = new URL(src, `https://cdn.rawgit.com/${login}/${repo}/master/`).toString()
      return `<img src='${src}' alt='${alt}' title='${title}' />`
    }
  }

  render(markdown) {
    const body = marked(markdown, { renderer: this.renderer })
    return {
      tableOfContents: this.tableOfContents,
      body: body
    }
  }
}