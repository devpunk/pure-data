/**
 * @license MIT License (http://opensource.org/licenses/MIT)
 * @copyright Copyright (c) 2015 devpunk
 *
 * @description
 * The logger module can be imported as AMD loader plug-in.
 * The parameter to pass to the loader plug-in is the ID of the module
 * for which to log. This ID is prepended to each log message like so:
 *
 * ```
 * define([
 *    "util/logger!myModule"
 * ], function(log) {
 *    log.error("My error message.") // will print: 'myModule: My error message.'
 * });
 * ```
 * @module util/log
 */
define(["dojo/_base/config"], function(config) {

    //var logDisabled = !(!!config.logging);
    var logDisabled = false;
    function print(type, msg, args) {
        if (console && console[type]) {
            args = Array.prototype.slice.call(args);
            args.shift(); // remove msg; see getLogger()
            switch(args.length) {
                case 0: console[type](msg); break;
                case 1: console[type](msg, args[0]); break;
                case 2: console[type](msg, args[0], args[1]); break;
                case 3: console[type](msg, args[0], args[1], args[2]); break;
                case 4: console[type](msg, args[0], args[1], args[2], args[3]); break;
                case 5: console[type](msg, args[0], args[1], args[2], args[3], args[4]); break;
                default:
                    console[type](msg, args);
            }
        }
    }

    function getLogger(sourceId) {
        sourceId = sourceId ? sourceId + ": " : "";
        var noOp = function() {};
        return /** @lends module:util/log.prototype */ {
            /**
             * @method
             * @param {string} message
             */
            error: logDisabled ? noOp : function(msg) {
                print("error", sourceId + msg, arguments);
            },
            /**
             * @method
             * @param {string} message
             */
            warn: logDisabled ? noOp :function(msg) {
                print("warn", sourceId + msg, arguments);
            },
            /**
             * @method
             * @param {string} message
             */
            info: logDisabled ? noOp :function(msg) {
                print("info", sourceId + msg, arguments);
            },
            /**
             * @method
             * @param {string} message
             */
            debug: logDisabled ? noOp :function(msg) {
                print("debug", sourceId + msg, arguments);
            },
        };
    }

    logger = getLogger();
    logger.load = function (sourceId, req, load, config) {
        load(getLogger(sourceId));
    };
    return logger;
});