const css = require('./stylesheets/index.scss').toString()
const Router = require('routes')
const Renderer = require('./renderer')
const Repository = require('./repository')

const pageTpl = require('./views/page.pug')

var router = Router()

router.addRoute("/screen.css", function (event, params) {
  event.respondWith(new Response(css, { headers: { 'content-type': 'text/css' } }))
})

router.addRoute("/", async function (event, params) {
  event.respondWith(new Response(await renderRepo("jeromegn", "DocumentUp")), { headers: { 'content-type': "text/html" } })
})

router.addRoute("/:login/:repo", async function (event, params) {
  event.respondWith(new Response(await renderRepo(params.login, params.repo)), { headers: { 'content-type': "text/html" } })
})

async function renderRepo(login, repoName) {
  const repo = new Repository(login, repoName)
  const renderer = new Renderer(login, repoName)
  let result = renderer.render(await (await fetch(`https://cdn.rawgit.com/${login}/${repoName}/master/README.md`)).text())
  return pageTpl({ html: result.body, tableOfContents: result.tableOfContents, repository: repo })
}

console.log("before fetch")

addEventListener("fetch", async function (event) {
  const { request, respondWith } = event
  const path = new URL(request.url).pathname
  let match = router.match(path)

  if (!match)
    return respondWith(new Response("docup not found", { status: 404 }))

  let res = match.fn(event, match.params)
  if (res instanceof Promise)
    await res
})
console.log("after fetch")