import { appEnv } from "../config/env";
import { IServerBootstrapVars } from "../types/express.types";
import { ConsoleHelper } from "./console.helper";
import { TS } from "./translation.helper";


export class ServerHelper {

  public static showBootstrapMessage(config: IServerBootstrapVars): void {
    const {
      port,
      appName,
      language,
      timezone,
      adminEmail,
      phoneLocale,
    } = config;

    const consoleHelper = new ConsoleHelper();

    let terminalColor;
    switch (appEnv.general.ENV) {
      case "Development":
        terminalColor = "YELLOW";
        break;
      case "Production":
        terminalColor = "RED";
        break;
      default:
        terminalColor = "BLUE";
        break;
    }

    consoleHelper.coloredLog(
      `🤖: ${TS.translate("global", "serverRunning", {
        env: appEnv.general.ENV!,
        port: String(port),
        language,
        timezone,
        adminEmail
      })}`,
      terminalColor
    );
  }
}
