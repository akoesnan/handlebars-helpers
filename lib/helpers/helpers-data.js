/**
 * Handlebars Helpers: Data
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// Node.js
var fs = require('fs');


// node_modules
var _ = require('lodash');


// Local utils
var Utils = require('../utils/utils');


// The module to be exported
var helpers = {

  /**
   * {{value}}
   * Extract a value from a specific property
   * @param  {[type]} filepath [description]
   * @param  {[type]} prop     [description]
   * @return {[type]}          [description]
   */
  value: function (filepath, prop) {
    filepath = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    prop = _.pick(filepath, prop);
    prop = _.pluck(prop);
    return new Utils.safeString(prop);
  },

  /**
   * {{prop}}
   * Extract a specific property
   * @param  {[type]} filepath [description]
   * @param  {[type]} prop     [description]
   * @return {[type]}          [description]
   */
  prop: function (filepath, prop) {
    filepath = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    prop = _.pick(filepath, prop);
    return new Utils.safeString(JSON.stringify(prop, null, 2));
  },

  /**
   * {{stringify}}
   * Stringify an object to JSON
   * @param  {(object|string)} data Object to stringify (or path of JSON file)
   * @return {string}
   */
  stringify: function (data) {
    if (typeof data === 'string') {
      data = JSON.parse(fs.readFileSync(data, 'utf8'));
    }
    return new Utils.safeString(JSON.stringify(data, null, 2));
  },

  /**
   * {{parseJSON}}
   * Contributed by github.com/keeganstreet
   */
  parseJSON: function (data, options) {
    return options.fn(JSON.parse(data));
  }

};

// Export helpers
module.exports.register = function (hbsHelpers, options) {
  options = options || {};
  _.extend(hbsHelpers, helpers);
};
