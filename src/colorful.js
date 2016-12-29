;( function ( root, factory ) {
    "use strict";

    // UMD for a Backbone plugin. Supports AMD, Node.js, CommonJS and globals.
    //
    // - Code lives in the Backbone namespace.
    // - The module does not export a meaningful value.
    // - The module does not create a global.

    var supportsExports = typeof exports === "object" && exports && !exports.nodeType && typeof module === "object" && module && !module.nodeType;

    // AMD:
    // - Some AMD build optimizers like r.js check for condition patterns like the AMD check below, so keep it as is.
    // - Check for `exports` after `define` in case a build optimizer adds an `exports` object.
    // - The AMD spec requires the dependencies to be an array **literal** of module IDs. Don't use a variable there,
    //   or optimizers may fail.
    if ( typeof define === "function" && typeof define.amd === "object" && define.amd ) {

        // AMD module
        define( [ "exports", "underscore" ], factory );

    } else if ( supportsExports ) {

        // Node module, CommonJS module
        factory( exports, require( "underscore" ) );

    } else  {

        // Global (browser or Rhino)
        factory( root, _ );

    }

}( this, function ( exports, _ ) {
    "use strict";

    /** Source for CSS color name mapping: https://github.com/dfcreative/color-name
     * @readonly
     */
    var CssColorNames = {
            "aliceblue": [240, 248, 255],
            "antiquewhite": [250, 235, 215],
            "aqua": [0, 255, 255],
            "aquamarine": [127, 255, 212],
            "azure": [240, 255, 255],
            "beige": [245, 245, 220],
            "bisque": [255, 228, 196],
            "black": [0, 0, 0],
            "blanchedalmond": [255, 235, 205],
            "blue": [0, 0, 255],
            "blueviolet": [138, 43, 226],
            "brown": [165, 42, 42],
            "burlywood": [222, 184, 135],
            "cadetblue": [95, 158, 160],
            "chartreuse": [127, 255, 0],
            "chocolate": [210, 105, 30],
            "coral": [255, 127, 80],
            "cornflowerblue": [100, 149, 237],
            "cornsilk": [255, 248, 220],
            "crimson": [220, 20, 60],
            "cyan": [0, 255, 255],
            "darkblue": [0, 0, 139],
            "darkcyan": [0, 139, 139],
            "darkgoldenrod": [184, 134, 11],
            "darkgray": [169, 169, 169],
            "darkgreen": [0, 100, 0],
            "darkgrey": [169, 169, 169],
            "darkkhaki": [189, 183, 107],
            "darkmagenta": [139, 0, 139],
            "darkolivegreen": [85, 107, 47],
            "darkorange": [255, 140, 0],
            "darkorchid": [153, 50, 204],
            "darkred": [139, 0, 0],
            "darksalmon": [233, 150, 122],
            "darkseagreen": [143, 188, 143],
            "darkslateblue": [72, 61, 139],
            "darkslategray": [47, 79, 79],
            "darkslategrey": [47, 79, 79],
            "darkturquoise": [0, 206, 209],
            "darkviolet": [148, 0, 211],
            "deeppink": [255, 20, 147],
            "deepskyblue": [0, 191, 255],
            "dimgray": [105, 105, 105],
            "dimgrey": [105, 105, 105],
            "dodgerblue": [30, 144, 255],
            "firebrick": [178, 34, 34],
            "floralwhite": [255, 250, 240],
            "forestgreen": [34, 139, 34],
            "fuchsia": [255, 0, 255],
            "gainsboro": [220, 220, 220],
            "ghostwhite": [248, 248, 255],
            "gold": [255, 215, 0],
            "goldenrod": [218, 165, 32],
            "gray": [128, 128, 128],
            "green": [0, 128, 0],
            "greenyellow": [173, 255, 47],
            "grey": [128, 128, 128],
            "honeydew": [240, 255, 240],
            "hotpink": [255, 105, 180],
            "indianred": [205, 92, 92],
            "indigo": [75, 0, 130],
            "ivory": [255, 255, 240],
            "khaki": [240, 230, 140],
            "lavender": [230, 230, 250],
            "lavenderblush": [255, 240, 245],
            "lawngreen": [124, 252, 0],
            "lemonchiffon": [255, 250, 205],
            "lightblue": [173, 216, 230],
            "lightcoral": [240, 128, 128],
            "lightcyan": [224, 255, 255],
            "lightgoldenrodyellow": [250, 250, 210],
            "lightgray": [211, 211, 211],
            "lightgreen": [144, 238, 144],
            "lightgrey": [211, 211, 211],
            "lightpink": [255, 182, 193],
            "lightsalmon": [255, 160, 122],
            "lightseagreen": [32, 178, 170],
            "lightskyblue": [135, 206, 250],
            "lightslategray": [119, 136, 153],
            "lightslategrey": [119, 136, 153],
            "lightsteelblue": [176, 196, 222],
            "lightyellow": [255, 255, 224],
            "lime": [0, 255, 0],
            "limegreen": [50, 205, 50],
            "linen": [250, 240, 230],
            "magenta": [255, 0, 255],
            "maroon": [128, 0, 0],
            "mediumaquamarine": [102, 205, 170],
            "mediumblue": [0, 0, 205],
            "mediumorchid": [186, 85, 211],
            "mediumpurple": [147, 112, 219],
            "mediumseagreen": [60, 179, 113],
            "mediumslateblue": [123, 104, 238],
            "mediumspringgreen": [0, 250, 154],
            "mediumturquoise": [72, 209, 204],
            "mediumvioletred": [199, 21, 133],
            "midnightblue": [25, 25, 112],
            "mintcream": [245, 255, 250],
            "mistyrose": [255, 228, 225],
            "moccasin": [255, 228, 181],
            "navajowhite": [255, 222, 173],
            "navy": [0, 0, 128],
            "oldlace": [253, 245, 230],
            "olive": [128, 128, 0],
            "olivedrab": [107, 142, 35],
            "orange": [255, 165, 0],
            "orangered": [255, 69, 0],
            "orchid": [218, 112, 214],
            "palegoldenrod": [238, 232, 170],
            "palegreen": [152, 251, 152],
            "paleturquoise": [175, 238, 238],
            "palevioletred": [219, 112, 147],
            "papayawhip": [255, 239, 213],
            "peachpuff": [255, 218, 185],
            "peru": [205, 133, 63],
            "pink": [255, 192, 203],
            "plum": [221, 160, 221],
            "powderblue": [176, 224, 230],
            "purple": [128, 0, 128],
            "rebeccapurple": [102, 51, 153],
            "red": [255, 0, 0],
            "rosybrown": [188, 143, 143],
            "royalblue": [65, 105, 225],
            "saddlebrown": [139, 69, 19],
            "salmon": [250, 128, 114],
            "sandybrown": [244, 164, 96],
            "seagreen": [46, 139, 87],
            "seashell": [255, 245, 238],
            "sienna": [160, 82, 45],
            "silver": [192, 192, 192],
            "skyblue": [135, 206, 235],
            "slateblue": [106, 90, 205],
            "slategray": [112, 128, 144],
            "slategrey": [112, 128, 144],
            "snow": [255, 250, 250],
            "springgreen": [0, 255, 127],
            "steelblue": [70, 130, 180],
            "tan": [210, 180, 140],
            "teal": [0, 128, 128],
            "thistle": [216, 191, 216],
            "tomato": [255, 99, 71],
            "turquoise": [64, 224, 208],
            "violet": [238, 130, 238],
            "wheat": [245, 222, 179],
            "white": [255, 255, 255],
            "whitesmoke": [245, 245, 245],
            "yellow": [255, 255, 0],
            "yellowgreen": [154, 205, 50]
        },

        _rxFraction = "(?:1(?:\\.0+)?|0?\\.\\d+|0)",
        rxAlpha = "(" + _rxFraction + ")",
        rxOptionalAlpha = "(" + _rxFraction + "?)",

        rxRgbChannelBase256 = "(255|25[0-4]|2[0-4]\\d|(?:[0-1]?\\d)?\\d)",
        rxRgbChannelPercent = "(100(?:\\.0+)?|\\d{0,2}(?:\\.\\d+)|\\d{1,2})\\s*%",
        rxRgbChannelHexLC = "([a-f\\d]{2})",
        rxRgbChannelHexUC = "([A-F\\d]{2})",
        rxRgbChannelShortHexLC = "([a-f\\d])",
        rxRgbChannelShortHexUC = "([A-F\\d])",
        rxRgbChannelFraction = rxAlpha,

        rxHexLC = buildColorRx( "#", rxRgbChannelHexLC ),
        rxHexUC = buildColorRx( "#", rxRgbChannelHexUC ),
        rxHexShortLC = buildColorRx( "#", rxRgbChannelShortHexLC ),
        rxHexShortUC = buildColorRx( "#", rxRgbChannelShortHexUC ),

        rxRgbBase256 = buildColorRx( "rgb", rxRgbChannelBase256 ),
        rxRgbaBase256 = buildColorRx( "rgba", rxRgbChannelBase256, true ),

        rxRgbPercent = buildColorRx( "rgb", rxRgbChannelPercent ),
        rxRgbaPercent = buildColorRx( "rgba", rxRgbChannelPercent, true ),

        rxAgColor = buildColorRx( "AgColor", rxRgbChannelFraction, true );


    /*
     * Rounding helpers
     */

    /**
     * Adjusts a number to a given precision, working around the buggy floating-point math of Javascript. Works for
     * round, floor, ceil operations.
     *
     * Lifted from the Math.round entry of MDN. Minor changes without effect on the algorithm.
     *
     * @param   {string} operation  "round", "floor", "ceil"
     * @param   {number} value
     * @param   {number} [precision=0]   can be negative: round( 104,-1 ) => 100
     * @returns {number}
     */
    function _decimalAdjust ( operation, value, precision ) {
        var exp;

        if ( typeof precision === 'undefined' || +precision === 0 ) return Math[operation]( value );

        value = +value;
        precision = +precision;

        // Return NaN if the value is not a number or the precision is not an integer
        if ( isNaN( value ) || !(typeof precision === 'number' && precision % 1 === 0) ) return NaN;

        exp = -precision;

        // Shift
        value = value.toString().split( 'e' );
        value = Math[operation]( +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)) );

        // Shift back
        value = value.toString().split( 'e' );
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    var Nums = {};

    Nums.round = function ( value, precision ) {
        return _decimalAdjust( 'round', value, precision );
    };

    Nums.floor = function ( value, precision ) {
        return _decimalAdjust( 'floor', value, precision );
    };

    Nums.ceil = function ( value, precision ) {
        return _decimalAdjust( 'ceil', value, precision );
    };


    /*
     * Color parsing
     */

    function buildColorRx ( prefix, rxRgbChannel, withAlpha ) {
        var isHex = prefix === "#",
            channelSeparator = isHex ? "" : "\\s*,\\s*",
            suffix = isHex ? "" : "\\s*\\)",
            rxChannels = [ rxRgbChannel, rxRgbChannel, rxRgbChannel ];

        if ( withAlpha ) rxChannels.push( rxAlpha );
        if ( !isHex ) prefix += "\\s*\\(\\s*";

        return new RegExp( "^\\s*" + prefix + rxChannels.join( channelSeparator ) + suffix + "\\s*$" );
    }

    function matchColor ( color, rx ) {
        var matches = color.match( rx );
        return {
            isMatch: !!matches,
            rgb: matches && [ matches[1], matches[2], matches[3] ],
            a:  matches && matches[4]
        };
    }

    function getHexData ( color ) {
        // Long form #RRGGBB
        var data = matchColor( color, rxHexLC );
        if ( !data.isMatch ) data = matchColor( color, rxHexUC );

        // Short form #RGB
        if ( !data.isMatch ) {
            data = matchColor( color, rxHexShortLC );
            if ( !data.isMatch ) data = matchColor( color, rxHexShortUC );

            // Converting short form to long form
            if ( data.isMatch ) data.rgb = _.map( data.rgb, function ( value ) {
                return value + value;
            } );
        }

        // Converting hex values to base 256
        if ( data.isMatch ) {
            data.rgb = _.map( data.rgb, function ( value ) {
                return parseInt( value, 16 );
            } );
        }

        return data;
    }

    function getBase256Data ( color ) {
        var data = matchColor( color, rxRgbBase256 );
        if ( !data.isMatch ) data = matchColor( color, rxRgbaBase256 );

        // Conversion to base 256 is not necessary here, just convert to numbers
        if ( data.isMatch ) {
            data.rgb = _.map( data.rgb, function ( value ) {
                return +value;
            } );
        }

        return data;
    }

    function getPercentData ( color ) {
        var data = matchColor( color, rxRgbPercent );
        if ( !data.isMatch ) data = matchColor( color, rxRgbaPercent );

        // Converting percentages to base 256 (but without removing fractional parts)
        if ( data.isMatch ) {
            data.rgb = _.map( data.rgb, function ( value ) {
                return value * 255 / 100;
            } );
        }

        return data;
    }

    function getAgColorData ( color ) {
        var data = matchColor( color, rxAgColor );

        // Converting fractions to base 256 (but without removing fractional parts)
        if ( data.isMatch ) {
            data.rgb = _.map( data.rgb, function ( value ) {
                return value * 255;
            } );
        }

        return data;
    }

    // NB We can't handle the CSS keyword "currentcolor" here because we lack the context for it.
    function parseColor ( color ) {
        var parsed, colorStr, keys, colorArr, data;

        if ( color instanceof Color ) {

            parsed = _.clone( color._rawColor );

        } else if ( _.isArray( color ) && ( color.length === 3 || color.length === 4 ) ) {

            colorStr = ( color.length === 4 ? "rgba" : "rgb" ) + "(" + color.join( ", " ) + ")";
            parsed = new Color( colorStr )._rawColor;

        } else if ( _.isObject( color ) ) {
            keys = _.keys( color );

            if ( _.intersection( [ "r", "g", "b" ], keys ).length === 3 || _.intersection( [ "r", "g", "b", "a" ], keys ).length === 4 ) {

                colorArr = [ color.r, color.g, color.b ];
                if ( keys.length === 4 ) colorArr.push( color.a );

                colorStr = ( colorArr.length === 4 ? "rgba" : "rgb" ) + "(" + colorArr.join( ", " ) + ")";
                parsed = new Color( colorStr )._rawColor;

            }

        } else if ( _.isString( color ) ) {

            if ( CssColorNames[color] ) {
                parsed = _.object( [ "r", "g", "b" ], CssColorNames[color] );
            } else if ( color.toLowerCase() === "transparent" ) {
                parsed = { r: 0, g: 0, b: 0, a: 0 };
            } else {

                data = getHexData( color );
                if ( !data.isMatch ) data = getBase256Data( color );
                if ( !data.isMatch ) data = getPercentData( color );
                if ( !data.isMatch ) data = getAgColorData( color );

                // Conversion of data object to parsed data
                if ( data.isMatch ) {
                    parsed = _.object( [ "r", "g", "b" ], data.rgb );
                    parsed.a = data.a;
                }

            }

        }

        // Make sure alpha is converted to a number, and set to 1 (opaque) if not defined
        if ( parsed && parsed.a !== undefined ) parsed.a = +parsed.a;
        if ( parsed && parsed.a === undefined ) parsed.a = 1;

        return parsed;
    }


    /*
     * Color conversion
     */

    function rawToHex( rawChannel, options ) {
        // Defaults to lower case
        var upperCase = options && ( options.upperCase || options.lowerCase === false ),
            hex = Nums.round( rawChannel ).toString( 16 );

        if ( hex.length < 2 ) hex = "0" + hex;
        return upperCase ? hex.toUpperCase() : hex.toLowerCase();
    }

    function rawToBase256 ( rawChannel ) {
        return Nums.round( rawChannel );
    }

    /**
     * Converts a number to a decimal string. Ensures that even very small numbers are returned in decimal notation,
     * rather than scientific notation.
     *
     * Numbers are allowed a maximum of 20 decimal digits when expressed in decimal notation (a limitation caused by the
     * Javascript function .toFixed()). Any digits beyond that limit are rounded.
     *
     * NB The function doesn't handle scientific notation for very large numbers because they don't occur in the context
     * of colour.
     *
     * @param   {number} number
     * @returns {string}
     */
    function toDecimalNotation ( number ) {
        var numStr = number + "";

        // If we encounter scientific notation in the stringified number, we don't just modify parts of it. Instead, we
        // reconstruct the entire stringified number from scratch. (That's possible because we use a regex matching the
        // stringified number in full.)
        numStr = numStr.replace( /^(\d+)(?:\.(\d+))?e-(\d+)$/i, function ( match, intDigits, fractionalDigits, absExponent ) {
            var digits = +absExponent + ( fractionalDigits ? fractionalDigits.length : 0 );

            // The argument for String.toFixed( digits ) is allowed to be between 0 and 20, so we have to limit the
            // range accordingly.
            if ( digits > 20 ) {
                Nums.round( number, 20 );
                digits = 20;
            }

            return number.toFixed( digits );
        } );

        return numStr;
    }

    function rawToPercent ( rawChannel, options ) {
        var precision = options && options.precision || 0,
            percentage = rawChannel * 100 / 255;

        if ( precision !== "max" ) percentage = Nums.round( percentage, precision );
        return toDecimalNotation( percentage ) + "%";
    }

    function rawToFraction ( rawChannel ) {
        return rawChannel / 255;
    }


    /*
     * Color object
     */

    function Color ( value ) {
        if ( !(this instanceof Color) ) return new Color( value );

        this._input = value;
        this._rawColor = parseColor( value );
    }

    _.extend( Color.prototype, {

        isColor: function () {
            return !_.isUndefined( this._rawColor );
        },

        ensureColor: function () {
            if ( !this.isColor() ) throw new Error( "Color.ensureColor: The color object does not represent a valid color. It was created from the value " + this._input );
            return true;
        },

        ensureOpaque: function () {
            this.ensureColor();
            if ( !this.isOpaque() ) throw new Error( "Color.ensureOpaque: Color is required to be opaque, but it is not (a = " + this._rawColor.a + ")" );
            return true;
        },

        ensureTransparent: function () {
            this.ensureColor();
            if ( !this.isTransparent() ) throw new Error( "Color.ensureTransparent: Color is required to be transparent, but it is not" );
            return true;
        },

        isOpaque: function () {
            return this.isColor() && this._rawColor.a === 1;
        },

        isTransparent: function () {
            return this.isColor() && this._rawColor.a < 1;
        },

        /**
         * @param   {Object}  [options]
         * @param   {boolean} [options.lowerCase=true]
         * @param   {boolean} [options.upperCase=false]
         * @param   {boolean} [options.prefix=true]
         * @returns {string}
         */
        asHex: function ( options ) {
            var prefix = ( options && options.prefix === false ) ? "" : "#";
            this.ensureOpaque();
            return prefix + _.map( this._getRawArrayRgb(), _.partial( rawToHex, _, options ) ).join( "" );
        },

        asHexUC: function () {
            return this.asHex( { upperCase: true } );
        },

        asHexLC: function () {
            return this.asHex( { lowerCase: true } );
        },

        asRGB: function () {
            this.ensureOpaque();
            return "rgb(" + this.asRGBArray().join( ", " ) + ")";
        },

        /**
         * @param   {Object}       [options]
         * @param   {number|"max"} [options.precision=0]  number of fractional digits, or "max" for all digits
         * @returns {string}
         */
        asPercentRGB: function ( options ) {
            this.ensureOpaque();
            return "rgb(" + _.map( this._getRawArrayRgb(), _.partial( rawToPercent, _, options ) ).join( ", " ) + ")";
        },

        asRGBA: function () {
            this.ensureColor();
            return "rgba(" + this._asRGBArray().concat( toDecimalNotation( this._rawColor.a ) ).join( ", " ) + ")";
        },

        /**
         * @param   {Object}       [options]
         * @param   {number|"max"} [options.precision=0]  number of fractional digits, or "max" for all digits
         * @returns {string}
         */
        asPercentRGBA: function ( options ) {
            this.ensureColor();
            return "rgba(" + _.map( this._getRawArrayRgb(), _.partial( rawToPercent, _, options ) ).concat( toDecimalNotation( this._rawColor.a ) ).join( ", " ) + ")";
        },

        asAgColor: function () {
            this.ensureColor();
            return "AgColor( " + _.map( this._asAgColorArray(), toDecimalNotation ).join( ", " ) + " )";
        },

        asRGBArray: function () {
            this.ensureOpaque();
            return this._asRGBArray();
        },

        asRGBAArray: function () {
            this.ensureColor();
            return this._asRGBArray().concat( this._rawColor.a );
        },

        /**
         * @param   {*}       otherColor
         * @param   {Object}  [options]
         * @param   {number}  [options.tolerance=0]
         * @returns {boolean}
         */
        equals: function ( otherColor, options ) {
            var isEqual, isColor, pairedChannels, pairedAlpha,
                tolerance = options && options.tolerance || 0;

            if ( !( otherColor instanceof Color ) ) otherColor = new Color( otherColor );

            isColor = this.isColor() && otherColor.isColor();
            isEqual = isColor && this.asRGBA() === otherColor.asRGBA();

            if ( isColor && !isEqual && tolerance > 0 ) {

                pairedChannels = _.zip( this.asRGBAArray(), otherColor.asRGBAArray() );
                pairedAlpha = pairedChannels.pop();

                isEqual = _.every( pairedChannels, function ( pairedChannel ) {
                    return pairedChannel[0] <= pairedChannel[1] + tolerance && pairedChannel[0] >= pairedChannel[1] - tolerance;
                } );

                isEqual = isEqual && pairedAlpha[0] === pairedAlpha[1];
            }

            return isEqual;
        },

        /**
         * @param   {*} otherColor
         * @returns {boolean}
         */
        strictlyEquals: function ( otherColor ) {
            if ( !( otherColor instanceof Color ) ) otherColor = new Color( otherColor );
            return this.isColor() && otherColor.isColor() && this.asPercentRGBA() === otherColor.asPercentRGBA();
        },

        _asAgColorArray: function () {
            return _.map( this._getRawArrayRgb(), rawToFraction ).concat( this._rawColor.a );
        },

        _asRGBArray: function () {
            return _.map( this._getRawArrayRgb(), rawToBase256 );
        },

        _getRawArrayRgb: function () {
            return [ this._rawColor.r, this._rawColor.g, this._rawColor.b ];
        }

    } );

    // Module return value
    exports.Color = Color;

} ) );

