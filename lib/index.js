"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WavesHelper = void 0;
var axios_1 = __importDefault(require("axios"));
var interface_1 = require("./interface");
var const_1 = require("./const");
var WavesHelper = /** @class */ (function () {
    function WavesHelper() {
        this.isInit = false;
        this.currencies = [];
        this.rate = [];
        this.init();
    }
    WavesHelper.prototype.init = function () {
        if (!this.isInit) {
            this.isInit = true;
            this.loadCurrencies();
            this.loadRate();
        }
    };
    /**
     * Loading information about currencies
     */
    WavesHelper.prototype.loadCurrencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, axios_1.default.get(const_1.URL_CURRENCIES)];
                    case 1:
                        _a.currencies = (_b.sent()).data.items.map(function (c) {
                            c.decimals = +(c.decimals + "")[(c.decimals + "").length - 1];
                            return c;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Loading information about rate
     */
    WavesHelper.prototype.loadRate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(const_1.URL_RATE)];
                    case 1:
                        data = (_a.sent()).data.data;
                        this.rate = Object.keys(data).map(function (rateIndex) {
                            return data[rateIndex];
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Getting information by platformId or AssetId
     */
    WavesHelper.prototype.getCurrencies = function (platformIdOrAssetId) {
        var result = null;
        this.currencies.forEach(function (c) {
            if ((platformIdOrAssetId === c.id || platformIdOrAssetId === c.waves_asset_id) && result === null)
                result = c;
        });
        return result;
    };
    /**
     * Converts a number between blockchain format and code
     */
    WavesHelper.prototype.convertAmount = function (fromFormat, toFormat, platformIdOrAssetId, amount) {
        if (fromFormat === toFormat)
            return null;
        var assetInfo = this.getCurrencies(platformIdOrAssetId);
        var result = null;
        if (assetInfo && fromFormat === interface_1.EConvertFormat.blockchain)
            result = amount / (+("1" + "0".repeat(assetInfo.decimals)));
        else if (assetInfo)
            result = amount * (+("1" + "0".repeat(assetInfo.decimals)));
        return result;
    };
    /**
     * Getting an approximate dollar rate
     */
    WavesHelper.prototype.getRate = function (platformIdOrAssetId) {
        var currency = this.getCurrencies(platformIdOrAssetId);
        var currencyUSDN = this.getCurrencies("USDN");
        if (currency === null || currencyUSDN === null)
            return null;
        var resultRate = this.rate.filter(function (r) {
            return (r.A_asset_id === currency.waves_asset_id || r.A_asset_id === currency.id)
                && r.B_asset_id === currencyUSDN.waves_asset_id;
        });
        if (resultRate.length !== 1)
            return null;
        var result = resultRate[0];
        return (parseFloat(result.B_asset_balance) / 100) / (parseFloat(result.A_asset_balance) / 1000000) / 100;
    };
    /**
     * Getting rate to rate
     */
    WavesHelper.prototype.getRateToRate = function (platformIdOrAssetIdOne, platformIdOrAssetIdTow) {
        var rateOne = this.getRate(platformIdOrAssetIdOne);
        var rateTow = this.getRate(platformIdOrAssetIdTow);
        if (rateOne === null || rateTow === null)
            return null;
        return rateOne / rateTow;
    };
    return WavesHelper;
}());
exports.WavesHelper = WavesHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMEI7QUFDMUIseUNBQTJFO0FBQzNFLGlDQUFpRDtBQUVqRDtJQU1JO1FBSlEsV0FBTSxHQUFHLEtBQUssQ0FBQTtRQUNkLGVBQVUsR0FBZ0IsRUFBRSxDQUFBO1FBQzVCLFNBQUksR0FBWSxFQUFFLENBQUE7UUFHdEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVPLDBCQUFJLEdBQVo7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1lBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtZQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7U0FDbEI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDVyxvQ0FBYyxHQUE1Qjs7Ozs7O3dCQUNJLEtBQUEsSUFBSSxDQUFBO3dCQUFlLHFCQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsc0JBQWMsQ0FBQyxFQUFBOzt3QkFBbEQsR0FBSyxVQUFVLEdBQUcsQ0FBQyxTQUErQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFZOzRCQUM1RSxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7NEJBQzdELE9BQU8sQ0FBQyxDQUFBO3dCQUNaLENBQUMsQ0FBQyxDQUFBOzs7OztLQUNMO0lBRUQ7O09BRUc7SUFDVyw4QkFBUSxHQUF0Qjs7Ozs7NEJBQ29CLHFCQUFNLGVBQUssQ0FBQyxHQUFH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