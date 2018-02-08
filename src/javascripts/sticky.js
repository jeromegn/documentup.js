/**
 * Sticky 0.0.3
 * Compose sticky elements module
 * @author Kyle Foster (@hkfoster)
 * @license MIT
 **/

// Dependencies
var throttle = require( '../utility/throttle' ),
    offset   = require( '../utility/offset' );

// Public API function
var sticky = function( selector, settings ) {

  // Overridable defaults
  var defaults = {
    topPadding  : false,
    initWidth   : '700px',
    stickyClass : 'sticky',
    anchorPoint : null
  };

  // Scoped variables
  var options  = Object.assign( {}, defaults, settings ),
      element  = document.querySelector( selector );

  function isStyleSupported( prop, value ) {
    var d = document.createElement( 'div' );
    d.style[ prop ] = value;
    return d.style[ prop ] === value;
  }

  var stickySupported = isStyleSupported( 'position', 'sticky' );


  console.log( stickySupported );

  // If selector is not present
  if ( !element ) {

    // Abort
    return false;

  // Otherwise attach listeners
  } else {

    // Scoped variables
    var topPadding = ( options.topPadding === true ) ? parseInt( window.getComputedStyle( element, null ).getPropertyValue( 'padding-top' ) ) : 0,
        widthQuery = window.matchMedia( '(min-width: ' + options.initWidth + ')' ),
        topOffset  = offset.top( element, true ) + topPadding,
        anchorInit = options.anchorPoint,
        placeholder,
        elemHeight,
        elemWidth,
        docHeight,
        winHeight;

    // Resize throttle function init
    throttle( 'resize', 'optimizedResize' );

    // Scroll throttle function init
    throttle( 'scroll', 'optimizedScroll' );

    // Call listener function explicitly at run time
    queryHandler( widthQuery );

    // Attach listener function to listen in on state changes
    widthQuery.addListener( queryHandler );

  }

  // Media query handler function
  function queryHandler( condition ) {

    setup();

    // Call resize listener function explicitly at run time
    resizeHandler();

    // Call scroll listener function explicitly at run time
    scrollHandler();

    // If media query matches
    if ( condition.matches ) {

      // Resize function listener
      window.addEventListener( 'optimizedResize', resizeHandler, false );

      // Scroll function listener
      window.addEventListener( 'optimizedScroll', scrollHandler, false );

    } else {

      // Reset styles
      // element.classList.remove( 'sticky' );

      normalMode( element );

      // Remove resize listener
      window.removeEventListener( 'optimizedResize', resizeHandler, false );

      // Remove scroll listener
      window.removeEventListener( 'optimizedScroll', scrollHandler, false );

    }

  }

  function outerHeight(el) {
    var height = el.offsetHeight;
    var style = getComputedStyle(el);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
  }

  function setup() {

    // Insert placeholder element if it doesn’t exist
    if ( !document.querySelector( '.sticky-placeholder' ) ) element.insertAdjacentHTML( 'afterend', '<span class="sticky-placeholder"></span>' );

    // Update element height variable
    elemHeight = element.offsetHeight;

    // Update element width variable
    elemWidth  = element.offsetWidth;

    // Update placeholder element
    placeholder = document.querySelector( '.sticky-placeholder' );

    // And position it accordingly
    placeholder.style.height = elemHeight + 'px';
    placeholder.style.width  = elemWidth + 'px';

    // Position element
    normalMode( element );

  }

  // Resize handler function
  function resizeHandler() {

    // Update document height variable
    docHeight = document.body.scrollHeight;

    // Update window height variable
    winHeight = window.innerHeight;

    // Update element height variable
    elemHeight = element.offsetHeight;

    // Update element width variable
    elemWidth  = element.offsetWidth;

    // Position placeholder element
    placeholder.style.height = elemHeight + 'px';
    placeholder.style.width  = elemWidth + 'px';

  }

  function stickyMode( element ) {
    element.style.position  = 'fixed';
    element.style.marginTop = '0';
    element.style.top       = '0';
  }

  function normalMode( element ) {
    element.style.position  = 'absolute';
    element.style.marginTop = null;
    element.style.top       = null;
  }

  // Scroll handler function
  function scrollHandler() {

    // Scoped variables
    var newScrollY = window.pageYOffset,
        pastOffset = newScrollY > topOffset,
        anchored   = ( anchorInit ) ? newScrollY >= docHeight - elemHeight - anchorInit + topPadding : null;

    // Where the magic happens
    if ( pastOffset && !anchored ) {
      // element.classList.remove( 'anchored' );
      // element.classList.add( 'sticky' );
      stickyMode( element );
    } else if ( pastOffset && anchored ) {
      normalMode( element );
      // element.classList.remove( 'sticky' );
      // element.classList.add( 'anchored' );
    } else {
      normalMode( element );
      // element.classList.remove( 'sticky' );
    }

  }

};

// Public API
module.exports = sticky;
