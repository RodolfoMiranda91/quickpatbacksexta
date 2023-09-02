import { Module } from '@nestjs/common';
import { PatrimonioModule } from './patrimonio/patrimonio.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FuncionarioModule } from './funcionario/funcionario.module';

@Module({
  imports: [FuncionarioModule, UsuarioModule, PatrimonioModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
