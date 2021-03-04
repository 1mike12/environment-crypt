const fs = require("fs")
const crypto = require("./crypto")

module.exports = {
    encodeSync(inPath, outPath, password){
        let text = fs.readFileSync(inPath)
        let encrypted = crypto.encode(text, password)
        fs.writeFileSync(outPath, encrypted, "utf-8")
    },
    decodeSync(path, password){
        let encrypted = fs.readFileSync(path, "utf-8")
        let decrypted = crypto.decode(encrypted, password)
        return decrypted
    },
    loadJSONToEnv(json, allowOverwrite = true){
        const existingEnvironmentKeys = new Set(Object.keys(process.env))

        for (const [key, value] of Object.entries(json)) {
            if (existingEnvironmentKeys.has(key)){
                if (allowOverwrite){
                    console.warn(`overwriting existing environment variable ${key} to ${value}`)
                } else {
                    throw new Error(`cannot overwrite existing environment variable ${key} to ${value}`)
                }
            }
            process.env[key] = value
        }
    },
    getJSON(envFilePath, password){
        let decoded = this.decodeSync(envFilePath, password)
        let json = JSON.parse(decoded)
        return json
    },
    loadJSON(envFilePath, password, overWrite = true){
        let json = this.getJSON(envFilePath, password)
        this.loadJSONToEnv(json, overWrite)
    }
}