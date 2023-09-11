import { DataSource } from 'typeorm';
import { MOVIMENTACAO } from './movimentacao.entity';

export const movimentacaoProviders = [
  {
    provide: 'MOVIMENTACAO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MOVIMENTACAO),
    inject: ['DATA_SOURCE'],
  },
];