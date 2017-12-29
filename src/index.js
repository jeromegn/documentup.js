const css = require('./stylesheets/index.css').toString()
const Router = require('routes')
const Renderer = require('./renderer')

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

async function renderRepo(login, repo) {
  const renderer = new Renderer(login, repo)
  let html = renderer.render(await (await fetch(`https://cdn.rawgit.com/${login}/${repo}/master/README.md`)).text())
  return `<!doctype html>
<html>
  <head>
    <link href="/screen.css" media="all" rel="stylesheet" type="text/css" />
  </head>
  <body>
    ${html}
  </body>
</html>`
}

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