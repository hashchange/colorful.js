# Colorful.js

<small>[Setup][setup] – [Defining a color][color definition] – [Output][output] – [Comparisons][comparisons] – [Queries][queries] – [Validation][validation] – [Build and test][build]</small>

Colorful.js is a tiny component which creates color objects from a variety of input formats. It outputs color in as many formats, checks if colors are equal, and provides insights into other properties, like transparency.

In a nutshell:

```js
var color = new Color( "rgb(0, 50%, 50%)" );

color.asHexUC()       // => "#008080"
color.asRgba()        // => "rgba(0, 128, 128, 1)"
color.asRgbArray()    // => [0, 128, 128]
// etc

color.equals( "teal" )                    // => true
color.equals( { r: 0, g: 128, b: 128 } )  // => true

color.isTransparent() // => false
```

## Dependencies and setup

[Underscore][] is the only dependency. Include colorful.js after Underscore is loaded.

Colorful.js can be loaded in the global context of the browser, or as a module (AMD, CJS/Node). The module contains the [Color][color definition] class:

```js
var Color = require( "colorful.js" ).Color;
```

As a browser global, the Color class is attached to the `window` directly - simply use `Color`.

The stable version of Colorful.js is available in the `dist` directory ([dev][dist-dev], [prod][dist-prod]). If you use Bower, fetch the files with `bower install colorful.js`. With npm, it is `npm install colorful.js`.

## Defining a color

A color object can be created from an array, object, or a host of string color formats. The `new` keyword is optional.

```js
var c1 = new Color( "rgb(0, 50%, 50%)" ),
    c2 =     Color( "rgb(0, 50%, 50%)" );    // identical
```

### Input formats

All of the formats below are recognized.

```js
Color( "turquoise" )    // CSS color keywords
Color( "transparent" )  // CSS value "transparent"

Color( "#FF90A3" )      // long hex format, upper case
Color( "#ff90a3" )      // long hex format, lower case
Color( "#09A" )         // short hex format, upper case
Color( "#09a" )         // short hex format, lower case

Color( "rgb(0, 153, 170)" )               // rgb() string
Color( "rgba(0, 153, 170, 1)" )           // rgba() string
Color( "rgb(0%, 6.152%, 67%)" )           // rgb() string, percentages
Color( "rgba(0%, 6.152%, 67%, 0.3)" )     // rgba() string, RGB percentages

Color( [4, 144, 163] )                    // RGB array
Color( [4, 144, 163, 0.5] )               // RGBA array
Color( [".623%", "100.0%", "67.258%"] )   // RGB array, percentages
Color( [".623%", "100%", "67.2%", 0.5] )  // RGBA array, RGB percentages

Color( { r: 4, g: 144, b: 163 } )                  // RGB hash
Color( { r: 4, g: 144, b: 163, a: 0.5 } )          // RGBA hash
Color( { r: ".623%", g: "100.0%", b: "67.2%" } )   // RGB hash, percentages
Color( { r: "0.6%", g: "10%", b: "7%", a: 0.5 } )  // RGBA hash, RGB percentages
```

The obscure `AgColor` format used by Adobe Lightroom is [also supported][agcolor-support].

### Invalid color values

Arguments which don't match any of the patterns above are not considered to be a color. 

```js
var c = Color( "foo" );
c.isColor()  // => false
```

Invalid arguments don't cause an error when the color object is created. But they might throw an error later on, e.g. if a method is called which requires a valid color.

```js
var c = Color( "foo" ),
    rgbFormat = c.asRgb();   // throws an error
```

## Output

All of the output methods require that the input represents a valid color. Non-color inputs throw an error when an output method is called.

In addition, an error is thrown if the color is transparent but the output format doesn't include an alpha channel:

```js
var color = Color( "rgba(255, 128, 255, 0.5)" ),  // transparent
    rgba = color.asRgba(),                        // works
    rgb = color.asRgb(),                          // throws an error
    hex = color.asHex();                          // throws an error
```

### `asHex( [options] )`

Returns the color as a hex string (`#RRGGBB`), in lower case and with a leading `#` by default.

Output can be configured with the boolean options `lowerCase`, or `upperCase` , and `prefix` (`true`: with leading `#`).

