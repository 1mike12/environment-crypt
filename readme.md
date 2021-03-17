## About
Instead of having a list of 50 different secret environment variables that must be copied between different developers and production, this module allows you to check these values into version control, then lock all your secrets away with one key. You can encrypt your variables and have a different copy for each environment. This module uses AES-256-ctr under the hood and the built in crypto library. I took inspiration from https://github.com/kunalpanchal/secure-env but found problems with the CLI at the time as well as the inability to have JSON format. 

## quick start
create a json file with values to encrypt
```json
//dev.json
{"key1":  "value1"}
```
create an encrypted copy of the json with the cli
```
//will generate a file at path/dev.json.enc
npx environment-crypt --decrypted "path/dev.json" 
```
somewhere in your sever
```js
process.env.NODE_ENV = "dev"
const env = require("environment-crypt")
env.loadJSON(`./env/${process.env.NODE_ENV}.json.enc`, process.env.MY_SECURE_ENV_PASSWORD)
//process.env now has key1 set to value1
```

## cli
example encryption
`$ npx environment-crypt --raw env/dev.json --password mypass`

example decryption
`$ npx environment-crypt --encrypted env/dev.json.enc --password mypass`

| option      | decryption mode                                                                                                                                                                                         | encryption mode                                                                                                               |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| --noclean   | n/a                                                                                                                                                                                                     | optional. By default encryption will delete the unencrypted raw source file. This flag tells the cli to leave the source file |
| --decrypt   | optional tells the cli to run in decryption mode                                                                                                                                                        | leave blank                                                                                                                   |
| --raw       | optional. path to output decrypted file. If the encypted file ends in `.enc` then defaults to same path with `.enc` removed, otherwise will use same path and will append `.dec` to the end of fileName | required. path to unecrypted env file                                                                                         |
| --encrypted | required. path to encrypted env file                                                                                                                                                                    | optional. Path and filename you want the encrypted file to be. Defaults to unecrypted fileName with ".enc" appended           |
| --password  | required                                                                                                                                                                                                | required                                                                                                                      |

