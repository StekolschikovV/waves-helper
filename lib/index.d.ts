import { EConvertFormat, ICurrency, IWavesHelper } from "./interface";
export declare class WavesHelper implements IWavesHelper {
    private isInit;
    private currencies;
    private rate;
    constructor();
    private init;
    /**
     * Loading information about currencies
     */
    private loadCurrenciesInformation;
    /**
     * Loading information about rate
     */
    private loadRateInformation;
    /**
     * Getting information by platformId or AssetId
     */
    getCurrenciesInformation(platformIdOrAssetId: string): ICurrency | null;
    /**
     * Converts a number between blockchain format and code
     */
    convertAmount(fromFormat: EConvertFormat, toFormat: EConvertFormat, platformIdOrAssetId: string, amount: number): null | number;
    /**
     * Getting an approximate dollar rate
     */
    getRate(platformIdOrAssetId: string): null | number;
    /**
     * Getting rate to rate
     */
    getRateToRate(platformIdOrAssetIdOne: string, platformIdOrAssetIdTow: string): null | number;
}
