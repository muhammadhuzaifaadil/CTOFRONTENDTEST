import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
countries.registerLocale(enLocale);

export interface CountryInfo {
  name: string;
  code: string;
  phoneCode: string;
  flag: string;
}

// Dial codes (simplified reference)
import allDialCodes from "libphonenumber-js/metadata.min.json";

export const getAllCountries = (): CountryInfo[] => {
  const entries = Object.entries(allDialCodes.countries);

  return entries.map(([code, data]) => {
    const name = countries.getName(code, "en") || code;
    const phoneCode = `+${data[0]}`;
    const flag = String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 - 65 + c.charCodeAt(0)));
    return { name, code, phoneCode, flag };
  });
};
