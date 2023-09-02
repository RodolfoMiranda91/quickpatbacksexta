import { DataSource } from 'typeorm';
import { FUNCIONARIO } from './funcionario.entity';

export const funcionarioProviders = [
  {
    provide: 'FUNCIONARIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(FUNCIONARIO),
    inject: ['DATA_SOURCE'],
  },
];