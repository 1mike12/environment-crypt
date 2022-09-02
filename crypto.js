const crypto = require('crypto')
const OUTPUT_ENCODING = "base64"

module.exports = {
    /**
     * Creates cyphertext from given raw input and password. The IV, salt, and encrypted text are new-line delimited
     * and stored as base64 representations
     * @param raw
     * @param password
     * @returns string
     */
    encode(raw, password){
        const iv = crypto.randomBytes(16)
        const salt = crypto.randomBytes(16)
        const key = this.hashPass(password, salt)
        const cipher = crypto.createCipheriv("aes-256-ctr", key, iv)
        let encryptedData = cipher.update(raw, 'utf8', OUTPUT_ENCODING)
        encryptedData += cipher.final(OUTPUT_ENCODING)
        return `${iv.toString(OUTPUT_ENCODING)}\n${salt.toString(OUTPUT_ENCODING)}\n${encryptedData}`
    },
    /**
     * @param {string} bundleText
     * @param {string} password
     * @returns {string}
     */
    decode(bundleText, password){
        const [ivString, saltString, encrypted] = bundleText.split("\n")
        const iv = Buffer.from(ivString, OUTPUT_ENCODING)
        const salt = Buffer.from(saltString, OUTPUT_ENCODING)
        const decipher = crypto.createDecipheriv("aes-256-ctr", this.hashPass(password, salt), iv)
        let decryptedData = decipher.update(encrypted, OUTPUT_ENCODING, 'utf8')
        decryptedData += decipher.final('utf8')
        return decryptedData
    },
    /**
     * @param {string} utf8String
     * @param {Buffer16} salt
     * @return {Buffer} Buffer
     */
    hashPass(utf8String, salt){
        if (!salt) throw new Error("no salt")
        const hashedBuffer = crypto.scryptSync(utf8String, salt, 32, {
            cost: Math.pow(2, 14)
        })
        return hashedBuffer
    }
}