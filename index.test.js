const index = require("./index")

describe("index", ()=> {

    it("should encode and decode a file", ()=> {
        index.encodeSync("./test_files/test.json", "./tmp/test.json.enc", "mypassword")
        let decodedJSON = index.decodeSync("./tmp/test.json.enc", "mypassword")
        expect(require("./test_files/test.json")).to.deep.equal(JSON.parse(decodedJSON))

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
        const key = "biglongasskey§"
        expect(process.env[key]).equal(undefined)
        index.loadJSON("./test_files/loadJSON.json.enc", "mypassword", true)
        expect(process.env[key]).equal("value1")
    })
})