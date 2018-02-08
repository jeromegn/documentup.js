/**
 * LoadFont 0.0.2
 * A font loader that leverages LocalStorage
 * @author Adam Beres-Deak (@bdadam) & Kyle Foster (@hkfoster)
 * @source https://github.com/bdadam/OptimizedWebfontLoading
 * @license MIT
 **/

// Dependencies - https://github.com/filamentgroup/woff2-feature-test
var supportsWoff2 = ( function( win ) {
  if ( !( "FontFace" in win ) ) return false;
  var f = new FontFace( 't', 'url( "data:application/font-woff2;base64,d09GMgABAAAAAAIkAAoAAAAABVwAAAHcAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABlYAgloKLEoBNgIkAxgLDgAEIAWDcgc1G7IEyB6SJAFID5YA3nAHC6h4+H7s27nP1kTyOoQkGuJWtNGIJKYznRI3VEL7IaHq985ZUuKryZKcAtJsi5eULwUybm9KzajBBhywZ5ZwoJNuwDX5C/xBjvz5DbsoNsvG1NGQiqp0NMLZ7JlnW+5MaM3HwcHheUQeiVokekHkn/FRdefvJaTp2PczN+I1Sc3k9VuX51Tb0Tqqf1deVXGdJsDOhz0/EffMOPOzHNH06pYkDDjs+P8fb/z/8n9Iq8ITzWywkP6PBMMN9L/O7vY2FNoTAkp5PpD6g1nV9WmyQnM5uPpAMHR2fe06jbfvzPriekVTQxC6lpKr43oDtRZfCATl5OVAUKykqwm9o8R/kg37cxa6eZikS7cjK4aIwoyh6jOFplhFrz2b833G3Jii9AjDUiAZ9AxZtxdEYV6imvRF0+0Nej3wu6nPZrTLh81AVcV3kmMVdQj6Qbe9qetzbuDZ7vXOlRrqooFSxCv6SfrDICA6rnHZXQPVcUHJYGcoqa3jVH7ATrjWBNYYkEqF3RFpVIl0q2JvMOJd7/TyjXHw2NyAuJpNaEbz8RTEVtCbSH7JrwQQOqwGl7sTUOtdBZIY2DKqKlvOmPvUxJaURAZZcviTT0SKHCXqzwc=" ) format( "woff2" )', {} );
  f.load()[ 'catch' ]( function() {} );
  return f.status == 'loading' || f.status == 'loaded';
})( window );

// Catch-all LocalStorage availability check
var localStorageAvailable = function() {
  var testKey = 'test', storage = window.localStorage;
  try {
    storage.setItem( testKey, '1' );
    storage.removeItem( testKey );
    return true;
  } catch ( error ) {
    return false;
  }
};

// Public API function
var loadFont = function( fontName, woffUrl, woff2Url, onlyLoadFontOnSecondPageload ){

  // Many unsupported browsers should stop here
  var nua  = navigator.userAgent,
      pass = localStorageAvailable(),
      nope = !window.addEventListener || !pass || ( nua.match( /(Android (2|3|4.0|4.1|4.2|4.3))|(Opera (Mini|Mobi))/ ) && !nua.match( /Chrome/ ) );

  if ( nope ) return;

  // Set up LocalStorage
  var loSto = {};

  // Set up a proxy variable to help with LocalStorage
  try { loSto = localStorage || {}; }
  catch( ex ) {}

  var loStoPrefix    = 'x-font-' + fontName,
      loStoUrlKey    = loStoPrefix + 'url',
      loStoCssKey    = loStoPrefix + 'css',
      storedFontUrl  = loSto[ loStoUrlKey ],
      storedFontCss  = loSto[ loStoCssKey ],
      storedUrlMatch = storedFontUrl === woffUrl || storedFontUrl === woff2Url,
      styleElement   = document.createElement( 'style' );

  // Make <style> element & apply base64 encoded font data
  styleElement.rel  = 'stylesheet';
  document.head.appendChild( styleElement );

  // CSS in LocalStorage & loaded from one of the current URLs
  if ( storedFontCss && storedUrlMatch ) {

    styleElement.textContent = storedFontCss;

  // Data not present or loaded from an obsolete URL
  } else {

    // Check for WOFF2 support
    var cssUrl  = ( woff2Url && supportsWoff2 ) ? woff2Url : woffUrl,
        request = new XMLHttpRequest();

    // Fetch font data from the server
    request.open( 'GET', cssUrl );
    request.onload = function() {
      if ( request.status >= 200 && request.status < 400 ) {

        // Update LocalStorage with fresh data & apply
        loSto[ loStoUrlKey ] = cssUrl;
        loSto[ loStoCssKey ] = request.responseText;
        if ( !onlyLoadFontOnSecondPageload ) styleElement.textContent = request.responseText;
      }
    };
    request.send();
  }
};

// Init
loadFont( 'fly-', '/fonts-woff.css', '/fonts-woff2.css' );