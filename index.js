const fs = require("fs")
const crypto = require("./crypto")

module.exports = {
    /**
     * encrypts a file with the given password
     * @param {string} inPath - unencrypted file path
     * @param {string} outPath - encrypted path to be written to
     * @param {string} password
     */
    encodeSync(inPath, outPath, password){
        let text = fs.readFileSync(inPath)
        let encrypted = crypto.encode(text, password)
        fs.writeFileSync(outPath, encrypted, "utf-8")
    },
    /**
     * reads an encoded file and returns string representation of file
     * @param {string} path
     * @param {string} password
     * @returns {string}
     */
    decodeSync(path, password){
        let encrypted = fs.readFileSync(path, "utf-8")
        let decrypted = crypto.decode(encrypted, password)
        return decrypted
    },
    /**
     * assigns key value pairs to the global `process.env` object
     * @param json key value pairs to write
     * @param allowOverwrite - if true, allows new keys to overwrite pre-existing keys already in `process.env`
     */
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
    /**
     * reads an encrypted file from the filesystem with the given password
     * @param {string} envFilePath
     * @param {string} password
     * @returns {json} json
     */
    getJSON(envFilePath, password){
        let decoded = this.decodeSync(envFilePath, password)
        let json = JSON.parse(decoded)
        return json
    },
    /**
     * load an environment file directly to process.env
     * @param {string} envFilePath
     * @param {string} password
     * @param {boolean} overWrite
     */
    loadJSON(envFilePath, password, overWrite = true){
        let json = this.getJSON(envFilePath, password)
        this.loadJSONToEnv(json, overWrite)
    }
}