```js
var color = Color( "darkturquoise" );

color.asHex()                                      // => "#00ced1"
color.asHex( { lowerCase: false, prefix: false } ) // => "00CED1"
color.asHex( { upperCase: true } )                 // => "#00CED1"
```

### `asHexLC()`

Returns the color as a lower-case hex string.

```js
Color( "darkturquoise" ).asHexLC()    // => "#00ced1"
```

### `asHexUC()`

Returns the color as an upper-case hex string.

```js
Color( "darkturquoise" ).asHexUC()    // => "#00CED1"
```

### `asRgb()`

Returns the color as an `rgb()` string. Each channel is represented by an integer on a scale of 0 to 255.

```js
Color( "darkturquoise" ).asRgb()    // => "rgb(0, 206, 209)"
```

### `asRgbPercent( [options] )`

Returns the color as an `rgb()` string. Each channel is represented by a percentage. The number of decimal digits can be specified with `options.precision`. 

The precision can be set to a number in the range of 0 to 20, or to the string `"max"` for maximum precision. By default, percentages are returned as integers (precision: 0).

```js
var color = Color( "darkturquoise" );

color.asRgbPercent()                        // => "rgb(0%, 81%, 82%)"
color.asRgbPercent( { precision: 3 } )      // => "rgb(0%, 80.784%, 81.961%)"
color.asRgbPercent( { precision: "max" } )  // => "rgb(0%, 80.7843137254902%, 81.96078431372548%)"
```

### `asRgbArray()`

Returns the color as an RGB array `[R, G, B]`. Each channel is represented by an integer on a scale of 0 to 255.

```js
Color( "darkturquoise" ).asRgbArray()    // => [0, 206, 209]
```

### `asRgba()`

Returns the color as an `rgba()` string. Each RGB channel is represented by an integer on a scale of 0 to 255, and the alpha channel on a scale of 0 to 1.

```js
Color( "darkturquoise" ).asRgba()    // => "rgba(0, 206, 209, 1)"
```

### `asRgbaPercent( [options] )`

Returns the color as an `rgba()` string. Each RGB channel is represented by a percentage, and the alpha channel on a scale of 0 to 1.

Percentages are returned as integers by default. For greater accuracy, use the `precision` option, [as in `asRgbPercent()`][format-percentRGB].

```js
var color = Color( "darkturquoise" );

color.asRgbPercent()                    // => "rgba(0%, 81%, 82%, 1)"
color.asRgbPercent( { precision: 3 } )  // => "rgba(0%, 80.784%, 81.961%, 1)"
```

### `asRgbaArray()`

Returns the color as an RGBA array `[R, G, B, A]`. Each RGB channel is represented by an integer on a scale of 0 to 255, and the alpha channel on a scale of 0 to 1.

```js
Color( "darkturquoise" ).asRgbaArray()    // => [0, 206, 209, 1]
```

## Comparisons

### `equals( otherColor, [options] )`

Returns whether or not a color equals another, with an optional tolerance.

The other color can be passed in [any of the formats][input formats] acceptable to `Color`, or as a `Color` object.

```js
var color = Color( "#00FF7F" );

color.equals( "rgba(0, 255, 127, 1)" )    // => true
color.equals( "springgreen" )             // => true
color.equals( Color( [0, 255, 127] ) )    // => true
```

#### Rounding

Color channels are converted to a 0-255 RGB scale _and rounded to integers_ before comparison. 

That loss of precision is deliberate. It is supposed to compensate for insignificant fractional differences which can easily occur during color computations (especially when colors are expressed in percentages).

```js
var c1 = Color( "rgb(0, 128, 254)" );

// When expressed in percentages with a precision of 10 decimals, c1 would be
// 0%, 50.1960784314%, 99.6078431373%
c1.equals( "rgb(0%, 50%, 99.6%)" )    // => true, despite not matching exactly

// Colors expressed in full percentage points (integers) are too coarse to 
// match some colors, though.
c1.equals( "rgb(0%, 50%, 100%)" )     // => false, maps to 0, 128, 255
c1.equals( "rgb(0%, 50%, 99%)" )      // => false, maps to 0, 128, 252
```

#### `options.tolerance`

A tolerance for the RGB channels can be specified as an option.

The tolerance is meant to allow additional leeway for rounding errors. It can also be used for insignificant differences in color which are not visible to the human eye.

