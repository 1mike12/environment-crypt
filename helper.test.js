const helper = require("./helper")
describe("helper", ()=> {

    it("should parse to json", ()=> {
        const text = `key1=value1
        key2=value2`
        const json = helper.envToJSON(text)
        expect(json.key1).equals("value1")
        expect(json.key2).equals("value2")
    })
})