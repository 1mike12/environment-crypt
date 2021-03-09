## quick start
create a json file with values to encrypt
```json
{"key1":  "value1"}
```
create an encrypted copy of the json with the cli

```
npx secure-env-json --decrypted "mypath"
```
```js
process.env.NODE_ENV = "dev"
const env = require("secure-env-json")
env.loadJSON(`./env/${process.env.NODE_ENV}.json`, process.env.MY_SECURE_ENV_PASSWORD)
//process.env now has key1 set to value1
```

## advanced 