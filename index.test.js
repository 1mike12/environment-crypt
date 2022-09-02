const index = require("./index")
const fs = require("fs")

describe("index", ()=> {

    it("should encode and decode a file", ()=> {
        const source = "./test_files/test.json"
        const encoded = "./test_files/test.json.enc"
        index.encodeSync(source, encoded, "mypassword")
        let decodedJSON = index.decodeSync(encoded, "mypassword")
        expect(require(source)).to.deep.equal(JSON.parse(decodedJSON))
        fs.unlinkSync(encoded)
    })

    it("should load json to environment", ()=> {
        const key = "pleasedonthavethiskeysetonyoursystem"
        expect(process.env[key]).equal(undefined)
        index.loadJSONToEnv({[key]: "value"})
        expect(process.env[key]).equal("value")
    })

    it("should throw error when overwriting existing env key", ()=>{
        process.env.dinkle = "kek"
        expect(()=> index.loadJSONToEnv({dinkle: "kek"}, false)).to.throw("cannot overwrite")
    })

    it("should load an encrypted json file to env", ()=> {
        const key = "key1"
        expect(process.env[key]).equal(undefined)
        index.loadJSON("./test_files/loadJSON.json.enc", "password", true)
        expect(process.env[key]).equal("value1")
    })
})