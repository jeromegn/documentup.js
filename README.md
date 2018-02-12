![DocumentUp](src/images/logo.svg)

**This site has been generated with DocumentUp** (eat your own [dog food](src/index.js), people)

Automatically generated documentation sites for your markdown files!

DocumentUp hosts your documentation sites. Just visit `http://js.documentup.com/username/repository` to generate a site from your `README.md`.

## Formatting guide

Just like you normally would. DocumentUp also supports "Github Flavored Markdown" and we recommend you use it for syntax highlighting.

It doesn't support tables as it is supported on Github, but you can use inline HTML.

h1's (# in markdown) will appear as first level navigation in the sidebar while h2's (##) will appear under them as sub-navigation.

Example:

```markdown
# Project name / Title (won't appear in the sidebar)

Some intro text if you want.

## Top level-navigation

### Sub-navigation

#### This wouldn't show up in the sidebar
```

## Roadmap

* Private repositories
* Multi-page aggregation

## Thank you

* Thanks to [Jean-Marc Denis](http://jeanmarcdenis.me/) for the freely downloadable bow tie I used in the logo.

## Changelog

#### 3.0 (January 25, 2018)

Full rewrite of the app:
- Runs as [Fly Edge Application](https://fly.io/mix/edge-applications)
- Removed compilation endpoints
- Cache rendered markdown for an hour (vary by etag)
- Use Github's CDN for raw markdown

#### 2.0 (June 15, 2015)

Full rewrite of the app:
- Deprecated on-demand `/compiled` endpoint
- Renamed manual recompile endpoint to `username/repo/__recompile`
- Uses Ruby on Rails
- Uses SASS
- Laid the foundation for multiple pages (it works right now, just not linked or explained, needs some work)
- Uses PostgreSQL

#### Hosted version (Feb 2, 2012)

Versioning is going to be difficult now since this is now a service. Deployment will be continuous.

#### 0.1.1 (Jan 26, 2012)

* Files now parsed in UTF-8
* Namespaced repositories in localStorage (thanks to [tbranyen](https://github.com/tbranyen))
* A few README fixes

#### 0.1.0 (Jan 25, 2012)

* Initial release

## License

Copyright (c) 2015 Jerome Gravel-Niquet

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
