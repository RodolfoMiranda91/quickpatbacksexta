import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { funcionarioProviders } from 'src/funcionario/funcionario.providers';
import { FuncionarioService } from 'src/funcionario/funcionario.service';
import { patrimonioProviders } from 'src/patrimonio/patrimonio.providers';
import { PatrimonioService } from 'src/patrimonio/patrimonio.service';
import { movimentacaoProviders } from './movimentacao.providers';
import { MovimentacaoService } from './movimentacao.service';
import { MovimentacaoController } from './movimentacao.controller';


@Module({
  imports: [DatabaseModule],
  controllers: [MovimentacaoController],
  providers: [
    ...movimentacaoProviders,
    MovimentacaoService,
    ...funcionarioProviders,
    FuncionarioService,
    ...patrimonioProviders,
    PatrimonioService,
  ]
})
export class MovimentacaoModule {}
