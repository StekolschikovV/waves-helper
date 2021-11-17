# Chatex

Wrapper for Chatex payment system methods

## Installing:

You need to install [node.js](http://nodejs.org) first. Once you have it, install `сhatex` with command:

    npm install сhatex

This will install application globally so that it may be run from the command line.

## Usage:
```
import { Chatex } from "../lib/index"
import { ResponseUnauthorizedInterface } from "../lib/interface"

const TOKEN = ""
const chatex = new Chatex(TOKEN)
const ad_id = ""
const amount = 535
const amountFinal = 629.2
const invoice_id = 0

chatex.requestForPayment({
    amount: 55
})
    .then((e) => {
        if (e.data.status === 1) {
            console.log("requestForPayment then", e.data.data)
        } else if (e.data.status === 0) {
            console.log("requestForPayment then", e.data.error)
        }
    }).catch((e: ResponseUnauthorizedInterface) => {
        console.log("requestForPayment catch", e.response.data.message)
    })
```

### Available methods:

- requestForPayment
- createPayment
- verificationOfPaymentConfirmationByTrader
- userConfirmationOfPayment
- cancellationOfPayment
- checkingPaymentStatus
- balance
- paymentHistory
- withdrawalRequest
- withdrawalCreate
- confirmationOfReceiptOfFundsFromTheUser
- cancelWithdrawal
- withdrawalCheckStatus
- withdrawalHistory

## License

[MIT license](LICENSE)
