/**
 * Throttle 0.0.1
 * Event throttle function
 * @author Kyle Foster (@hkfoster)
 * @reference http://www.html5rocks.com/en/tutorials/speed/animations/
 * @license MIT
 **/

// Public API function
var throttle = function ( type, name, obj ) {
  obj = obj || window;
  var running = false;
  var func = function () {
    if ( running ) { return; }
    running = true;
    requestAnimationFrame( function () {
      obj.dispatchEvent( new CustomEvent( name ) );
      running = false;
    });
  };
  obj.addEventListener( type, func );
};

// Public API
module.exports = throttle;
