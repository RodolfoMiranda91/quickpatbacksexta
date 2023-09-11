import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { movimentacaoProviders } from './movimentacao.providers';
import { MovimentacaoService } from './movimentacao.service';
import { MovimentacaoController } from './movimentacao.controller';


@Module({
  imports: [DatabaseModule],
  controllers: [MovimentacaoController],
  providers: [
    ...movimentacaoProviders,
    MovimentacaoService,
  ]
})
export class MovimentacaoModule {}
