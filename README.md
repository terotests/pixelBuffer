
# pixelBuffer

Create filters for HTML canvas pixel buffer. The point of the library is to allow better usability for the pixel buffers, there are already interfaces like stackBlur but they are difficult to use in practical applicaitons.

No documentation so far, this example shows how to use it:

http://jsfiddle.net/besda423/

``` javascript

var bb = pixelBuffer();
var buff = bb.createRenderBuffer( 60, 60, document.getElementById("exampleImage"));
var out = document.getElementById("out");

out.appendChild( buff.canvas );

var opts = {"grayscale" : 1, 
            "sepia" : 1,
            "blur" : 3,
            "alphablur" : true,
            "grayscale" : 0,
            "outputCanvas" : buff.canvas};

bb.applyFilters( buff.buffer, [
    ["hsl", opts],
    ["sepia", opts],
    ["grayscale", opts],
    ["blur", opts],
    ["output", opts]
]);


```