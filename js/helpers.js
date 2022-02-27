"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
class Helpers {
    static toCurrencyVDN(value) {
        return value.toLocaleString("vi", { style: "currency", currency: "VND" });
    }
}
exports.Helpers = Helpers;
