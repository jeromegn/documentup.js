const marked = require('marked')

module.exports = class Renderer {
  constructor(login, repo) {
    this.renderer = new marked.Renderer()

    this.renderer.heading = function (text, level) {
      return `<h${level}>H${level} ${text}</h${level}>`
    }

    this.renderer.image = function (src, title, alt) {
      console.log("RENDERER IMAGE", arguments)
      if (!/(http|https):\/\//.test(src))
        src = new URL(src, `https://cdn.rawgit.com/${login}/${repo}/master/`).toString()
      console.log("FINAL SRC:", src)
      return `<img src='${src}' alt='${alt}' title='${title}' />`
    }
  }

  render(markdown) {
    return marked(markdown, { renderer: this.renderer })
  }
}