import {
  HttpStatus,
  IGoogleOAuthUrlResponse,
  IGoogleOAuthUserInfoResponse,
  UserAuthFlow,
} from "@project-boilerplate/shared";
import { Request, Response } from "express";
import { controller, httpGet, httpPost, interfaces, request, requestBody, response } from "inversify-express-utils";

import { appEnv } from "../../config/env";
import { InternalServerError } from "../../errors/InternalServerError";
import { TS } from "../../libs/translation.helper";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { DTOValidatorMiddleware } from "../../middlewares/validator.middleware";
import { IRequestCustom } from "../../types/express.types";
import { IUser, User } from "../user/user.model";
import { AuthLoginDTO, AuthRefreshTokenDTO, AuthSignUpDTO } from "./auth.dto";
import { AuthService } from "./auth.service";
import { IAuthRefreshTokenResponse, IAuthResponse } from "./auth.types";

//! Reference:
//! Cloud setup: https://medium.com/the-dev-caf%C3%A9/log-in-with-google-oauth-2-0-node-js-and-passport-js-1f8abe096175 (ignore the passport part)
//! Logic: https://medium.com/@tomanagle/google-oauth-with-node-js-4bff90180fe6
@controller("/auth")
export class AuthController implements interfaces.Controller {

  constructor(private authService: AuthService) { }

  // GOOGLE FLOW ========================================

  @httpGet("/google/url")
  public async generateGoogleOAuthUrl(
    req: Request,
    res: Response
  ): Promise<Response<IGoogleOAuthUrlResponse>> {
    const googleOAuthUrl = await this.authService.generateGoogleOAuthUrl();
    return res.status(200).send({
      googleOAuthUrl,
    });
  }

  @httpGet("/google/redirect")
  public async googleOAuthRedirect(
    req: Request,
    res: Response
  ): Promise<any> {
    const { code, scope } = req.query;

    const googleUserInfo: IGoogleOAuthUserInfoResponse = await this.authService.getGoogleUser(
      String(code)
    );

    // Check if this user was registered using a Basic auth flow (instead of Google OAuth)
    const user = await User.findOne({ email: googleUserInfo.email });

    if (user && user.authFlow === UserAuthFlow.Basic) { // on this case it's google only oauth method...
      return res.redirect(`${appEnv.general.APP_URL}/auth?errorType=auth&&errorMessage=accountAuthFlowMismatch`);
    }

    const {
      accessToken,
      refreshToken,
    } = await this.authService.googleOAuthSync(googleUserInfo);

    // redirect to our APP with a provided accessToken ( so he can fetch his user info )
    return res.redirect(`${appEnv.general.APP_URL}/auth?&accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }

  // JWT FLOW ========================================

  @httpPost("/signup", DTOValidatorMiddleware(AuthSignUpDTO))
  public async signUp(@requestBody() authSignUpDTO, @request() req, @response() res): Promise<IUser> {

    const newUser = await this.authService.signUp(authSignUpDTO);

    return res.status(HttpStatus.Created).send(newUser);
  }

  @httpPost("/login", DTOValidatorMiddleware(AuthLoginDTO))
  public async login(@requestBody() authLoginDTO): Promise<IAuthResponse> {
    const { accessToken, refreshToken } = await this.authService.login(
      authLoginDTO
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @httpPost("/logout", DTOValidatorMiddleware(AuthRefreshTokenDTO), AuthMiddleware)
  public async logout(
    @requestBody() authRefreshTokenDTO,
    req: IRequestCustom,
    res: Response
  ): Promise<any> {
    const { refreshToken } = authRefreshTokenDTO;

    const user = req.user!;

    this.authService.logout(user, refreshToken);

    return res.status(HttpStatus.OK).send();
  }

  @httpPost("/refresh-token", DTOValidatorMiddleware(AuthRefreshTokenDTO), AuthMiddleware)
  public async refreshToken(
    req: IRequestCustom,
    res
  ): Promise<IAuthRefreshTokenResponse> {
    // These variables will always be defined, since we have the DTO validation that happens before the code below.
    const refreshToken = req.body.refreshToken!;
    const user = req.user!;

    const accessToken = await this.authService.refreshToken(user, refreshToken);

    if (!accessToken) {
      throw new InternalServerError(
        TS.translate("auth", "oauthAccessTokenError")
      );
    }


    return res.status(HttpStatus.OK).send({
      accessToken,
    });
  }
}
