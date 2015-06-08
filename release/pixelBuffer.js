var pixelBuffer_prototype = function() {
  'use strict';;
  (function(_myTrait_) {
    var _initDone;
    var mul_table;
    var BlurStack;
    var shg_table;
    _myTrait_._createTables = function(t) {

      BlurStack = function() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
        this.next = null;
      }

      mul_table = [
        512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
        454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
        482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
        437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
        497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
        320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
        446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
        329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
        505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
        399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
        324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
        268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
        451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
        385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
        332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
        289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259
      ];


      shg_table = [
        9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
        17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
        19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
        21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
        21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
        22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
        22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24
      ];

    }
    _myTrait_._stackBlurRGB = function(imageData, width, height, radius) {

      if (isNaN(radius) || radius < 1) return;

      radius |= 0;

      var pixels = imageData.data;

      var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
        r_out_sum, g_out_sum, b_out_sum,
        r_in_sum, g_in_sum, b_in_sum,
        pr, pg, pb, rbs;

      var div = radius + radius + 1;
      var w4 = width << 2;
      var widthMinus1 = width - 1;
      var heightMinus1 = height - 1;
      var radiusPlus1 = radius + 1;
      var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

      var stackStart = new BlurStack();
      var stack = stackStart;
      for (i = 1; i < div; i++) {
        stack = stack.next = new BlurStack();
        if (i == radiusPlus1) var stackEnd = stack;
      }
      stack.next = stackStart;
      var stackIn = null;
      var stackOut = null;

      yw = yi = 0;

      var mul_sum = mul_table[radius];
      var shg_sum = shg_table[radius];

      for (y = 0; y < height; y++) {

        r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++) {
          p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
          r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
          g_sum += (stack.g = (pg = pixels[p + 1])) * rbs;
          b_sum += (stack.b = (pb = pixels[p + 2])) * rbs;

          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;

          stack = stack.next;
        }


        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++) {
          pixels[yi] = (r_sum * mul_sum) >> shg_sum;
          pixels[yi + 1] = (g_sum * mul_sum) >> shg_sum;
          pixels[yi + 2] = (b_sum * mul_sum) >> shg_sum;

          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;

          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;

          p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

          r_in_sum += (stackIn.r = pixels[p]);
          g_in_sum += (stackIn.g = pixels[p + 1]);
          b_in_sum += (stackIn.b = pixels[p + 2]);

          r_sum += r_in_sum;
          g_sum += g_in_sum;
          b_sum += b_in_sum;

          stackIn = stackIn.next;

          r_out_sum += (pr = stackOut.r);
          g_out_sum += (pg = stackOut.g);
          b_out_sum += (pb = stackOut.b);

          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;

          stackOut = stackOut.next;

          yi += 4;
        }
        yw += width;
      }


      for (x = 0; x < width; x++) {
        g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack = stack.next;
        }

        yp = width;

        for (i = 1; i <= radius; i++) {
          yi = (yp + x) << 2;

          r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
          g_sum += (stack.g = (pg = pixels[yi + 1])) * rbs;
          b_sum += (stack.b = (pb = pixels[yi + 2])) * rbs;

          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;

          stack = stack.next;

          if (i < heightMinus1) {
            yp += width;
          }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++) {
          p = yi << 2;
          pixels[p] = (r_sum * mul_sum) >> shg_sum;
          pixels[p + 1] = (g_sum * mul_sum) >> shg_sum;
          pixels[p + 2] = (b_sum * mul_sum) >> shg_sum;

          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;

          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;

          p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

          r_sum += (r_in_sum += (stackIn.r = pixels[p]));
          g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
          b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));

          stackIn = stackIn.next;

          r_out_sum += (pr = stackOut.r);
          g_out_sum += (pg = stackOut.g);
          b_out_sum += (pb = stackOut.b);

          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;

          stackOut = stackOut.next;

          yi += width;
        }
      }



    }
    _myTrait_._stackBlurRGBA = function(imageData, width, height, radius) {

      if (isNaN(radius) || radius < 1) return;

      radius |= 0;

      var pixels = imageData.data;

      var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum,
        r_out_sum, g_out_sum, b_out_sum, a_out_sum,
        r_in_sum, g_in_sum, b_in_sum, a_in_sum,
        pr, pg, pb, pa, rbs;

      var div = radius + radius + 1;
      var w4 = width << 2;
      var widthMinus1 = width - 1;
      var heightMinus1 = height - 1;
      var radiusPlus1 = radius + 1;
      var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

      var stackStart = new BlurStack();
      var stack = stackStart;
      for (i = 1; i < div; i++) {
        stack = stack.next = new BlurStack();
        if (i == radiusPlus1) var stackEnd = stack;
      }
      stack.next = stackStart;
      var stackIn = null;
      var stackOut = null;

      yw = yi = 0;

      var mul_sum = mul_table[radius];
      var shg_sum = shg_table[radius];

      for (y = 0; y < height; y++) {
        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack.a = pa;
          stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++) {
          p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
          r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
          g_sum += (stack.g = (pg = pixels[p + 1])) * rbs;
          b_sum += (stack.b = (pb = pixels[p + 2])) * rbs;
          a_sum += (stack.a = (pa = pixels[p + 3])) * rbs;

          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;
          a_in_sum += pa;

          stack = stack.next;
        }


        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++) {
          pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
          if (pa != 0) {
            pa = 255 / pa;
            pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
            pixels[yi + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
            pixels[yi + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
          } else {
            pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
          }

          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;
          a_sum -= a_out_sum;

          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;
          a_out_sum -= stackIn.a;

          p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

          r_in_sum += (stackIn.r = pixels[p]);
          g_in_sum += (stackIn.g = pixels[p + 1]);
          b_in_sum += (stackIn.b = pixels[p + 2]);
          a_in_sum += (stackIn.a = pixels[p + 3]);

          r_sum += r_in_sum;
          g_sum += g_in_sum;
          b_sum += b_in_sum;
          a_sum += a_in_sum;

          stackIn = stackIn.next;

          r_out_sum += (pr = stackOut.r);
          g_out_sum += (pg = stackOut.g);
          b_out_sum += (pb = stackOut.b);
          a_out_sum += (pa = stackOut.a);

          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;
          a_in_sum -= pa;

          stackOut = stackOut.next;

          yi += 4;
        }
        yw += width;
      }


      for (x = 0; x < width; x++) {
        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack.a = pa;
          stack = stack.next;
        }

        yp = width;

        for (i = 1; i <= radius; i++) {
          yi = (yp + x) << 2;

          r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
          g_sum += (stack.g = (pg = pixels[yi + 1])) * rbs;
          b_sum += (stack.b = (pb = pixels[yi + 2])) * rbs;
          a_sum += (stack.a = (pa = pixels[yi + 3])) * rbs;

          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;
          a_in_sum += pa;

          stack = stack.next;

          if (i < heightMinus1) {
            yp += width;
          }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++) {
          p = yi << 2;
          pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
          if (pa > 0) {
            pa = 255 / pa;
            pixels[p] = ((r_sum * mul_sum) >> shg_sum) * pa;
            pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
            pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
          } else {
            pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
          }

          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;
          a_sum -= a_out_sum;

          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;
          a_out_sum -= stackIn.a;

          p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

          r_sum += (r_in_sum += (stackIn.r = pixels[p]));
          g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
          b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));
          a_sum += (a_in_sum += (stackIn.a = pixels[p + 3]));

          stackIn = stackIn.next;

          r_out_sum += (pr = stackOut.r);
          g_out_sum += (pg = stackOut.g);
          b_out_sum += (pb = stackOut.b);
          a_out_sum += (pa = stackOut.a);

          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;
          a_in_sum -= pa;

          stackOut = stackOut.next;

          yi += width;
        }
      }

    }
    _myTrait_.applyFilters = function(imageData, cmdList) {
      /*
           var opts = {"grayscale" : 1, 
                       "sepia" : 0.4,
                       "outputCanvas" : buff.canvas};
           
           bb.applyFilters( buff.buffer, [
               ["sepia", opts],
               ["output", opts]
           ])
           */

      var me = this;

      cmdList.forEach(function(cmd) {
        var n = cmd[0];
        var options = cmd[1];
        if (me[n]) {
          me[n](imageData, options);
        }
      });
    }
    _myTrait_.bc = function(imageData, options) {
      this.brightnessContrast(imageData, options);
    }
    _myTrait_.blur = function(imageData, options) {

      if (options.alphablur) {
        this._stackBlurRGBA(imageData, imageData.width, imageData.height, options.blur || 3);
      } else {
        this._stackBlurRGB(imageData, imageData.width, imageData.height, options.blur || 3);
      }

    }
    _myTrait_.brightnessContrast = function(imageData, options) {
      // 
      var data = imageData.data;

      var w = imageData.width;
      var h = imageData.height;

      var brightness = (parseInt(options.brightness, 10) || 0) * 150;
      var contrast = (parseFloat(options.contrast) || 0) * 150;
      var legacy = false;

      if (legacy) {
        brightness = Math.min(150, Math.max(-150, brightness));
      } else {
        var brightMul = 1 + Math.min(150, Math.max(-150, brightness)) / 150;
      }

      contrast = Math.max(0, contrast + 1);

      var p = w * h;
      var pix = p * 4,
        pix1, pix2;

      var mul, add;
      if (contrast != 1) {
        if (legacy) {
          mul = contrast;
          add = (brightness - 128) * contrast + 128;
        } else {
          mul = brightMul * contrast;
          add = -contrast * 128 + 128;
        }
      } else { // this if-then is not necessary anymore, is it?
        if (legacy) {
          mul = 1;
          add = brightness;
        } else {
          mul = brightMul;
          add = 0;
        }
      }
      var r, g, b;
      while (p--) {
        if ((r = data[pix -= 4] * mul + add) > 255)
          data[pix] = 255;
        else if (r < 0)
          data[pix] = 0;
        else
          data[pix] = r;

        if ((g = data[pix1 = pix + 1] * mul + add) > 255)
          data[pix1] = 255;
        else if (g < 0)
          data[pix1] = 0;
        else
          data[pix1] = g;

        if ((b = data[pix2 = pix + 2] * mul + add) > 255)
          data[pix2] = 255;
        else if (b < 0)
          data[pix2] = 0;
        else
          data[pix2] = b;
      }
      return true;


    }
    _myTrait_.createRenderBuffer = function(width, height, fromImage) {

      var cc = document.createElement("canvas");
      cc.setAttribute("width", width);
      cc.setAttribute("height", height);

      var ctx = cc.getContext("2d");

      if (fromImage) {
        ctx.drawImage(fromImage, 0, 0);
      }

      return {
        canvas: cc,
        buffer: ctx.getImageData(0, 0, width, height)
      };
    }
    _myTrait_.grayscale = function(imageData, options, notused1, notused2) {

      options = options || {};
      var amount = options.grayscale || 1;

      var w = imageData.width,
        h = imageData.height;

      var data = imageData.data;
      var i = 0;
      var end = w * h * 4;
      while (i < end) {
        var r = data[i],
          g = data[i + 1],
          b = data[i + 2];
        var v = Math.floor(0.2126 * r + 0.7152 * g + 0.0722 * b);

        r = (1 - amount) * r + amount * v;
        g = (1 - amount) * g + amount * v;
        b = (1 - amount) * b + amount * v;
        data[i] = Math.max(0, Math.min(r, 255));
        data[i + 1] = Math.max(0, Math.min(g, 255));
        data[i + 2] = Math.max(0, Math.min(b, 255));
        i += 4;
      }

    }
    _myTrait_.hsl = function(imageData, options) {


      var data = imageData.data;

      var w = imageData.width,
        h = imageData.height;

      var hue = 360 * parseFloat(options.hue, 10) || 0;
      var saturation = 255 * (parseFloat(options.saturation, 10) || 0);
      var lightness = 255 * (parseFloat(options.lightness, 10) || 0);


      // this seems to give the same result as Photoshop
      if (saturation < 0) {
        var satMul = 1 + saturation;
      } else {
        var satMul = 1 + saturation * 2;
      }

      hue = (hue % 360) / 360;
      var hue6 = hue * 6;

      var rgbDiv = 1 / 255;

      var light255 = lightness * 255;
      var lightp1 = 1 + lightness;
      var lightm1 = 1 - lightness;

      var p = w * h;

      var pix = p * 4,
        pix1 = pix + 1,
        pix2 = pix + 2,
        pix3 = pix + 3;

      while (p--) {

        var r = data[pix -= 4];
        var g = data[pix1 = pix + 1];
        var b = data[pix2 = pix + 2];

        if (hue != 0 || saturation != 0) {
          // ok, here comes rgb to hsl + adjust + hsl to rgb, all in one jumbled mess. 
          // It's not so pretty, but it's been optimized to get somewhat decent performance.
          // The transforms were originally adapted from the ones found in Graphics Gems, but have been heavily modified.
          var vs = r;
          if (g > vs) vs = g;
          if (b > vs) vs = b;
          var ms = r;
          if (g < ms) ms = g;
          if (b < ms) ms = b;
          var vm = (vs - ms);
          var l = (ms + vs) / 510;
          if (l > 0) {
            if (vm > 0) {
              if (l <= 0.5) {
                var s = vm / (vs + ms) * satMul;
                if (s > 1) s = 1;
                var v = (l * (1 + s));
              } else {
                var s = vm / (510 - vs - ms) * satMul;
                if (s > 1) s = 1;
                var v = (l + s - l * s);
              }
              if (r == vs) {
                if (g == ms)
                  var h = 5 + ((vs - b) / vm) + hue6;
                else
                  var h = 1 - ((vs - g) / vm) + hue6;
              } else if (g == vs) {
                if (b == ms)
                  var h = 1 + ((vs - r) / vm) + hue6;
                else
                  var h = 3 - ((vs - b) / vm) + hue6;
              } else {
                if (r == ms)
                  var h = 3 + ((vs - g) / vm) + hue6;
                else
                  var h = 5 - ((vs - r) / vm) + hue6;
              }
              if (h < 0) h += 6;
              if (h >= 6) h -= 6;
              var m = (l + l - v);
              var sextant = h >> 0;
              if (sextant == 0) {
                r = v * 255;
                g = (m + ((v - m) * (h - sextant))) * 255;
                b = m * 255;
              } else if (sextant == 1) {
                r = (v - ((v - m) * (h - sextant))) * 255;
                g = v * 255;
                b = m * 255;
              } else if (sextant == 2) {
                r = m * 255;
                g = v * 255;
                b = (m + ((v - m) * (h - sextant))) * 255;
              } else if (sextant == 3) {
                r = m * 255;
                g = (v - ((v - m) * (h - sextant))) * 255;
                b = v * 255;
              } else if (sextant == 4) {
                r = (m + ((v - m) * (h - sextant))) * 255;
                g = m * 255;
                b = v * 255;
              } else if (sextant == 5) {
                r = v * 255;
                g = m * 255;
                b = (v - ((v - m) * (h - sextant))) * 255;
              }
            }
          }
        }

        if (lightness < 0) {
          r *= lightp1;
          g *= lightp1;
          b *= lightp1;
        } else if (lightness > 0) {
          r = r * lightm1 + light255;
          g = g * lightm1 + light255;
          b = b * lightm1 + light255;
        }

        if (r < 0)
          data[pix] = 0
        else if (r > 255)
          data[pix] = 255
        else
          data[pix] = r;

        if (g < 0)
          data[pix1] = 0
        else if (g > 255)
          data[pix1] = 255
        else
          data[pix1] = g;

        if (b < 0)
          data[pix2] = 0
        else if (b > 255)
          data[pix2] = 255
        else
          data[pix2] = b;

      }


    }
    if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
      _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
    if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
    _myTrait_.__traitInit.push(function(t) {
      this.filterCanvas = null;
      this.maxW = 0;
      this.maxH = 0;

      if (!_initDone) {
        this._createTables();
        _initDone = true;
      }
    });
    _myTrait_.output = function(imageData, options) {

      if (options.outputCanvas) {
        var ctx = options.outputCanvas.getContext("2d");
        ctx.putImageData(imageData, 0, 0);
      }
    }
    _myTrait_.sepia = function(imageData, options) {

      var w = imageData.width,
        h = imageData.height;

      var w4 = w * 4;
      var y = h;
      var amount = options.sepia || 1;

      if (!amount) amount = 1;
      var data = imageData.data;
      do {
        var offsetY = (y - 1) * w4;
        var x = w;
        do {
          var offset = offsetY + (x - 1) * 4;

          if (0) {
            // a bit faster, but not as good
            var d = data[offset] * 0.299 + data[offset + 1] * 0.587 + data[offset + 2] * 0.114;
            var r = (d + 39);
            var g = (d + 14);
            var b = (d - 36);
          } else {
            // Microsoft
            var or = data[offset];
            var og = data[offset + 1];
            var ob = data[offset + 2];

            var r = (1 - amount) * or + amount * (or * 0.393 + og * 0.769 + ob * 0.189);
            var g = (1 - amount) * og + amount * (or * 0.349 + og * 0.686 + ob * 0.168);
            var b = (1 - amount) * ob + amount * (or * 0.272 + og * 0.534 + ob * 0.131);
          }

          if (r < 0) r = 0;
          if (r > 255) r = 255;
          if (g < 0) g = 0;
          if (g > 255) g = 255;
          if (b < 0) b = 0;
          if (b > 255) b = 255;

          data[offset] = r;
          data[offset + 1] = g;
          data[offset + 2] = b;

        } while (--x);
      } while (--y);

    }
  }(this));;
  (function(_myTrait_) {
    if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
      _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
    if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
    _myTrait_.__traitInit.push(function(ctx) {

    });
  }(this));
}
var pixelBuffer = function(a, b, c, d, e, f, g, h) {
  if (this instanceof pixelBuffer) {
    var args = [a, b, c, d, e, f, g, h];
    if (this.__factoryClass) {
      var m = this;
      var res;
      this.__factoryClass.forEach(function(initF) {
        res = initF.apply(m, args);
      });
      if (Object.prototype.toString.call(res) == '[object Function]') {
        if (res._classInfo.name != pixelBuffer._classInfo.name) return new res(a, b, c, d, e, f, g, h);
      } else {
        if (res) return res;
      }
    }
    if (this.__traitInit) {
      var m = this;
      this.__traitInit.forEach(function(initF) {
        initF.apply(m, args);
      })
    } else {
      if (typeof this.init == 'function')
        this.init.apply(this, args);
    }
  } else return new pixelBuffer(a, b, c, d, e, f, g, h);
};
pixelBuffer._classInfo = {
  name: 'pixelBuffer'
};
pixelBuffer.prototype = new pixelBuffer_prototype();
if (typeof(window) != 'undefined') window['pixelBuffer'] = pixelBuffer;
if (typeof(window) != 'undefined') window['pixelBuffer_prototype'] = pixelBuffer_prototype;