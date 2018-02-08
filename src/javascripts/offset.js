/**
 * Offset 0.0.1
 * Find element’s distance from top or left of document
 * @author Kyle Foster (@hkfoster)
 * @license MIT
 **/

// Public API object
var offset = {
  top: function( elem, scroll ) {
    scroll = scroll ? window.pageYOffset : 0;
    return Math.round( elem.getBoundingClientRect().top + scroll );
  },
  left: function( elem, scroll ) {
    scroll = scroll ? window.pageXOffset : 0;
    return Math.round( elem.getBoundingClientRect().left + scroll );
  },
  right: function( elem, scroll ) {
    scroll = scroll ? window.pageXOffset : 0;
    return Math.round( window.innerWidth - elem.getBoundingClientRect().left - elem.offsetWidth + scroll );
  }
};

// Public API
module.exports = offset;