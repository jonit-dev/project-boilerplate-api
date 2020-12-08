import { TranslationTypes } from "@little-sentinel/shared";

import { appEnv } from "../config/env";

interface IInterpolationObjs {
  [key: string]: string;
}

export class TS {
  public static translate(
    context: TranslationTypes,
    key: string,
    interpolationObjs?: IInterpolationObjs
  ): string {
    const envLang = appEnv.general.LANGUAGE!;

    const jsonFile = require(`../../node_modules/@little-sentinel/shared/src/translations/${context}.lang.json`);

    let translatedString: string;

    try {
      translatedString = jsonFile[key][envLang];
    } catch (error) {
      translatedString = "TRANSLATION_KEY_NOT_FOUND";
    }

    if (interpolationObjs) {
      for (const key of Object.keys(interpolationObjs)) {
        translatedString = translatedString.replace(
          `{{${key}}}`,
          interpolationObjs[key]
        );
      }
    }

    return translatedString;
  }
}
