# Waves helper

Simplification techniques for working with waves blockchain

## Installing:

You need to install [node.js](http://nodejs.org) first. Once you have it, install `сhatex` with command:

    npm install waves-helper

This will install application globally so that it may be run from the command line.

## Usage:
```
import { WavesHelper } from "waves-helper"

const WH = new WavesHelper()

setTimeout(() => {
    console.log(WH.getRate("EGG"))
}, 5000)

```

### Available methods:
 
| Method name 	            | Method description         	                        |
|--------------------------	|------------------------------------------------------	|
| getCurrenciesInformation 	| Getting information by platformId or AssetId         	|
| convertAmount            	| Converts a number between blockchain format and code 	|
| getRate                  	| Getting an approximate dollar rate                   	|
| getRateToRate            	| Getting rate to rate                                 	| 

## License

[MIT license](LICENSE)
