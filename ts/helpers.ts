export class Helpers {
    public static toCurrencyVDN(value: number): string {
        return value.toLocaleString("vi", { style: "currency", currency: "VND" });
    }
}
