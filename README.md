![DocumentUp](src/images/logo.png)

**This site has been generated with DocumentUp** (eat your own dog food, people)

Automatically generated documentation sites for your markdown files! There are various ways of getting your documentation going:

* [Hosted](#hosted)
* [gh-pages](#gh-pages)

## Hosted

DocumentUp hosts your documentation sites. Just visit `http://documentup.com/username/repository` to generate a site from your `README.md`.

Recommended if you have a public Github repository.

### CNAME

You can point a CNAME to `project.username.documentup.com`.

### Configuration

Add a `.documentup.yml` dotfile file to the root of your repository. Refer to the [options](#options) section below for its contents. Feel free to consult this repository's [`.documentup.yml`](.documentup.yml)

### JSONP example with jQuery

```javascript
$.ajax({
  url: "http://documentup.com/compiled",
  dataType: "jsonp",
  data: {
    content: "# test",
    name: "Test JSONP!"
  },
  success: function(resp){
    // `status` is always provided
    if (resp.status == 200) {
      // Write to your document
      document.open();
      document.write(resp.html);
      document.close();
    }
  }
});
```

## gh-pages

For those wanting to stay within the comfort of their gh-pages branch, it's still possible by using an `index.html` file similar to this:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="documentup.min.js"></script>
    <script>
      DocumentUp.document("username/repository");
    </script>
  </head>
  <body></body>
</html>
```

Make sure to change the `"username/repository"` to the repository's name and user's username.

Use the [`documentup.min.js`](public/documentup.min.js) file in this repository, not the one what used to be on cdnjs.com, it's deprecated.

### Configuration

`DocumentUp.document` accepts either a String or an Object representing your desired configuration. If an object is used, remember to add a `repo` option containing the path `"username/repository"` to your github repository.

All options detailed in the [options](#options) section are available.

In addition to those, one special option is available to "gh-pages version" of DocumentUp:

**afterRender** (Function)  
A function to be executed after the document has been replaced with the compiled HTML.

### Example

```javascript
DocumentUp.document({
  repo:  "jeromegn/documentup",
  name: "DocumentUp",
  twitter: [
    "jeromegn",
    "DocumentUp"
  ],
  afterRender: function(){
    alert("rendered");
  }
});
```

### What this script does

It does what's written in the JSONP section, without the jQuery dependency. It uses a endpoint like: `http://documentup.com/username/repository?callback=` to fetch the cached copy of the repository and then replaces the page's html with the generated documentation.

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

## Options

### name

*String, default: repository name*

Name of your project. It'll appear in the header of the sidebar. Defaults to the `repository` substring of the `repo` option.

### color

*String, default: "#336699"*

CSS-like color representing the color for the links both in the sidebar and the content.

### theme

*String, default: null*

Name of the theme to use. Refer to the [themes](#themes) sections.

### issues

*Boolean, default: true*

Adds a link to the sidebar for the issues tab of the repository if `true`. Also accepts a string if your issues are managed elsewhere.

### travis

*Boolean, default: false*

Indicate if the project is being tested by [Travis-CI](http://travis-ci.org/). If `true`, it'll add the small travis badge in the sidebar.

### twitter

*String / Array of strings, default: null*

Add follow buttons for one or more Twitter accounts to your sidebar. Useful to gather followers.

### google_analytics

*String default: null*

This is your Google Analytics "UA" unique ID. Adds GA tracking to your generated documentation.  
e.g.: "UA-5201171-14"

## Themes

### Default

The one you're looking at now.

### V1

For the nostalgic. Use `v1` in your `theme` config option.

![V1](src/images/v1.png)

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