The tolerance does not apply to the alpha channel. It must always match exactly.
 
```js
var c1 = Color( [0, 128, 254] );
     c1.equals( [0, 127, 255], { tolerance: 1 } )        // => true

// Tolerance is not applied to the alpha channel
var c2 = Color( [0, 128, 254, 0.50000000001] );
     c2.equals( [0, 128, 254, 0.5], { tolerance: 1 } )   // => false
```

#### Non-colors

The method returns true only if both values represent equal _colors_. Non-colors are never considered equal, even if they are created from the same input.

```js
var c1 = Color( "foo" ),
    c2 = Color( "foo" );

c1.equals( c2 )    // => false
```

### `strictlyEquals( otherColor )`

Returns whether or not a color exactly equals another. 

No [rounding to integer values][equals-rounding] is applied here.

The other color can be passed in [any of the formats][input formats] acceptable to `Color`, or as a `Color` object. 

Non-colors are never considered equal, even if they are created from the same value.

```js
var c1 = Color( "rgb(0, 128, 254)" );

c1.strictlyEquals( "#0080FE" )              // => true

// When expressed in percentages with a precision of 10 decimals, c1 would be
// 0%, 50.1960784314%, 99.6078431373%
c1.strictlyEquals( "rgb(0%, 50%, 99.6%)" )  // => false, does not match exactly
        c1.equals( "rgb(0%, 50%, 99.6%)" )  // => true, see equals()

```

## Queries

### `isColor()`

Returns whether or not the color object represents a valid color.

```js
Color( "#AABBCC" ).isColor()    // => true
Color( "foo" ).isColor()        // => false
```

### `isOpaque()`

Returns whether or not the color object represents a valid color and is opaque.

```js
Color( "#AABBCC" ).isOpaque()                   // => true
Color( "rgba(0%, 60%, 67%, .5)" ).isOpaque()    // => false
Color( "foo" ).isOpaque()                       // => false
```

### `isTransparent()`

Returns whether or not the color object represents a valid color and is transparent.

```js
Color( "rgba(0%, 60%, 67%, .5)" ).isTransparent()    // => true
Color( "foo" ).isTransparent()                       // => false
```

## Validation

### `ensureColor()`

Throws an error if the color object does not represent a valid color.

```js
Color( "#AABBCC" ).ensureColor()    // ok
Color( "foo" ).ensureColor()        // throws an error
```

### `ensureOpaque()`

Throws an error if the color object does not represent a valid, opaque color.

```js
Color( "#AABBCC" ).ensureOpaque()                   // ok
Color( "rgba(0%, 60%, 67%, .5)" ).ensureOpaque()    // throws an error
Color( "foo" ).ensureOpaque()                       // throws an error
```

### `ensureTransparent()`

Throws an error if the color object does not represent a valid, transparent color.

```js
Color( "rgba(0%, 60%, 67%, .5)" ).ensureTransparent()    // ok
Color( "#AABBCC" ).ensureTransparent()                   // throws an error
Color( "foo" ).ensureTransparent()                       // throws an error
```

## `AgColor` support

The obscure `AgColor` format, used internally by Adobe Lightroom, is also recognized. 

Hardly anyone will need it, but for the sake of completeness, it should be mentioned here.

`AgColor` is defined in RGBA format, with the channels expressed as fractions on a scale of 0 to 1. `AgColor` is supported both as an input format

```js
var color = Color( "AgColor(0, 1, 0.672587491, 0.5)" );
```

and as an output format

```js
color.asAgColor() // => "AgColor( 0, 1, 0.672587491, 0.5 )"
```

## Build process and tests

If you'd like to fix, customize or otherwise improve the project: here are your tools.

### Setup

[npm][] and [Bower][] set up the environment for you.

- The only thing you've got to have on your machine is [Node.js]. Download the installer [here][Node.js].
- Open a command prompt in the project directory.
- Run `npm install`. (Creates the environment.)
- Run `bower install`. (Fetches the dependencies of the script.)
- Make sure the Grunt CLI is installed globally (as a Node.js module). If not, or if you are not sure, run `npm install -g grunt-cli` from the command prompt.

Your test and build environment is ready now. If you want to test against specific versions of Backbone, edit `bower.json` first.

