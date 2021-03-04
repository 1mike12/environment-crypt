const crypto = require('crypto')

module.exports = {
    /**
     * @param raw
     * @param password
     * @returns Buffer
     */
    encode(raw, password){
        const cipher = crypto.createCipher('aes-256-cbc', this.hashPass(password))
        let encryptedData = cipher.update(raw, 'utf8', 'hex')
        encryptedData += cipher.final('hex')
        return encryptedData
    },
    decode(encrypted, password){
        const decipher = crypto.createDecipher('aes-256-cbc', this.hashPass(password))
        let decryptedData = decipher.update(encrypted, 'hex', 'utf8')
        decryptedData += decipher.final('utf8')
        return decryptedData
    },
    hashPass(utf8String){
        const key1 = crypto.scryptSync(utf8String, "unsaltstatique§", 512, {
            cost: Math.pow(2,14)
        })
        return key1
    }
}