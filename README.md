
#canvasContext

usage:

```javascript

var ctx = canvasContext(<HTML canvas context>);

```

Example

http://jsfiddle.net/j9dcsfkf/

You can draw canvas commands to the context almost as if you are using normal canvas. The commands can then be recorded and executed against Canvas, SVG or other rendering library.

The only difference is the if you are accessing a property like `fillStyle` it must be converted to a function call like

```javascript
 ctx.fillStyle("Yellow");
```

Example of a function rendering a star, the `ctx` parameter is the canvasContext object.

```javascript
// example of a function to draw a star
function star(ctx, x, y, r, p, m)
{
    ctx.save();
    
    ctx.beginPath();
    ctx.fillStyle("Yellow");
    ctx.strokeStyle("green");
    ctx.translate(x, y);
    ctx.moveTo(0,0-r);
    for (var i = 0; i < p; i++)
    {
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - (r*m));
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - r);
    }
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}
```

To finally draw the commands to the canvas

```javascript
ctx.exec();
```

The commands can be also executed manually

```javascript
ctx.execFn( function(cmd, args) {
    console.log(cmd, JSON.stringify(args));
});
```

Rendering to the SVG, here the SVG element must be _e() -object

```javascript
var myDiv = _e(document.body).div(); // Check the _e() library
var testOut = myDiv.svg("", { width:mySize, height:mySize});
testOut.width(mySize).height(mySize);   
ctx.renderSvg(testOut);
```