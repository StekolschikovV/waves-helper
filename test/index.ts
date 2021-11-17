import {WavesHelper} from "../lib/index"

const WH = new WavesHelper()

setTimeout(() => {
    console.log(WH.getRate("EGG"))
}, 5000)
