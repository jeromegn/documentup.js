require('../src')
global.window = global
const fetchMock = require('fetch-mock')

import { expect } from 'chai'

describe('documentup', () => {
  before(() => {
    fetchMock.mock("*", new Response(`# Hello world`))
  })
  after(() => { fetchMock.restore() })

  it('fires the event', async () => {
    let res = await dispatchFetch(new Request("/blah/blah"))
    let html = await res.text()
    expect(html).to.include(`<h1 id="hello-world">Hello world</h1>`)
  })
})

function dispatchFetch(request) {
  return new Promise((resolve, reject) => {
    let event = new FetchEvent('fetch', { request: request }, function (err, res) {
      if (err)
        return reject(err)
      resolve(res)
    })
    dispatchEvent(event)
  })
}