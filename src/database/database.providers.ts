import { DataSource } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'mysql',
//         host: 'ns582.hostgator.com.br',
//         port: 3306,
//         username: 'vitali04_quickpat',
//         password: '120400lolo',
//         database: 'vitali04_quickpat',
//         entities: [
//             __dirname + '/../**/*.entity{.ts,.js}',
//         ],
//         synchronize: false,
//       });
      
//       return dataSource.initialize();
//     },
//   },
// ];

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'quickpatresumido',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false,
      });     

      return dataSource.initialize();
    },
  },
];