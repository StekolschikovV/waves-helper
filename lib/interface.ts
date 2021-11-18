export enum EConvertFormat {
    "blockchain" = "blockchain",
    "code" = "code"
}

export interface ICurrency {
    allowed_amount: {
        max: number
        min: number
    }
    decimals: number
    fees: {
        flat: number
        rate: number
    }
    id: string
    platform_id: string
    status: string
    type: string
    waves_asset_id: string
}

export interface IRate {
    A_asset_balance: string
    A_asset_id: string
    A_asset_init: string
    B_asset_balance: string
    B_asset_id: string
    B_asset_init: string
    active: boolean
    commission: number
    commission_scale_delimiter: number
    first_harvest_height: number
    govFees7d: string
    govFees24: string
    id: string
    lpFees7d: string
    lpFees24: string
    share_asset_id: string
    share_asset_supply: string
    share_limit_on_first_harvest: string
    stakingIncome7d: string
    stakingIncome24: string
    totalLiquidity: string
    txCount7d: string
    txCount24: string
    version: string
    volume7d: string
    volume24: string
    volume_current_period: string
}

export interface IWavesHelper {
    getCurrencies(platformIdOrAssetId: string): ICurrency | null
    convertAmount(fromFormat: EConvertFormat, toFormat: EConvertFormat, platformIdOrAssetId: string, amount: number): null | number
    getRate(platformIdOrAssetId: string): null | number
    getRateToRate(platformIdOrAssetIdOne: string, platformIdOrAssetIdTow: string): null | number
}
