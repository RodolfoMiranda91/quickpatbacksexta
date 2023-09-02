import { DataSource } from 'typeorm';
import { PATRIMONIO } from './patrimonio.entity';

export const patrimonioProviders = [
  {
    provide: 'PATRIMONIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PATRIMONIO),
    inject: ['DATA_SOURCE'],
  },
];