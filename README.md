
# pixelBuffer

Create filters for HTML canvas pixel buffer, which is obtained using `getImageData`.

Libraries like stackBlur offer user interface based on HTML elements, in practical applications howerver it may be required to use several filters in random order and maintain the buffer in memory unti all the filters have been applied to it.

The purpos of this library is to provide an API which can be used to implement more filters and apply them to the ImageData -buffer repeatedly as long as needed without writing data out of the memory buffer.

Currently supported filters are

- sepia
- blur (based on Mario Klingemann`s stackBlur)
- hsl
- grayscale
- brightnessContrast or `bc`

Future additions possible from https://github.com/kig/canvasfilters
or http://www.html5rocks.com/en/tutorials/canvas/imagefilters/


This example shows how to use it:

http://jsfiddle.net/1so9vwmL/

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