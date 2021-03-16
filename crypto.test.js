const crypto = require("./crypto")
const c = require("crypto")
describe("crypto", ()=>{
    it("should hash passwords to fixed length", ()=>{
        const salt = c.randomBytes(16)
        const hashed = crypto.hashPass("uh oh stinky", salt)
        expect(hashed.length).equal(32)
    })

    it ("should hash passwords", ()=> {
        const salt = c.randomBytes(16)
        const hash1 = crypto.hashPass("pop", salt)
        const hash2 = crypto.hashPass("poop", salt)
        expect(hash1).to.not.equal(hash2)
    })

    it("should encrypt and decrypt text", ()=> {
        const raw = JSON.stringify({
            key1: "value1",
            key2: "value2"
        })
        const password = "mypass"
        const encrypted = crypto.encode(raw, password)
        const decoded = crypto.decode(encrypted, password)
        expect(decoded).equal(raw)
    })

    it("should decode wrong", ()=> {
        const encrypted = crypto.encode("uh oh stinky", "passwordpassword")
        let decrypted = crypto.decode(encrypted, "wrong pass")
        expect(decrypted).to.not.equal("uh oh stinky")
    })
})