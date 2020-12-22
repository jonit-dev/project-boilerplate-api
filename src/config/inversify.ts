import { Container } from "inversify";

import { ConsoleHelper } from "../libs/console.helper";
import { EncryptionHelper } from "../libs/encryption.helper";
import { GoogleOAuthHelper } from "../libs/googleOauth.helper";
import { AuthController } from "../models/auth/auth.controller";
import { AuthRepository } from "../models/auth/auth.repository";
import { AuthService } from "../models/auth/auth.service";
import { EnvironmentController } from "../models/environment/environment.controller";
import { EnvironmentRepository } from "../models/environment/environment.repository";
import { EnvironmentService } from "../models/environment/environment.service";
import { InstitutionController } from "../models/institution/institution.controller";
import { InstitutionRepository } from "../models/institution/institution.repository";
import { InstitutionService } from "../models/institution/institution.service";
import { UserController } from "../models/user/user.controller";
import { UserRepository } from "../models/user/user.repository";
import { UserService } from "../models/user/user.service";

const container = new Container();

container.bind<EncryptionHelper>(EncryptionHelper).toSelf();
container.bind<ConsoleHelper>(ConsoleHelper).toSelf();
container.bind<GoogleOAuthHelper>(GoogleOAuthHelper).toSelf();
container.bind<AuthController>(AuthController).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<AuthRepository>(AuthRepository).toSelf();
container.bind<UserRepository>(UserRepository).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<UserController>(UserController).toSelf();
container.bind<InstitutionController>(InstitutionController).toSelf();
container.bind<InstitutionService>(InstitutionService).toSelf();
container.bind<InstitutionRepository>(InstitutionRepository).toSelf();
container.bind<EnvironmentController>(EnvironmentController).toSelf();
container.bind<EnvironmentService>(EnvironmentService).toSelf();
container.bind<EnvironmentRepository>(EnvironmentRepository).toSelf();

export { container };
