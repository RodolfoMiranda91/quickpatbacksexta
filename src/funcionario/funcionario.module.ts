import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { FuncionarioController } from "./funcionario.controller";
import { funcionarioProviders } from "./funcionario.providers";
import { FuncionarioService } from "./funcionario.service";
import { EmailUnicoFuncionarioValidator } from "./validacao/emailUnicoFuncionario";



@Module({
    imports: [DatabaseModule],
    controllers: [FuncionarioController],
    providers: [
      ...funcionarioProviders,
      FuncionarioService,
      EmailUnicoFuncionarioValidator,
    ],
  })
  export class FuncionarioModule {}