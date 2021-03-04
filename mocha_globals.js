'use strict';
console.log("global mocha options loaded")
global.mocha = require('mocha')
global.chai = require("chai")
global.expect = require("chai").expect
process.env.NODE_ENV = "test"