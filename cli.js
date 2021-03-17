#! /usr/bin/env node

"use strict";
const index = require("./index")
const fs = require("fs")
const argv = require('minimist')(process.argv.slice(2))
const path = require('path')

//CLI Arguments
//=====================================================
let {decrypt, raw, encrypted, password, noclean} = argv

if (!password) return console.warn("--password required")

if (!decrypt){
    if (!raw) return console.warn("--raw required")
    if (!encrypted) encrypted = raw + ".enc"
    index.encodeSync(raw, encrypted, password)
    console.log("\x1b[32m", `Encrypted ${raw} to ${encrypted}`)
    if (noclean){
        return console.warn('\x1b[33m%s\x1b[0m', `REMEMBER TO NOT CHECK IN UNECRYPTED FILE: ${raw}`)
    } else {
        fs.unlinkSync(raw)
    }
} else {
    console.log(encrypted)
    if (!encrypted) return console.warn("--encrypted required")
    if (!raw){
        if (path.extname(encrypted) === ".enc"){
            let parts = encrypted.split(".")
            parts.pop()
            raw = parts.join(".")
        } else {
            raw = raw + ".dec"
        }
    }
    const decoded = index.decodeSync(encrypted, password)
    console.log(raw)
    fs.writeFileSync(raw, decoded, "utf-8")
    console.log("\x1b[32m", `Decrypted ${encrypted} to ${raw}`)
    return console.warn('\x1b[33m%s\x1b[0m', `REMEMBER TO NOT CHECK IN DECRYPTED FILE: ${raw}`)
}