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
  event.respondWith(await renderRepo("jeromegn", "DocumentUp"))
})

router.addRoute("/:login/:repo", async function (event, params) {
  event.respondWith(await renderRepo(params.login, params.repo))
})

async function renderRepo(login, repoName) {
  const response = await fetch(`https://cdn.rawgit.com/${login}/${repoName}/master/README.md`)
  const renderFn = async function(){
    const repo = new Repository(login, repoName)
    const renderer = new Renderer(login, repoName)
    let result = renderer.render(await response.text())
    return pageTpl({ html: result.body, tableOfContents: result.tableOfContents, repository: repo })
  }
  let cacheStatus = "MISS"

  if(response.status != 200){
    return new Response("four-oh-four", {status: 404})
  }
  const key = login + "/" + repoName + ":" + response.headers.get("etag")
  let body = await fly.cache.getString(key)

  if(!body){
    console.log("cache miss:", key)
    body = await renderFn()
    await fly.cache.set(key, body, 3600)
  }else{
    console.log("cache hit:", key)
    cacheStatus = "HIT"
  }

  return new Response(body, { headers: { 'content-type': 'text/css', 'x-cache': cacheStatus } })
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