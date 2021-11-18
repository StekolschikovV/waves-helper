import axios from "axios";
import {EConvertFormat, ICurrency, IRate, IWavesHelper} from "./interface";
import {URL_CURRENCIES, URL_RATE} from "./const";

export class WavesHelper implements IWavesHelper{

    private isInit = false
    private currencies: ICurrency[] = []
    private rate: IRate[] = []

    constructor() {
        this.init()
    }

    private init(): void {
        if (!this.isInit) {
            this.isInit = true
            this.loadCurrencies()
            this.loadRate()
        }
    }

    /**
     * Loading information about currencies
     */
    private async loadCurrencies(): Promise<void> {
        this.currencies = (await axios.get(URL_CURRENCIES)).data.items.map((c: ICurrency) => {
            c.decimals = +(c.decimals + "")[(c.decimals + "").length - 1]
            return c
        })
    }

    /**
     * Loading information about rate
     */
    private async loadRate(): Promise<void> {
        const {data} = (await axios.get(URL_RATE)).data;
        this.rate = Object.keys(data).map((rateIndex) => {
            return data[rateIndex]
        })
    }

    /**
     * Getting information by platformId or AssetId
     */
    public getCurrencies(platformIdOrAssetId: string): ICurrency | null {
        let result: ICurrency | null = null
        this.currencies.forEach(c => {
            if ((platformIdOrAssetId === c.id || platformIdOrAssetId === c.waves_asset_id) && result === null) result = c
        })
        return result
    }

    /**
     * Converts a number between blockchain format and code
     */
    public convertAmount(fromFormat: EConvertFormat, toFormat: EConvertFormat, platformIdOrAssetId: string, amount: number): null | number {
        if (fromFormat === toFormat) return null
        const assetInfo = this.getCurrencies(platformIdOrAssetId)
        let result: null | number = null
        if (assetInfo && fromFormat === EConvertFormat.blockchain) result = amount / (+("1" + "0".repeat(assetInfo.decimals)))
        else if (assetInfo) result = amount * (+("1" + "0".repeat(assetInfo.decimals)))
        return result
    }

    /**
     * Getting an approximate dollar rate
     */
    public getRate(platformIdOrAssetId: string): null | number {
        const currency = this.getCurrencies(platformIdOrAssetId)
        const currencyUSDN = this.getCurrencies("USDN")
        if (currency === null || currencyUSDN === null) return null
        let resultRate: IRate[] = this.rate.filter(r =>
            (r.A_asset_id === currency.waves_asset_id || r.A_asset_id === currency.id)
            && r.B_asset_id === currencyUSDN.waves_asset_id)
        if (resultRate.length !== 1) return null
        let result = resultRate[0]
        return (parseFloat(result.B_asset_balance) / 100) / (parseFloat(result.A_asset_balance) / 1000000) / 100
    }

    /**
     * Getting rate to rate
     */
    public getRateToRate(platformIdOrAssetIdOne: string, platformIdOrAssetIdTow: string): null | number {
        const rateOne = this.getRate(platformIdOrAssetIdOne)
        const rateTow = this.getRate(platformIdOrAssetIdTow)
        if (rateOne === null || rateTow === null) return null
        return rateOne / rateTow
    }

}
