/**
 * @fileOverview
 * Copyright (c) 2013 Aaron Gloege
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * jQuery Tap Plugin
 * Using the tap event, this plugin will properly simulate a click event
 * in touch browsers using touch events, and on non-touch browsers,
 * click will automatically be used instead.
 *
 * @author Aaron Gloege
 * @version 1.0.0
 */
(function($) {
    'use strict';

    /**
     * Events to attach fixHook too
     * @type Array
     */
    var events = ['touchstart', 'touchmove', 'touchend'];

    /**
     * Fix object.
     * jQuery API supports the following props and methods:
     *
     *  {
     *      props: Array
     *      filter: Function
     *  }
     * @type Object
     */
    var fix = {

        /**
         * Properties to copy over to jQuery.Event
         * @type Array
         */
        props: 'touches changedTouches'.split(' '),

        /**
         * Function to copy over the first touch event's page, screen, and client data.
         * @param {jQuery.Event} event
         * @param {TouchEvent} original
         * @returns {jQuery.Event}
         */
        filter: function(event, original) {
            var touch = original.changedTouches[0];

            event.pageX = touch.pageX;
            event.pageY = touch.pageY;
            event.screenX = touch.screenX;
            event.screenY = touch.screenY;
            event.clientX = touch.clientX;
            event.clientY = touch.clientY;

            return event;
        }
    };

    var i = 0;
    var length = events.length;

    for (; i < length; i++) {
        if ($.event.fixHooks[events[i]]) {
            console.log(events[i] + ' fixHook already registered');
            continue;
        }

        $.event.fixHooks[events[i]] = fix;
    }

}(jQuery));