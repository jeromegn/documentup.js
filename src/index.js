const css = require('./stylesheets/index.scss').toString()
const Router = require('routes')
const Renderer = require('./renderer')
const Repository = require('./repository')

const pageTpl = require('./views/page.pug')
const codeTpl = require('./views/code.pug')

var router = Router()

router.addRoute("/screen.css", function (event, match) {
  return new Response(css, { headers: { 'content-type': 'text/css' } })
})

router.addRoute("/", async function (event, match) {
  return await renderRepo("superfly", "documentup.js")
})

router.addRoute("/:login/:repo", async function (event, match) {
  return await renderRepo(match.params.login, match.params.repo)
})

router.addRoute("/:login/:repo/*.*", async function (event, match) {
  return await renderCode(match.params.login, match.params.repo, match.splats.join("."))
})

async function renderRepo(login, repoName) {
  const response = await fetch(`https://raw.githubusercontent.com/${login}/${repoName}/master/README.md`)
  const renderFn = async function () {
    const repo = new Repository(login, repoName)
    const renderer = new Renderer(login, repoName)
    let result = renderer.render(await response.text())
    return pageTpl({ html: result.body, tableOfContents: result.tableOfContents, repository: repo })
  }
  let cacheStatus = "MISS"

  if (response.status != 200) {
    return new Response("four-oh-four", { status: 404 })
  }
  const key = login + "/" + repoName + ":" + response.headers.get("etag")
  let body = await fly.cache.getString(key)

  if (!body) {
    console.log("cache miss:", key)
    body = await renderFn()
    await fly.cache.set(key, body, 3600)
  } else {
    console.log("cache hit:", key)
    cacheStatus = "HIT"
  }

  return new Response(body, { headers: { 'content-type': 'text/html', 'x-cache': cacheStatus } })
}

const commentExtractor = require('multilang-extract-comments')
const splitLines = require('split-lines')
const arrayToLinkedlist = require('array-to-linkedlist')

async function renderCode(login, repoName, filePath) {
  const response = await fetch(`https://raw.githubusercontent.com/${login}/${repoName}/master/${filePath}`)
  const source = await response.text()
  const comments = commentExtractor(source)
  const lines = splitLines(source)
  console.log("code has lines:", lines.length)
  console.log("found comment blocks:", Object.values(comments).length)

  const body = codeTpl({ comments: arrayToLinkedlist(Object.values(comments)), source: lines })

  return new Response(body, { headers: { 'content-type': 'text/html' } })
}

addEventListener("fetch", function (event) {
  const { request, respondWith } = event
  const path = new URL(request.url).pathname
  let match = router.match(path)

  if (!match) {
    event.respondWith(new Response("docup not found", { status: 404 }))
  } else {
    event.respondWith(match.fn(event, match))
  }
})