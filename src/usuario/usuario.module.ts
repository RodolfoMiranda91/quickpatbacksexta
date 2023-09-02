import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UsuarioController } from "./usuario.controller";
import { usuarioProviders } from "./usuario.providers";
import { UsuarioService } from "./usuario.service";
import { EmailUnicoUsuarioValidator } from "./validacao/emailUnicoUsuario";


@Module({
    imports: [DatabaseModule],
    controllers: [UsuarioController],
    providers: [
        ...usuarioProviders,
        UsuarioService,
        EmailUnicoUsuarioValidator,
    ]
})
export class UsuarioModule {}