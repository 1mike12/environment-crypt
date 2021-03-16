#! /usr/bin/env node

/* Arguments that can be passed are
 */
"use strict";
const index = require("./index")
const fs = require("fs")
const argv = require('minimist')(process.argv.slice(2));
let {decrypt, raw, encrypted, password} = argv

if (!password) return console.warn("--password required")

if (!decrypt){
    if (!raw) return console.warn("--raw required")
    if (!encrypted) encrypted = raw + ".enc"
    index.encodeSync(raw, encrypted, password)
} else {
    if (!encrypted) return console.warn("--encrypted required")
    if (!raw){
        const path = require('path')
        if (path.extname(raw) === "enc"){
            let parts = encrypted.split(".")
            parts.pop()
            raw = parts.join()
        } else {
            raw = raw + ".dec"
        }
    }
    const decoded = index.decodeSync(encrypted, password)
    fs.writeFileSync(raw, decoded, "utf-8")
    return console.warn(`REMEMBER TO NOT CHECK IN DECRYPTED FILE ${raw}`)
}