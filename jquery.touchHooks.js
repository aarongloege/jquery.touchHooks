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