### Running tests, creating a new build

#### Considerations for testing

To run the tests on remote clients (e.g. mobile devices), start a web server with `grunt interactive` and visit `http://[your-host-ip]:9400/web-mocha/` with the client browser. Running the tests in a browser like this is slow, so it might make sense to disable the power-save/sleep/auto-lock timeout on mobile devices. Use `grunt test` (see below) for faster local testing.

#### Tool chain and commands

The test tool chain: [Grunt][] (task runner), [Karma][] (test runner), [Mocha][] (test framework), [Chai][] (assertion library), [Sinon][] (mocking framework). The good news: you don't need to worry about any of this.

A handful of commands manage everything for you:

- Run the tests in a terminal with `grunt test`.
- Run the tests in a browser interactively, live-reloading the page when the source or the tests change: `grunt interactive`.
- If the live reload bothers you, you can also run the tests in a browser without it: `grunt webtest`.
- Run the linter only with `grunt lint` or `grunt hint`. (The linter is part of `grunt test` as well.)
- Build the dist files (also running tests and linter) with `grunt build`, or just `grunt`.
- Build continuously on every save with `grunt ci`.
- Change the version number throughout the project with `grunt setver --to=1.2.3`. Or just increment the revision with `grunt setver --inc`. (Remember to rebuild the project with `grunt` afterwards.)
- `grunt getver` will quickly tell you which version you are at.

Finally, if need be, you can set up a quick demo page to play with the code. First, edit the files in the `demo` directory. Then display `demo/index.html`, live-reloading your changes to the code or the page, with `grunt demo`. Libraries needed for the demo/playground should go into the Bower dev dependencies, in the project-wide `bower.json`, or else be managed by the dedicated `bower.json` in the demo directory.

_The `grunt interactive` and `grunt demo` commands spin up a web server, opening up the **whole project** to access via http._ So please be aware of the security implications. You can restrict that access to localhost in `Gruntfile.js` if you just use browsers on your machine.

### Changing the tool chain configuration

In case anything about the test and build process needs to be changed, have a look at the following config files:

- `karma.conf.js` (changes to dependencies, additional test frameworks)
- `Gruntfile.js`  (changes to the whole process)
- `web-mocha/_index.html` (changes to dependencies, additional test frameworks)

New test files in the `spec` directory are picked up automatically, no need to edit the configuration for that.

## Release notes

### v0.1.0

- Initial public release

## License

MIT.

Copyright (c) 2016 Michael Heim.

Code in the data provider test helper: (c) 2014 Box, Inc., Apache 2.0 license. [See file][data-provider.js].

[dist-dev]: https://raw.github.com/hashchange/colorful.js/master/dist/colorful.js "colorful.js"
[dist-prod]: https://raw.github.com/hashchange/colorful.js/master/dist/colorful.min.js "colorful.min.js"

[setup]: #dependencies-and-setup "Setup"
[color definition]: #defining-a-color
[output]: #output
[comparisons]: #comparisons
[queries]: #queries
[validation]: #validation
[build]: #build-process-and-tests "Build process and tests"

[input formats]: #defining-a-color
[equals-rounding]: #rounding
[agcolor-support]: #agcolor-support
[format-percentRGB]: #aspercentrgb-options

[data-provider.js]: https://github.com/hashchange/colorful.js/blob/master/spec/helpers/data-provider.js "Source code of data-provider.js"

[Underscore]: http://underscorejs.org/ "Underscore.js"
[Node.js]: http://nodejs.org/ "Node.js"
[Bower]: http://bower.io/ "Bower: a package manager for the web"
[npm]: https://npmjs.org/ "npm: Node Packaged Modules"
[Grunt]: http://gruntjs.com/ "Grunt: The JavaScript Task Runner"
[Karma]: http://karma-runner.github.io/ "Karma – Spectacular Test Runner for Javascript"
[Mocha]: http://mochajs.org/ "Mocha – the fun, simple, flexible JavaScript test framework"
[Chai]: http://chaijs.com/ "Chai: a BDD / TDD assertion library"
[Sinon]: http://sinonjs.org/ "Sinon.JS – Versatile standalone test spies, stubs and mocks for JavaScript"
[JSHint]: http://www.jshint.com/ "JSHint, a JavaScript Code Quality Tool"