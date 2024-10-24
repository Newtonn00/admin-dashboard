interface Currency{

    isoCode: string;
    numericCode: number;
    name: string;
    symbol: string;

}


export const currencies: { [key: string]: Currency } = {
    ISOCodeBOV: { isoCode: "BOV", numericCode: 984, name: "Mvdol", symbol: "" },
    ISOCodeCHE: { isoCode: "CHE", numericCode: 947, name: "WIR Euro", symbol: "" },
    ISOCodeCHW: { isoCode: "CHW", numericCode: 948, name: "WIR Franc", symbol: "" },
    ISOCodeCLF: { isoCode: "CLF", numericCode: 990, name: "Unidad de Fomento", symbol: "" },
    ISOCodeCOU: { isoCode: "COU", numericCode: 970, name: "Unidad de Valor Real", symbol: "" },
    ISOCodeCUC: { isoCode: "CUC", numericCode: 931, name: "Peso Convertible", symbol: "" },
    ISOCodeMXV: { isoCode: "MXV", numericCode: 979, name: "Mexican Unidad de Inversion (UDI)", symbol: "" },
    ISOCodeSVC: { isoCode: "SVC", numericCode: 222, name: "El Salvador Colon", symbol: "" },
    ISOCodeUSN: { isoCode: "USN", numericCode: 997, name: "US Dollar (Next day)", symbol: "" },
    ISOCodeUYI: { isoCode: "UYI", numericCode: 940, name: "Uruguay Peso en Unidades Indexadas (UI)", symbol: "" },
    ISOCodeUYW: { isoCode: "UYW", numericCode: 927, name: "Unidad Previsional", symbol: "" },
    ISOCodeCLP: { isoCode: "CLP", numericCode: 152, name: "Chilean Peso", symbol: "$" },
    ISOCodeUSD: { isoCode: "USD", numericCode: 840, name: "US Dollar", symbol: "$" },
    ISOCodeEUR: { isoCode: "EUR", numericCode: 978, name: "Euro", symbol: "€" },
    ISOCodeAED: { isoCode: "AED", numericCode: 784, name: "UAE Dirham", symbol: "د.إ" },
    ISOCodeAFN: { isoCode: "AFN", numericCode: 971, name: "Afghani", symbol: "؋" },
    ISOCodeALL: { isoCode: "ALL", numericCode: 8, name: "Lek", symbol: "L" },
    ISOCodeAMD: { isoCode: "AMD", numericCode: 51, name: "Armenian Dram", symbol: "֏" },
    ISOCodeANG: { isoCode: "ANG", numericCode: 532, name: "Netherlands Antillean Guilder", symbol: "ƒ" },
    ISOCodeAOA: { isoCode: "AOA", numericCode: 973, name: "Kwanza", symbol: "Kz" },
    ISOCodeARS: { isoCode: "ARS", numericCode: 32, name: "Argentine Peso", symbol: "$" },
    ISOCodeAUD: { isoCode: "AUD", numericCode: 36, name: "Australian Dollar", symbol: "$" },
    ISOCodeAWG: { isoCode: "AWG", numericCode: 533, name: "Aruban Florin", symbol: "ƒ" },
    ISOCodeAZN: { isoCode: "AZN", numericCode: 944, name: "Azerbaijan Manat", symbol: "₼" },
    ISOCodeBAM: { isoCode: "BAM", numericCode: 977, name: "Convertible Mark", symbol: "KM" },
    ISOCodeBBD: { isoCode: "BBD", numericCode: 52, name: "Barbados Dollar", symbol: "$" },
    ISOCodeBDT: { isoCode: "BDT", numericCode: 50, name: "Taka", symbol: "৳" },
    ISOCodeBGN: { isoCode: "BGN", numericCode: 975, name: "Bulgarian Lev", symbol: "лв." },
    ISOCodeBHD: { isoCode: "BHD", numericCode: 48, name: "Bahraini Dinar", symbol: ".د.ب" },
    ISOCodeBIF: { isoCode: "BIF", numericCode: 108, name: "Burundi Franc", symbol: "Fr" },
    ISOCodeBMD: { isoCode: "BMD", numericCode: 60, name: "Bermudian Dollar", symbol: "$" },
    ISOCodeBND: { isoCode: "BND", numericCode: 96, name: "Brunei Dollar", symbol: "$" },
    ISOCodeBOB: { isoCode: "BOB", numericCode: 68, name: "Boliviano", symbol: "Bs." },
    ISOCodeBRL: { isoCode: "BRL", numericCode: 986, name: "Brazilian Real", symbol: "R$" },
    ISOCodeBSD: { isoCode: "BSD", numericCode: 44, name: "Bahamian Dollar", symbol: "$" },
    ISOCodeBTN: { isoCode: "BTN", numericCode: 64, name: "Ngultrum", symbol: "Nu." },
    ISOCodeBWP: { isoCode: "BWP", numericCode: 72, name: "Pula", symbol: "P" },
    ISOCodeBYN: { isoCode: "BYN", numericCode: 933, name: "Belarusian Ruble", symbol: "Br" },
    ISOCodeBZD: { isoCode: "BZD", numericCode: 84, name: "Belize Dollar", symbol: "$" },
    ISOCodeCAD: { isoCode: "CAD", numericCode: 124, name: "Canadian Dollar", symbol: "$" },
    ISOCodeCDF: { isoCode: "CDF", numericCode: 976, name: "Congolese Franc", symbol: "Fr" },
    ISOCodeCHF: { isoCode: "CHF", numericCode: 756, name: "Swiss Franc", symbol: "Fr." },
    ISOCodeCNY: { isoCode: "CNY", numericCode: 156, name: "Yuan Renminbi", symbol: "¥" },
    ISOCodeCOP: { isoCode: "COP", numericCode: 170, name: "Colombian Peso", symbol: "$" },
    ISOCodeCRC: { isoCode: "CRC", numericCode: 188, name: "Costa Rican Colon", symbol: "₡" },
    ISOCodeCUP: { isoCode: "CUP", numericCode: 192, name: "Cuban Peso", symbol: "$" },
    ISOCodeCVE: { isoCode: "CVE", numericCode: 132, name: "Cabo Verde Escudo", symbol: "$" },
    ISOCodeCZK: { isoCode: "CZK", numericCode: 203, name: "Czech Koruna", symbol: "Kč" },
    ISOCodeDJF: { isoCode: "DJF", numericCode: 262, name: "Djibouti Franc", symbol: "Fr" },
    ISOCodeDKK: { isoCode: "DKK", numericCode: 208, name: "Danish Krone", symbol: "kr" },
    ISOCodeDOP: { isoCode: "DOP", numericCode: 214, name: "Dominican Peso", symbol: "RD$" },
    ISOCodeDZD: { isoCode: "DZD", numericCode: 12, name: "Algerian Dinar", symbol: "د.ج" },
    ISOCodeEGP: { isoCode: "EGP", numericCode: 818, name: "Egyptian Pound", symbol: "£" },
    ISOCodeERN: { isoCode: "ERN", numericCode: 232, name: "Nakfa", symbol: "Nfk" },
    ISOCodeETB: { isoCode: "ETB", numericCode: 230, name: "Ethiopian Birr", symbol: "Br" },
    ISOCodeFJD: { isoCode: "FJD", numericCode: 242, name: "Fiji Dollar", symbol: "$" },
    ISOCodeFKP: { isoCode: "FKP", numericCode: 238, name: "Falkland Islands Pound", symbol: "£" },
    ISOCodeGBP: { isoCode: "GBP", numericCode: 826, name: "Pound Sterling", symbol: "£" },
    ISOCodeGEL: { isoCode: "GEL", numericCode: 981, name: "Lari", symbol: "₾" },
    ISOCodeGHS: { isoCode: "GHS", numericCode: 936, name: "Ghana Cedi", symbol: "₵" },
    ISOCodeGIP: { isoCode: "GIP", numericCode: 292, name: "Gibraltar Pound", symbol: "£" },
    ISOCodeGMD: { isoCode: "GMD", numericCode: 270, name: "Dalasi", symbol: "D" },
    ISOCodeGNF: { isoCode: "GNF", numericCode: 324, name: "Guinean Franc", symbol: "Fr" },
    ISOCodeGTQ: { isoCode: "GTQ", numericCode: 320, name: "Quetzal", symbol: "Q" },
    ISOCodeGYD: { isoCode: "GYD", numericCode: 328, name: "Guyana Dollar", symbol: "$" },
    ISOCodeHKD: { isoCode: "HKD", numericCode: 344, name: "Hong Kong Dollar", symbol: "$" },
    ISOCodeHNL: { isoCode: "HNL", numericCode: 340, name: "Lempira", symbol: "L" },
    ISOCodeHRK: { isoCode: "HRK", numericCode: 191, name: "Kuna", symbol: "kn" },
    ISOCodeHTG: { isoCode: "HTG", numericCode: 332, name: "Gourde", symbol: "G" },
    ISOCodeHUF: { isoCode: "HUF", numericCode: 348, name: "Forint", symbol: "Ft" },
    ISOCodeIDR: { isoCode: "IDR", numericCode: 360, name: "Rupiah", symbol: "Rp" },
    ISOCodeILS: { isoCode: "ILS", numericCode: 376, name: "New Israeli Sheqel", symbol: "₪" },
    ISOCodeINR: { isoCode: "INR", numericCode: 356, name: "Indian Rupee", symbol: "₹" },
    ISOCodeIQD: { isoCode: "IQD", numericCode: 368, name: "Iraqi Dinar", symbol: "ع.د" },
    ISOCodeIRR: { isoCode: "IRR", numericCode: 364, name: "Iranian Rial", symbol: "﷼" },
    ISOCodeISK: { isoCode: "ISK", numericCode: 352, name: "Iceland Krona", symbol: "kr" },
    ISOCodeJMD: { isoCode: "JMD", numericCode: 388, name: "Jamaican Dollar", symbol: "$" },
    ISOCodeJOD: { isoCode: "JOD", numericCode: 400, name: "Jordanian Dinar", symbol: "د.ا" },
    ISOCodeJPY: { isoCode: "JPY", numericCode: 392, name: "Yen", symbol: "¥" },
    ISOCodeKES: { isoCode: "KES", numericCode: 404, name: "Kenyan Shilling", symbol: "Sh" },
    ISOCodeKGS: { isoCode: "KGS", numericCode: 417, name: "Som", symbol: "с" },
    ISOCodeKHR: { isoCode: "KHR", numericCode: 116, name: "Riel", symbol: "៛" },
    ISOCodeKMF: { isoCode: "KMF", numericCode: 174, name: "Comorian Franc", symbol: "Fr" },
    ISOCodeKPW: { isoCode: "KPW", numericCode: 408, name: "North Korean Won", symbol: "₩" },
    ISOCodeKRW: { isoCode: "KRW", numericCode: 410, name: "Won", symbol: "₩" },
    ISOCodeKWD: { isoCode: "KWD", numericCode: 414, name: "Kuwaiti Dinar", symbol: "د.ك" },
    ISOCodeKYD: { isoCode: "KYD", numericCode: 136, name: "Cayman Islands Dollar", symbol: "$" },
    ISOCodeKZT: { isoCode: "KZT", numericCode: 398, name: "Tenge", symbol: "₸" },
    ISOCodeLAK: { isoCode: "LAK", numericCode: 418, name: "Lao Kip", symbol: "₭" },
    ISOCodeLBP: { isoCode: "LBP", numericCode: 422, name: "Lebanese Pound", symbol: "ل.ل" },
    ISOCodeLKR: { isoCode: "LKR", numericCode: 144, name: "Sri Lanka Rupee", symbol: "Rs" },
    ISOCodeLRD: { isoCode: "LRD", numericCode: 430, name: "Liberian Dollar", symbol: "$" },
    ISOCodeLSL: { isoCode: "LSL", numericCode: 426, name: "Loti", symbol: "L" },
    ISOCodeLYD: { isoCode: "LYD", numericCode: 434, name: "Libyan Dinar", symbol: "ل.د" },
    ISOCodeMAD: { isoCode: "MAD", numericCode: 504, name: "Moroccan Dirham", symbol: "د.م." },
    ISOCodeMDL: { isoCode: "MDL", numericCode: 498, name: "Moldovan Leu", symbol: "L" },
    ISOCodeMGA: { isoCode: "MGA", numericCode: 969, name: "Malagasy Ariary", symbol: "Ar" },
    ISOCodeMKD: { isoCode: "MKD", numericCode: 807, name: "Denar", symbol: "ден" },
    ISOCodeMMK: { isoCode: "MMK", numericCode: 104, name: "Kyat", symbol: "Ks" },
    ISOCodeMNT: { isoCode: "MNT", numericCode: 496, name: "Tugrik", symbol: "₮" },
    ISOCodeMOP: { isoCode: "MOP", numericCode: 446, name: "Pataca", symbol: "MOP$" },
    ISOCodeMRU: { isoCode: "MRU", numericCode: 929, name: "Ouguiya", symbol: "UM" },
    ISOCodeMUR: { isoCode: "MUR", numericCode: 480, name: "Mauritius Rupee", symbol: "₨" },
    ISOCodeMVR: { isoCode: "MVR", numericCode: 462, name: "Rufiyaa", symbol: ".ރ" },
    ISOCodeMWK: { isoCode: "MWK", numericCode: 454, name: "Malawi Kwacha", symbol: "MK" },
    ISOCodeMXN: { isoCode: "MXN", numericCode: 484, name: "Mexican Peso", symbol: "$" },
    ISOCodeMYR: { isoCode: "MYR", numericCode: 458, name: "Malaysian Ringgit", symbol: "RM" },
    ISOCodeMZN: { isoCode: "MZN", numericCode: 943, name: "Mozambique Metical", symbol: "MT" },
    ISOCodeNAD: { isoCode: "NAD", numericCode: 516, name: "Namibia Dollar", symbol: "$" },
    ISOCodeNGN: { isoCode: "NGN", numericCode: 566, name: "Naira", symbol: "₦" },
    ISOCodeNIO: { isoCode: "NIO", numericCode: 558, name: "Cordoba Oro", symbol: "C$" },
    ISOCodeNOK: { isoCode: "NOK", numericCode: 578, name: "Norwegian Krone", symbol: "kr" },
    ISOCodeNPR: { isoCode: "NPR", numericCode: 524, name: "Nepalese Rupee", symbol: "रू" },
    ISOCodeNZD: { isoCode: "NZD", numericCode: 554, name: "New Zealand Dollar", symbol: "$" },
    ISOCodeOMR: { isoCode: "OMR", numericCode: 512, name: "Rial Omani", symbol: "ر.ع." },
    ISOCodePAB: { isoCode: "PAB", numericCode: 590, name: "Balboa", symbol: "B/." },
    ISOCodePEN: { isoCode: "PEN", numericCode: 604, name: "Sol", symbol: "S/." },
    ISOCodePGK: { isoCode: "PGK", numericCode: 598, name: "Kina", symbol: "K" },
    ISOCodePHP: { isoCode: "PHP", numericCode: 608, name: "Philippine Peso", symbol: "₱" },
    ISOCodePKR: { isoCode: "PKR", numericCode: 586, name: "Pakistan Rupee", symbol: "₨" },
    ISOCodePLN: { isoCode: "PLN", numericCode: 985, name: "Zloty", symbol: "zł" },
    ISOCodePYG: { isoCode: "PYG", numericCode: 600, name: "Guarani", symbol: "₲" },
    ISOCodeQAR: { isoCode: "QAR", numericCode: 634, name: "Qatari Rial", symbol: "ر.ق" },
    ISOCodeRON: { isoCode: "RON", numericCode: 946, name: "Romanian Leu", symbol: "lei" },
    ISOCodeRSD: { isoCode: "RSD", numericCode: 941, name: "Serbian Dinar", symbol: "дин." },
    ISOCodeRUB: { isoCode: "RUB", numericCode: 643, name: "Russian Ruble", symbol: "₽" },
    ISOCodeRWF: { isoCode: "RWF", numericCode: 646, name: "Rwanda Franc", symbol: "Fr" },
    ISOCodeSAR: { isoCode: "SAR", numericCode: 682, name: "Saudi Riyal", symbol: "﷼" },
    ISOCodeSBD: { isoCode: "SBD", numericCode: 90, name: "Solomon Islands Dollar", symbol: "$" },
    ISOCodeSCR: { isoCode: "SCR", numericCode: 690, name: "Seychelles Rupee", symbol: "₨" },
    ISOCodeSDG: { isoCode: "SDG", numericCode: 938, name: "Sudanese Pound", symbol: "ج.س." },
    ISOCodeSEK: { isoCode: "SEK", numericCode: 752, name: "Swedish Krona", symbol: "kr" },
    ISOCodeSGD: { isoCode: "SGD", numericCode: 702, name: "Singapore Dollar", symbol: "$" },
    ISOCodeSHP: { isoCode: "SHP", numericCode: 654, name: "Saint Helena Pound", symbol: "£" },
    ISOCodeSLL: { isoCode: "SLL", numericCode: 694, name: "Leone", symbol: "Le" },
    ISOCodeSOS: { isoCode: "SOS", numericCode: 706, name: "Somali Shilling", symbol: "Sh" },
    ISOCodeSRD: { isoCode: "SRD", numericCode: 968, name: "Surinam Dollar", symbol: "$" },
    ISOCodeSSP: { isoCode: "SSP", numericCode: 728, name: "South Sudanese Pound", symbol: "£" },
    ISOCodeSTN: { isoCode: "STN", numericCode: 930, name: "Dobra", symbol: "Db" },
    ISOCodeSYP: { isoCode: "SYP", numericCode: 760, name: "Syrian Pound", symbol: "£" },
    ISOCodeSZL: { isoCode: "SZL", numericCode: 748, name: "Lilangeni", symbol: "L" },
    ISOCodeTHB: { isoCode: "THB", numericCode: 764, name: "Baht", symbol: "฿" },
    ISOCodeTJS: { isoCode: "TJS", numericCode: 972, name: "Somoni", symbol: "с." },
    ISOCodeTMT: { isoCode: "TMT", numericCode: 934, name: "Turkmenistan New Manat", symbol: "m." },
    ISOCodeTND: { isoCode: "TND", numericCode: 788, name: "Tunisian Dinar", symbol: "د.ت" },
    ISOCodeTOP: { isoCode: "TOP", numericCode: 776, name: "Pa'anga", symbol: "T$" },
    ISOCodeTRY: { isoCode: "TRY", numericCode: 949, name: "Turkish Lira", symbol: "₺" },
    ISOCodeTTD: { isoCode: "TTD", numericCode: 780, name: "Trinidad and Tobago Dollar", symbol: "$" },
    ISOCodeTWD: { isoCode: "TWD", numericCode: 901, name: "New Taiwan Dollar", symbol: "$" },
    ISOCodeTZS: { isoCode: "TZS", numericCode: 834, name: "Tanzanian Shilling", symbol: "Sh" },
    ISOCodeUAH: { isoCode: "UAH", numericCode: 980, name: "Hryvnia", symbol: "₴" },
    ISOCodeUGX: { isoCode: "UGX", numericCode: 800, name: "Uganda Shilling", symbol: "Sh" },
    ISOCodeUYU: { isoCode: "UYU", numericCode: 858, name: "Peso Uruguayo", symbol: "$" },
    ISOCodeUZS: { isoCode: "UZS", numericCode: 860, name: "Uzbekistan Sum", symbol: "Sʻ" },
    ISOCodeVES: { isoCode: "VES", numericCode: 928, name: "Bolívar Soberano", symbol: "Bs." },
    ISOCodeVND: { isoCode: "VND", numericCode: 704, name: "Dong", symbol: "₫" },
    ISOCodeVUV: { isoCode: "VUV", numericCode: 548, name: "Vatu", symbol: "Vt" },
    ISOCodeWST: { isoCode: "WST", numericCode: 882, name: "Tala", symbol: "T" },
    ISOCodeXAF: { isoCode: "XAF", numericCode: 950, name: "CFA Franc BEAC", symbol: "Fr" },
    ISOCodeXCD: { isoCode: "XCD", numericCode: 951, name: "East Caribbean Dollar", symbol: "$" },
    ISOCodeXOF: { isoCode: "XOF", numericCode: 952, name: "CFA Franc BCEAO", symbol: "Fr" },
    ISOCodeXPF: { isoCode: "XPF", numericCode: 953, name: "CFP Franc", symbol: "₣" },
    ISOCodeYER: { isoCode: "YER", numericCode: 886, name: "Yemeni Rial", symbol: "﷼" },
    ISOCodeZAR: { isoCode: "ZAR", numericCode: 710, name: "Rand", symbol: "R" },
    ISOCodeZMW: { isoCode: "ZMW", numericCode: 967, name: "Zambian Kwacha", symbol: "ZK" },
    ISOCodeZWL: { isoCode: "ZWL", numericCode: 932, name: "Zimbabwe Dollar", symbol: "$" },
};

export function isCurrencyISOCodeCorrect(isoCode: string): boolean {
    if (!isoCode || isoCode === ''){
        return true;
    }  

    return Object.values(currencies).some((currency) => currency.isoCode === isoCode);
}