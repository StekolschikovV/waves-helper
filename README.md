# Waves helper

Simplification techniques for working with waves blockchain

## Installing:

You need to install [node.js](http://nodejs.org) first. Once you have it, install `сhatex` with command:

    npm install waves-helper

This will install application globally so that it may be run from the command line.

## Usage:
```
import { WavesHelper } from "waves-helper"

const WH = WavesHelper.init()

...

console.log(WH.getCurrenciesInformation("WAVES"))

```

### Available methods:

- getCurrenciesInformation
- convertAmount
- getRate
- getCourseToCourse

## License

[MIT license](LICENSE)
