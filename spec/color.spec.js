/*global describe, it, beforeEach, expect, describeWithData, Color */
/* jshint -W024, -W064 */

(function () {
    "use strict";

    describe( 'Invocation', function () {

        describe( 'When Color is called without the `new` keyword, a valid colour argument', function () {

            var colour;

            beforeEach( function () {
                colour = Color( "#0490A3" );
            } );

            it( 'is recognized as a colour', function () {
                expect( colour.isColor() ).to.be.true;
            } );

            it( 'is represented by the correct RGBA value', function () {
                expect( colour.asRgbaArray() ).to.eql( [4, 144, 163, 1] );
            } );

        } );

    } );

    describe( 'Colour parsing', function () {

        describe( 'A valid CSS colour', function () {

            var inputColourScenario = {
                "as a keyword": { input: "turquoise", expectedRGBA: [64, 224, 208, 1] },
                'defined by the keyword "transparent"': { input: "transparent", expectedRGBA: [0, 0, 0, 0] },

                "in hex format #RRGGBB": { input: "#0490A3", expectedRGBA: [4, 144, 163, 1] },
                "in hex format #rrggbb": { input: "#0490a3", expectedRGBA: [4, 144, 163, 1] },
                "in hex format #RGB": { input: "#09A", expectedRGBA: [0, 153, 170, 1] },
                "in hex format #rgb": { input: "#09a", expectedRGBA: [0, 153, 170, 1] },

                "in rgb() format": { input: "rgb(0, 153, 170)", expectedRGBA: [0, 153, 170, 1] },
                "in rgb() format without spaces": { input: "rgb(0,153,170)", expectedRGBA: [0, 153, 170, 1] },
                "in rgb() format with excess spaces": { input: "  rgb   (   0   ,   153   ,   170   )   ", expectedRGBA: [0, 153, 170, 1] },

                "in rgb() percent format": { input: "rgb(0%, 60%, 67%)", expectedRGBA: [0, 153, 171, 1] },
                "in rgb() percent format with fractions": { input: "rgb(0.0000%, 100.0%, 67.2587491%)", expectedRGBA: [0, 255, 172, 1] },
                "in rgb() percent format with fractions (0.x as .x)": { input: "rgb(.623%, 100.0%, 67.2587491%)", expectedRGBA: [2, 255, 172, 1] },
                "in rgb() percent format without spaces": { input: "rgb(0%,60%,67%)", expectedRGBA: [0, 153, 171, 1] },
                "in rgb() percent format with excess spaces": { input: "  rgb   (   0%   ,   60%   ,   67%   )   ", expectedRGBA: [0, 153, 171, 1] },

                "in rgba() format (opacity 1)": { input: "rgba(0, 153, 170, 1)", expectedRGBA: [0, 153, 170, 1] },
                "in rgba() format (opacity 0.5)": { input: "rgba(0, 153, 170, 0.5)", expectedRGBA: [0, 153, 170, 0.5] },
                "in rgba() format (opacity .5)": { input: "rgba(0, 153, 170, .5)", expectedRGBA: [0, 153, 170, 0.5] },
                "in rgba() format (opacity 0)": { input: "rgba(0, 153, 170, 0)", expectedRGBA: [0, 153, 170, 0] },
                "in rgba() format without spaces": { input: "rgba(0,153,170,1)", expectedRGBA: [0, 153, 170, 1] },
                "in rgba() format with excess spaces": { input: "  rgba   (   0   ,   153   ,   170,   1   )   ", expectedRGBA: [0, 153, 170, 1] },

                "in rgba() percent format": { input: "rgba(0%, 60%, 67%, .5)", expectedRGBA: [0, 153, 171, 0.5] },
                "in rgba() percent format with fractions": { input: "rgba(0.0000%, 100.0%, 67.2587491%, 0.5)", expectedRGBA: [0, 255, 172, 0.5] },
                "in rgba() percent format with fractions (0.x as .x)": { input: "rgba(.623%, 100.0%, 67.2587491%, .5)", expectedRGBA: [2, 255, 172, 0.5] },
                "in rgba() percent format without spaces": { input: "rgba(0%,60%,67%,.5)", expectedRGBA: [0, 153, 171, 0.5] },
                "in rgba() percent format with excess spaces": { input: "  rgba   (   0%   ,   60%   ,   67%   ,   .5   )   ", expectedRGBA: [0, 153, 171, 0.5] },

                "in AgColor format (0 as 0, 1 as 1)": { input: "AgColor(0, 1, 0.672587491, 0.5)", expectedRGBA: [0, 255, 172, 0.5] },
                "in AgColor format (0 as 0.0000, 1 as 1.0)": { input: "AgColor(0.0000, 1.0, 0.672587491, 0.5)", expectedRGBA: [0, 255, 172, 0.5] },
                "in AgColor format (0.x as .x)": { input: "AgColor(.00623, 1, .672587491, .5)", expectedRGBA: [2, 255, 172, 0.5] },
                "in AgColor format without spaces": { input: "AgColor(.00623,1,.672587491,.5)", expectedRGBA: [2, 255, 172, 0.5] },
                "in AgColor format with excess spaces": { input: "   AgColor   (   .00623   ,   1   ,   .672587491   ,   .5   )", expectedRGBA: [2, 255, 172, 0.5] },

                "as an array of integer RGB values": { input: [4, 144, 163], expectedRGBA: [4, 144, 163, 1] },
                "as an array of integer RGBA values": { input: [4, 144, 163, 0.5], expectedRGBA: [4, 144, 163, 0.5] },
                "as an array of RGB values with decimals": { input: [4.499999999999999, 143.5, 163.00000010101010101], expectedRGBA: [4, 144, 163, 1], expectedPreciseRGBA: [4.499999999999999, 143.5, 163.00000010101010101, 1] },
                "as an array of RGBA values with decimals": { input: [4.499999999999999, 143.5, 163.00000010101010101, 0.5], expectedRGBA: [4, 144, 163, 0.5], expectedPreciseRGBA: [4.499999999999999, 143.5, 163.00000010101010101, 0.5] },
                "as an array of RGB percentage values": { input: [".623%", "100.0%", "67.2587491%"], expectedRGBA: [2, 255, 172, 1] },
                "as an array of RGBA percentage values": { input: [".623%", "100.0%", "67.2587491%", 0.5], expectedRGBA: [2, 255, 172, 0.5] },
                "as a mixed array of integer RGB values, RGB values with decimals, and percentages": { input: [4.499999999999999, 143.5, "67.2587491%"], expectedRGBA: [4, 144, 172, 1], expectedPreciseRGBA: [4.499999999999999, 143.5, ( 67.2587491 * 2.55 ), 1] },
                "as a mixed array of integer RGBA values, RGBA values with decimals, and percentages": { input: [4.499999999999999, 143.5, "67%", 0.5], expectedRGBA: [4, 144, 171, 0.5], expectedPreciseRGBA: [4.499999999999999, 143.5, ( 67 * 2.55 ), 0.5] },

                "as a hash of integer RGB values": { input: { r: 4, g: 144, b: 163 }, expectedRGBA: [4, 144, 163, 1] },
                "as a hash of integer RGBA values": { input: { r: 4, g: 144, b: 163, a: 0.5 }, expectedRGBA: [4, 144, 163, 0.5] },
                "as a hash of RGB values with decimals": { input: { r: 4.499999999999999, g: 143.5, b: 163.00000010101010101 }, expectedRGBA: [4, 144, 163, 1], expectedPreciseRGBA: [4.499999999999999, 143.5, 163.00000010101010101, 1] },
                "as a hash of RGBA values with decimals": { input: { r: 4.499999999999999, g: 143.5, b: 163.00000010101010101, a: 0.5}, expectedRGBA: [4, 144, 163, 0.5], expectedPreciseRGBA: [4.499999999999999, 143.5, 163.00000010101010101, 0.5] },
                "as a hash of RGB percentage values": { input: { r: ".623%", g: "100.0%", b: "67.2587491%" }, expectedRGBA: [2, 255, 172, 1] },
                "as a hash of RGBA percentage values": { input: { r: ".623%", g: "100.0%", b: "67.2587491%", a: 0.5 }, expectedRGBA: [2, 255, 172, 0.5] },
                "as a mixed hash of integer RGB values, RGB values with decimals, and percentages": { input: { r: 4.499999999999999, g: 143.5, b: "67.2587491%"}, expectedRGBA: [4, 144, 172, 1], expectedPreciseRGBA: [4.499999999999999, 143.5, ( 67.2587491 * 2.55 ), 1] },
                "as a mixed hash of integer RGBA values, RGBA values with decimals, and percentages": { input: { r: 4.499999999999999, g: 143.5, b: "67%", a: 0.5}, expectedRGBA: [4, 144, 171, 0.5], expectedPreciseRGBA: [4.499999999999999, 143.5, ( 67 * 2.55 ), 0.5] }
            };

            describeWithData( inputColourScenario, function ( scenario ) {

                var colour;

                beforeEach( function () {
                    colour = new Color( scenario.input );
                } );

                it( 'is recognized as a colour', function () {
                    expect( colour.isColor() ).to.be.true;
                } );

                it( 'is represented by the correct RGBA value', function () {
                    expect( colour.asRgbaArray() ).to.eql( scenario.expectedRGBA );
                } );

                if ( scenario.expectedPreciseRGBA ) {

                    it( 'is represented by the correct RGBA value when enabling full precision', function () {
                        expect( colour.asRgbaArray( { precision: "max"} ) ).to.eql( scenario.expectedPreciseRGBA );
                    } );

                }

            } );

        } );

        describe( 'Any other input is classified as not being a colour', function () {

            it( 'for an arbitrary, non-colour word', function () {
                expect( ( new Color( "foo" ) ).isColor() ).to.be.false;
            } );

            it( 'for an rgb() string mixing percentages with non-percentage values (e.g. 0 instead of "0%")', function () {
                expect( ( new Color( "rgb(0, 60%, 67%)" ) ).isColor() ).to.be.false;
            } );

            it( 'for an rgba() string mixing percentages with non-percentage values (e.g. 0 instead of "0%")', function () {
                expect( ( new Color( "rgba(0, 60%, 67%, .5)" ) ).isColor() ).to.be.false;
            } );

            it( 'for an empty hash', function () {
                expect( ( new Color( {} ) ).isColor() ).to.be.false;
            } );

            it( 'for an RGB hash with incomplete r, g, b properties', function () {
                expect( ( new Color( { r: 10, b: 10 } ) ).isColor() ).to.be.false;
            } );

            it( 'for an RGBA hash with incomplete r, g, b properties', function () {
                expect( ( new Color( { r: 10, b: 10, a: 0.5 } ) ).isColor() ).to.be.false;
            } );

            it( 'for an empty array', function () {
                expect( ( new Color( [] ) ).isColor() ).to.be.false;
            } );

            it( 'for an array with arbitrary strings', function () {
                expect( ( new Color( [ "foo", "bar", "baz" ] ) ).isColor() ).to.be.false;
            } );

            it( 'for an array with arbitrary percentage strings', function () {
                expect( ( new Color( [ "foo%", "bar%", "baz%" ] ) ).isColor() ).to.be.false;
            } );

            it( 'for an array with a percentage above 100%', function () {
                expect( ( new Color( [ "10%", "100.01%", "10%" ] ) ).isColor() ).to.be.false;
            } );

            it( 'for an array with a negative percentage', function () {
                expect( ( new Color( [ "-10%", "100%", "10%" ] ) ).isColor() ).to.be.false;
            } );

            it( 'for an RGB array with a number greater than 255', function () {
                expect( ( new Color( [ 10, 256, 10 ] ) ).isColor() ).to.be.false;
            } );

            it( 'for an RGB array with a negative number', function () {
                expect( ( new Color( [ 10, -10, 10 ] ) ).isColor() ).to.be.false;
            } );

            it( 'for an array with an alpha channel greater than 1', function () {
                expect( ( new Color( [ 10, 256, 10, 1.01 ] ) ).isColor() ).to.be.false;
            } );

            it( 'for an array with a negative alpha channel', function () {
                expect( ( new Color( [ 10, 256, 10, -0.01 ] ) ).isColor() ).to.be.false;
            } );

            it( 'for an array with more than four values', function () {
                expect( ( new Color( [ 1, 1, 1, 1, 1 ] ) ).isColor() ).to.be.false;
            } );

            it( 'for a boolean true', function () {
                expect( ( new Color( true ) ).isColor() ).to.be.false;
            } );

            it( 'for a boolean false', function () {
                expect( ( new Color( false ) ).isColor() ).to.be.false;
            } );

            it( 'for null', function () {
                expect( ( new Color( null ) ).isColor() ).to.be.false;
            } );

            it( 'for undefined', function () {
                expect( ( new Color( undefined ) ).isColor() ).to.be.false;
            } );

            it( 'when the colour argument is missing', function () {
                expect( ( new Color() ).isColor() ).to.be.false;
            } );

        } );

    } );

    describe( 'Output methods', function () {

        var colour,

            scenarios = {
                opaque: {
                    input: [0, 153, 169],
                    expected: {
                        hex: "#0099A9",
                        rgb: "rgb(0, 153, 169)",
                        rgba: "rgba(0, 153, 169, 1)",
                        rgbArray: [0, 153, 169],
                        rgbaArray: [0, 153, 169, 1],
                        rgbPercent: "rgb(0%, 60%, 66%)",
                        rgbPercent_precision5: "rgb(0%, 60%, 66.27451%)",
                        rgbPercent_precisionMax: "rgb(0%, 60%, " + ( 169/2.55 ) + "%)",
                        rgbaPercent: "rgba(0%, 60%, 66%, 1)",
                        rgbaPercent_precision5: "rgba(0%, 60%, 66.27451%, 1)",
                        rgbaPercent_precisionMax: "rgba(0%, 60%, " + ( 169/2.55 ) + "%, 1)",
                        agColor: "AgColor( 0, 0.6, " + ( 169/255 ) + ", 1 )"                    // additional whitespace as inserted by LR
                    }
                },
                transparent: {
                    input: [0, 153, 169, 0.5],
                    expected: {
                        rgba: "rgba(0, 153, 169, 0.5)",
                        rgbaArray: [0, 153, 169, 0.5],
                        rgbaPercent: "0%, 60%, 66%, 0.5",
                        agColor: "AgColor(0, 0.6, 0.66, 0.5)"
                    }
                },
                noColour: {
                    input: "foo"
                }
            };

        beforeEach( function () {
            colour = new Color( scenarios.opaque.input );
        } );

        describe( 'The asHex() method', function () {

            it( 'returns the hex value as #rrggbb by default', function () {
                expect( colour.asHex() ).to.equal( scenarios.opaque.expected.hex.toLowerCase() );
            } );

            it( 'returns the hex value as #rrggbb with options.lowerCase', function () {
                expect( colour.asHex( { lowerCase: true } ) ).to.equal( scenarios.opaque.expected.hex.toLowerCase() );
            } );

            it( 'returns the hex value as #RRGGBB with options.upperCase', function () {
                expect( colour.asHex( { upperCase: true } ) ).to.equal( scenarios.opaque.expected.hex.toUpperCase() );
            } );

            it( 'returns the hex value as #RRGGBB with options.lowerCase = false', function () {
                expect( colour.asHex( { lowerCase: false } ) ).to.equal( scenarios.opaque.expected.hex.toUpperCase() );
            } );

            it( 'returns the hex value as rrggbb (no "#" prefix) with options.prefix = false', function () {
                expect( colour.asHex( { prefix: false } ) ).to.equal( scenarios.opaque.expected.hex.toLowerCase().slice( 1 )  );
            } );

            it( 'throws an error when the colour is transparent', function () {
                expect( function () {
                    Color( scenarios.transparent.input ).asHex();
                } ).to.throw( "Color.ensureOpaque: Color is required to be opaque, but it is not" );
            } );
            
            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                expect( function () {
                    Color( scenarios.transparent.noColour ).asHex();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

        describe( 'The asHexLC() method', function () {

            it( 'returns the hex value as #rrggbb', function () {
                expect( colour.asHexLC() ).to.equal( scenarios.opaque.expected.hex.toLowerCase() );
            } );

            it( 'throws an error when the colour is transparent', function () {
                expect( function () {
                    Color( scenarios.transparent.input ).asHexLC();
                } ).to.throw( "Color.ensureOpaque: Color is required to be opaque, but it is not" );
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                expect( function () {
                    Color( scenarios.transparent.noColour ).asHexLC();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

        describe( 'The asHexUC() method', function () {

            it( 'returns the hex value as #rrggbb', function () {
                expect( colour.asHexUC() ).to.equal( scenarios.opaque.expected.hex.toUpperCase() );
            } );

            it( 'throws an error when the colour is transparent', function () {
                expect( function () {
                    Color( scenarios.transparent.input ).asHexUC();
                } ).to.throw( "Color.ensureOpaque: Color is required to be opaque, but it is not" );
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                expect( function () {
                    Color( scenarios.transparent.noColour ).asHexUC();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

        describe( 'The asRgb() method', function () {

            it( 'returns the rgb() value', function () {
                expect( colour.asRgb() ).to.equal( scenarios.opaque.expected.rgb );
            } );

            it( 'returns the rgb() value rounded to integers', function () {
                var colour = new Color( "AgColor(" + [254.4999/255, 254.5/255, 254.5111/255, 1].join( ", " ) + ")" );
                expect( colour.asRgb() ).to.equal( "rgb(254, 255, 255)" );
            } );

            it( 'throws an error when the colour is transparent', function () {
                expect( function () {
                    Color( scenarios.transparent.input ).asRgb();
                } ).to.throw( "Color.ensureOpaque: Color is required to be opaque, but it is not" );
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                expect( function () {
                    Color( scenarios.transparent.noColour ).asRgb();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

        describe( 'The asRgbPercent() method', function () {

            it( 'returns the rgb() value with percentages (integers)', function () {
                expect( colour.asRgbPercent() ).to.equal( scenarios.opaque.expected.rgbPercent );
            } );

            it( 'returns the rgb() value with percentages in the precision specified by options.precision', function () {
                expect( colour.asRgbPercent( { precision: 5 } ) ).to.equal( scenarios.opaque.expected.rgbPercent_precision5 );
            } );

            it( 'returns the rgb() value with percentages in full precision when options.precision = "max"', function () {
                expect( colour.asRgbPercent( { precision: "max" } ) ).to.equal( scenarios.opaque.expected.rgbPercent_precisionMax );
            } );

            it( 'returns the rgb() value with percentages in full, original precision when options.precision = "max"', function () {
                var inputStr = "rgb(0.01%, 66.078%, 66.079%)",
                    colour = new Color( inputStr );

                // Prior to the actual main test, verifying that the almost identical percentages for G and B map to
                // different G and B values when rounded to RGB integers.
                expect( colour.asRgb() ).to.equal( "rgb(0, 168, 169)" );

                // Checking that G and B are returned in their original precision, not altered by a round trip into
                // another format.
                expect( colour.asRgbPercent( { precision: "max" } ) ).to.equal( inputStr );
            } );

            it( 'returns the rgb() value without converting near-zero values into scientific notation when options.precision = n', function () {
                // NB See the previous test for the fine print. With options.precision = n, we expect to get ordinary,
                // non-scientific notation for any number with n fractional digits.
                var inputStr = "rgb(0.000000000421%, 50%, 50%)",
                    colour = new Color( inputStr );

                expect( colour.asRgbPercent( { precision: 12 } ) ).to.equal( inputStr );
            } );

            it( 'returns the rgb() value without converting near-zero values into scientific notation when options.precision = "max"', function () {
                // NB In terms of the spec, this is a bit of a grey area. Scientific notation ("1e-9%" instead of
                // "0.000000001%") should be OK, but the spec doesn't say so explicitly for colours. Some browsers might
                // bark, even though the actual display value in the browser is 0 in any case.
                var inputStr = "rgb(0.000000000000000001%, 50%, 50%)",  // 1e-18
                    colour = new Color( inputStr );

                expect( colour.asRgbPercent( { precision: "max" } ) ).to.equal( inputStr );
            } );

            it( 'throws an error when the colour is transparent', function () {
                expect( function () {
                    Color( scenarios.transparent.input ).asRgbPercent();
                } ).to.throw( "Color.ensureOpaque: Color is required to be opaque, but it is not" );
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                expect( function () {
                    Color( scenarios.transparent.noColour ).asRgbPercent();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

        describe( 'The asRgba() method', function () {

            it( 'returns the rgba() value', function () {
                expect( colour.asRgba() ).to.equal( scenarios.opaque.expected.rgba );
            } );

            it( 'returns the RGB channels of the rgba() value rounded to integers', function () {
                var colour = new Color( "AgColor(" + [254.4999/255, 254.5/255, 254.5111/255, 0.6789].join( ", " ) + ")" );
                expect( colour.asRgba() ).to.equal( "rgba(254, 255, 255, 0.6789)" );
            } );

            it( 'does not throw an error when the colour is transparent', function () {
                expect( function () {
                    Color( scenarios.transparent.input ).asRgba();
                } ).not.to.throw();
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                expect( function () {
                    Color( scenarios.transparent.noColour ).asRgba();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

        describe( 'The asRgbaPercent() method', function () {

            it( 'returns the rgba() value with percentages (integers)', function () {
                expect( colour.asRgbaPercent() ).to.equal( scenarios.opaque.expected.rgbaPercent );
            } );

            it( 'returns the rgba() value with percentages in the precision specified by options.precision', function () {
                expect( colour.asRgbaPercent( { precision: 5 } ) ).to.equal( scenarios.opaque.expected.rgbaPercent_precision5 );
            } );

            it( 'returns the rgba() value with percentages in full precision when options.precision = "max"', function () {
                expect( colour.asRgbaPercent( { precision: "max" } ) ).to.equal( scenarios.opaque.expected.rgbaPercent_precisionMax );
            } );

            it( 'returns the rgba() value with percentages in full, original precision when options.precision = "max"', function () {
                var inputStr = "rgba(0.01%, 66.078%, 66.079%, 0.4)",
                    colour = new Color( inputStr );

                // Prior to the actual main test, verifying that the almost identical percentages for G and B map to
                // different G and B values when rounded to RGB integers.
                expect( colour.asRgba() ).to.equal( "rgba(0, 168, 169, 0.4)" );

                // Checking that G and B are returned in their original precision, not altered by a round trip into
                // another format.
                expect( colour.asRgbaPercent( { precision: "max" } ) ).to.equal( inputStr );
            } );

            it( 'returns the rgba() value without converting near-zero values into scientific notation when options.precision = n', function () {
                // NB See the previous test for the fine print. With options.precision = n, we expect to get ordinary,
                // non-scientific notation for any number with n fractional digits.
                var inputStr = "rgba(0.000000000421%, 50%, 50%, 0.00000000000421)",
                    colour = new Color( inputStr );

                expect( colour.asRgbaPercent( { precision: 12 } ) ).to.equal( inputStr );
            } );

            it( 'returns the rgba() value without converting near-zero values into scientific notation when options.precision = "max"', function () {
                // NB In terms of the spec, this is a bit of a grey area. Scientific notation ("1e-9%" instead of
                // "0.000000001%") should be OK, but the spec doesn't say so explicitly for colours. Some browsers might
                // bark, even though the actual display value in the browser is 0 in any case.
                var inputStr = "rgba(0.000000000000000001%, 50%, 50%, 0.000000000000000001)",  // 1e-18
                    colour = new Color( inputStr );

                expect( colour.asRgbaPercent( { precision: "max" } ) ).to.equal( inputStr );
            } );

            it( 'does not throw an error when the colour is transparent', function () {
                expect( function () {
                    Color( scenarios.transparent.input ).asRgbaPercent();
                } ).not.to.throw();
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                expect( function () {
                    Color( scenarios.transparent.noColour ).asRgbaPercent();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

        describe( 'The asAgColor() method', function () {

            // NB Lightroom inserts an additional space between values and enclosing parentheses, which is reflected in
            // the expected values of the tests.

            it( 'returns the AgColor() value with fractions', function () {
                expect( colour.asAgColor() ).to.equal( scenarios.opaque.expected.agColor );
            } );

            it( 'returns the AgColor() fractions in full, original precision', function () {
                var inputStr = "AgColor( 0.0001, 0.66078, 0.66079, 0.4123456789 )",
                    colour = new Color( inputStr );

                // Prior to the actual main test, verifying that the almost identical percentages for G and B map to
                // different G and B values when rounded to RGB integers.
                expect( colour.asRgba() ).to.equal( "rgba(0, 168, 169, 0.4123456789)" );

                // Checking that G and B are returned in their original precision, not altered by a round trip into
                // another format.
                expect( colour.asAgColor() ).to.equal( inputStr );
            } );

            it( 'returns the AgColor() value without converting near-zero values into scientific notation when options.precision = "max"', function () {
                // NB Scientific notation ("1e-9" instead of "0.000000001") should be OK, but LR is pretty much a black
                // box in that regard, so better not risk it.
                var inputStr = "AgColor( 0.00000000000000000123, 0.5, 0.5, 0.00000000000000000123 )",  // 1.23e-18
                    colour = new Color( inputStr );

                expect( colour.asAgColor() ).to.equal( inputStr );
            } );

            it( 'does not throw an error when the colour is transparent', function () {
                expect( function () {
                    Color( scenarios.transparent.input ).asAgColor();
                } ).not.to.throw();
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                expect( function () {
                    Color( scenarios.transparent.noColour ).asAgColor();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

        describe( 'The asRgbArray() method', function () {

            var preciseScenario,
                preciseColour;

            beforeEach( function () {
                preciseScenario = {
                    input: [254.499999999460001, 254.5, 254.500000000150001],
                    expected: {
                        rounded: [254, 255, 255],
                        precision10: [254.4999999995, 254.5, 254.5000000002],
                        precisionMax: [254.499999999460001, 254.5, 254.500000000150001]   // same as input
                    }
                };

                preciseColour = new Color( preciseScenario.input );
            } );

            it( 'returns the rgb() values', function () {
                expect( colour.asRgbArray() ).to.eql( scenarios.opaque.expected.rgbArray );
            } );

            it( 'returns the rgb() values rounded to integers', function () {
                expect( preciseColour.asRgbArray() ).to.eql( preciseScenario.expected.rounded );
            } );

            it( 'returns the rgb() values in the precision specified by options.precision', function () {
                expect( preciseColour.asRgbArray( { precision: 10 } ) ).to.eql( preciseScenario.expected.precision10 );
            } );

            it( 'returns the rgb() values in full precision when options.precision = "max"', function () {
                expect( preciseColour.asRgbArray( { precision: "max" } ) ).to.eql( preciseScenario.expected.precisionMax );
            } );

            it( 'throws an error when the colour is transparent', function () {
                expect( function () {
                    Color( scenarios.transparent.input ).asRgbArray();
                } ).to.throw( "Color.ensureOpaque: Color is required to be opaque, but it is not" );
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                expect( function () {
                    Color( scenarios.transparent.noColour ).asRgbArray();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

        describe( 'The asRgbaArray() method', function () {

            var preciseScenario,
                preciseColour;

            beforeEach( function () {
                preciseScenario = {
                    input: [254.499999999460001, 254.5, 254.500000000150001, 0.5],
                    expected: {
                        rounded: [254, 255, 255, 0.5],
                        precision10: [254.4999999995, 254.5, 254.5000000002, 0.5],
                        precisionMax: [254.499999999460001, 254.5, 254.500000000150001, 0.5]   // same as input
                    }
                };

                preciseColour = new Color( preciseScenario.input );
            } );

            it( 'returns the rgba() values', function () {
                expect( colour.asRgbaArray() ).to.eql( scenarios.opaque.expected.rgbaArray );
            } );

            it( 'returns the RGB channels of the array rounded to integers', function () {
                expect( preciseColour.asRgbaArray() ).to.eql( preciseScenario.expected.rounded );
            } );

            it( 'returns the RGB channels of the array in the precision specified by options.precision', function () {
                expect( preciseColour.asRgbaArray( { precision: 10 } ) ).to.eql( preciseScenario.expected.precision10 );
            } );

            it( 'returns the RGB channels of the array in full precision when options.precision = "max"', function () {
                expect( preciseColour.asRgbaArray( { precision: "max" } ) ).to.eql( preciseScenario.expected.precisionMax );
            } );

            it( 'does not throw an error when the colour is transparent', function () {
                expect( function () {
                    Color( scenarios.transparent.input ).asRgbaArray();
                } ).not.to.throw();
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                expect( function () {
                    Color( scenarios.transparent.noColour ).asRgbaArray();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

        describe( 'The asComputed() method', function () {

            it( 'returns the rgb() value when the colour is opaque', function () {
                expect( Color( scenarios.opaque.input ).asComputed() ).to.equal( scenarios.opaque.expected.rgb );
            } );

            it( 'returns the channels of the rgb() value rounded to integers', function () {
                var colour = new Color( "AgColor(" + [254.4999/255, 254.5/255, 254.5111/255, 1].join( ", " ) + ")" );
                expect( colour.asComputed() ).to.equal( "rgb(254, 255, 255)" );
            } );

            it( 'returns the rgba() value when the colour is transparent', function () {
                expect( Color( scenarios.transparent.input ).asComputed() ).to.equal( scenarios.transparent.expected.rgba );
            } );

            it( 'returns the RGB channels of the rgba() value rounded to integers', function () {
                var colour = new Color( "AgColor(" + [254.4999/255, 254.5/255, 254.5111/255, 0.6789].join( ", " ) + ")" );
                expect( colour.asComputed() ).to.equal( "rgba(254, 255, 255, 0.6789)" );
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                expect( function () {
                    Color( scenarios.transparent.noColour ).asComputed();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

    } );

    describe( 'Query methods', function () {

        var inputs = {
                opaque: [0, 153, 169],
                transparent: [0, 153, 169, 0.5],
                noColour: "foo"
            };

        describe( 'The isColor() method', function () {

            it( 'returns true when the colour passed to the constructor has been a valid, opaque CSS colour', function () {
                var colour = new Color( inputs.opaque );
                expect( colour.isColor() ).to.be.true;
            } );

            it( 'returns true when the colour passed to the constructor has been a valid, transparent CSS colour', function () {
                var colour = new Color( inputs.transparent );
                expect( colour.isColor() ).to.be.true;
            } );

            it( 'returns false when the colour passed to the constructor has not been a valid CSS colour', function () {
                var colour = new Color( inputs.noColour );
                expect( colour.isColor() ).to.be.false;
            } );

        } );

        describe( 'The isOpaque() method', function () {

            it( 'returns true when the colour passed to the constructor has been a valid, opaque CSS colour', function () {
                var colour = new Color( inputs.opaque );
                expect( colour.isOpaque() ).to.be.true;
            } );

            it( 'returns false when the colour passed to the constructor has been a valid, transparent CSS colour', function () {
                var colour = new Color( inputs.transparent );
                expect( colour.isOpaque() ).to.be.false;
            } );

            it( 'returns false when the colour passed to the constructor has not been a valid CSS colour', function () {
                var colour = new Color( inputs.noColour );
                expect( colour.isOpaque() ).to.be.false;
            } );

        } );

        describe( 'The isTransparent() method', function () {

            it( 'returns false when the colour passed to the constructor has been a valid, opaque CSS colour', function () {
                var colour = new Color( inputs.opaque );
                expect( colour.isTransparent() ).to.be.false;
            } );

            it( 'returns true when the colour passed to the constructor has been a valid, transparent CSS colour', function () {
                var colour = new Color( inputs.transparent );
                expect( colour.isTransparent() ).to.be.true;
            } );

            it( 'returns false when the colour passed to the constructor has not been a valid CSS colour', function () {
                var colour = new Color( inputs.noColour );
                expect( colour.isTransparent() ).to.be.false;
            } );

        } );

    } );

    describe( 'Validation methods', function () {

        var inputs = {
            opaque: [0, 153, 169],
            transparent: [0, 153, 169, 0.5],
            noColour: "foo"
        };

        describe( 'The ensureColor() method', function () {

            it( 'does not throw an error, and returns true, when the colour passed to the constructor has been a valid, opaque CSS colour', function () {
                var colour = new Color( inputs.opaque );
                expect( colour.ensureColor() ).to.be.true;
            } );

            it( 'does not throw an error, and returns true, when the colour passed to the constructor has been a valid, transparent CSS colour', function () {
                var colour = new Color( inputs.transparent );
                expect( colour.ensureColor() ).to.be.true;
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                var colour = new Color( inputs.noColour );
                expect( function () {
                    colour.ensureColor();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

        describe( 'The ensureOpaque() method', function () {

            it( 'does not throw an error, and returns true, when the colour passed to the constructor has been a valid, opaque CSS colour', function () {
                var colour = new Color( inputs.opaque );
                expect( colour.ensureOpaque() ).to.be.true;
            } );

            it( 'throws an error when the colour passed to the constructor has been a valid, transparent CSS colour', function () {
                var colour = new Color( inputs.transparent );
                expect( function () {
                    colour.ensureOpaque();
                } ).to.throw( "Color.ensureOpaque: Color is required to be opaque, but it is not" );
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                var colour = Color( inputs.noColour );
                expect( function () {
                    colour.ensureOpaque();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

        describe( 'The ensureTransparent() method', function () {

            it( 'does not throw an error, and returns true, when the colour passed to the constructor has been a valid, transparent CSS colour', function () {
                var colour = new Color( inputs.transparent );
                expect( colour.ensureTransparent() ).to.be.true;
            } );

            it( 'throws an error when the colour passed to the constructor has been a valid, opaque CSS colour', function () {
                var colour = new Color( inputs.opaque );
                expect( function () {
                    colour.ensureTransparent();
                } ).to.throw( "Color.ensureTransparent: Color is required to be transparent, but it is not" );
            } );

            it( 'throws an error when the colour passed to the constructor has not been a valid CSS colour', function () {
                var colour = Color( inputs.noColour );
                expect( function () {
                    colour.ensureTransparent();
                } ).to.throw( "Color.ensureColor: The color object does not represent a valid color" );
            } );

        } );

    } );

    describe( 'Comparison methods', function () {

        var inputs = {
            noAlpha: {
                asRgb: "rgb(0, 128, 254)",
                asHex: "#0080FE",
                asPercentApprox: "rgb(0%, 50%, 99.411765%)", // precise percentages: 0%, 50.1960784314%, 99.6078431373%
                adjacent: {
                    asPercent: "rgb(0%, 50%, 99.411764%)"    // boundary between 253 and 254 is at 99,4117647...%
                },
                offBy2: {
                    above: [2, 130, 255],
                    below: [0, 126, 252]
                },
                offByJustMoreThanTwo: {
                    above: [( 2.5 / 2.55 ) + "%", ( 130.5 / 2.55 ) + "%", "100%"],
                    below: ["0%", ( 125.4999999999 / 2.55 ) + "%", ( 251.4999999999 / 2.55 ) + "%"]
                }
            },
            alpha: {
                value: [10, 20, 30, 0.5],
                alphaDiff: [10, 20, 30, 0.5000000001]
            }
        };

        describe( 'The equals() method', function () {

            it( 'accepts string input and detects equality when colours match exactly', function () {
                expect( Color( inputs.noAlpha.asRgb ).equals( inputs.noAlpha.asHex ) ).to.be.true;
            } );

            it( 'accepts another color object and detects equality when colours match exactly', function () {
                var otherColour = new Color( inputs.noAlpha.asHex );
                expect( Color( inputs.noAlpha.asRgb ).equals( otherColour ) ).to.be.true;
            } );

            it( 'returns true if colours values are slightly different but map to the same RGB integers', function () {
                expect( Color( inputs.noAlpha.asRgb ).equals( inputs.noAlpha.asPercentApprox ) ).to.be.true;
            } );

            it( 'returns false if colour values are slightly different but map to adjacent RGB values', function () {
                expect( Color( inputs.noAlpha.asRgb ).equals( inputs.noAlpha.adjacent.asPercent ) ).to.be.false;
            } );

            it( 'returns true if the colour values map to different RGB values but only differ as much as the specified tolerance', function () {
                expect( Color( inputs.noAlpha.asRgb ).equals( inputs.noAlpha.offBy2.above, { tolerance: 2 } ) ).to.be.true;
                expect( Color( inputs.noAlpha.asRgb ).equals( inputs.noAlpha.offBy2.below, { tolerance: 2 } ) ).to.be.true;
            } );

            it( 'returns false if the colour values map to different RGB values and differ slightly more than the specified tolerance', function () {
                expect( Color( inputs.noAlpha.asRgb ).equals( inputs.noAlpha.offByJustMoreThanTwo.above, { tolerance: 2 } ) ).to.be.false;
                expect( Color( inputs.noAlpha.asRgb ).equals( inputs.noAlpha.offByJustMoreThanTwo.below, { tolerance: 2 } ) ).to.be.false;
            } );

            it( 'returns false if the RGB colour values are identical but the alpha channel differs slightly, irrespective of the specified tolerance', function () {
                expect( Color( inputs.alpha.value ).equals( inputs.alpha.alphaDiff, { tolerance: 255 } ) ).to.be.false;
            } );

            it( 'returns false if the colour object is not a valid colour', function () {
                expect( Color( "foo" ).equals( inputs.noAlpha.asHex ) ).to.be.false;
            } );
            
            it( 'returns false if the colour object is not a valid colour, when a tolerance is specified', function () {
                expect( Color( "foo" ).equals( inputs.noAlpha.asHex, { tolerance: 2 } ) ).to.be.false;
            } );

            it( 'returns false if the colour argument is not a valid colour', function () {
                expect( Color( inputs.noAlpha.asHex ).equals( "foo" ) ).to.be.false;
            } );

            it( 'returns false if the colour argument is not a valid colour, when a tolerance is specified', function () {
                expect( Color( inputs.noAlpha.asHex ).equals( "foo", { tolerance: 2 } ) ).to.be.false;
            } );

            it( 'returns false if the colour object and the colour argument are defined by the same input value, but the value is not a valid colour', function () {
                expect( Color( "foo" ).equals( "foo" ) ).to.be.false;
            } );

        } );

        describe( 'The strictlyEquals() method', function () {

            it( 'accepts string input and detects equality when colours match exactly', function () {
                expect( Color( inputs.noAlpha.asRgb ).strictlyEquals( inputs.noAlpha.asHex ) ).to.be.true;
            } );

            it( 'accepts another color object and detects equality when colours match exactly', function () {
                var otherColour = new Color( inputs.noAlpha.asHex );
                expect( Color( inputs.noAlpha.asRgb ).strictlyEquals( otherColour ) ).to.be.true;
            } );

            it( 'returns false if colour values are different', function () {
                expect( Color( inputs.noAlpha.asRgb ).strictlyEquals( inputs.noAlpha.adjacent.asPercent ) ).to.be.false;
            } );

            it( 'returns false if colours values are slightly different but map to the same RGB integers', function () {
                expect( Color( inputs.noAlpha.asRgb ).strictlyEquals( inputs.noAlpha.asPercentApprox ) ).to.be.false;
            } );

            it( 'returns false if colours values are slightly different but would be rounded to the same RGB percentages', function () {
                expect( Color( "rgb(0%, 50%, 100%)" ).strictlyEquals( "rgb(0.00000000000000000001%, 50.00000000000000000001%, 99.99999999999999999999%)" ) ).to.be.false;
            } );

            it( 'returns false if the RGB colour values are identical but the alpha channel differs slightly', function () {
                expect( Color( inputs.alpha.value ).strictlyEquals( inputs.alpha.alphaDiff ) ).to.be.false;
            } );

            it( 'returns false if the colour object is not a valid colour', function () {
                expect( Color( "foo" ).strictlyEquals( inputs.noAlpha.asHex ) ).to.be.false;
            } );

            it( 'returns false if the colour argument is not a valid colour', function () {
                expect( Color( inputs.noAlpha.asHex ).strictlyEquals( "foo" ) ).to.be.false;
            } );

            it( 'returns false if the colour object and the colour argument are defined by the same input value, but the value is not a valid colour', function () {
                expect( Color( "foo" ).strictlyEquals( "foo" ) ).to.be.false;
            } );

        } );

    } );

})();