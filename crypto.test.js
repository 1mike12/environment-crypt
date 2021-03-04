const crypto = require("./crypto")

describe("crypto", ()=>{
    it("should hash passwords to fixed length", ()=>{
        const hashed = crypto.hashPass("uh oh stinky")
        expect(hashed.length).equal(512)
    })

    it ("should hash passwords", ()=> {
        const hash1 = crypto.hashPass("pop")
        const hash2 = crypto.hashPass("poop")
        expect(hash1).to.not.equal(hash2)
    })

    it("should encrypt and decrypt text", ()=> {
        const encrypted = crypto.encode("uh oh stinky", "mot clé")
        const decoded = crypto.decode(encrypted, "mot clé")
        expect(decoded).equal("uh oh stinky")
    })

    it("should decode wrong", ()=> {
        const encrypted = crypto.encode("uh oh stinky", "pass")
        expect(()=> crypto.decode(encrypted, "wrong pass")).to.throw("bad decrypt")
    })
})