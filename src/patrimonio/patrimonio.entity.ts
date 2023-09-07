import { MOVIMENTACAO } from "src/movimentacao/movimentacao.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";


@Entity()
export class PATRIMONIO{
    @PrimaryColumn()
    ID: string;

    @Column()
    NOME: string;

    @Column()
    MODELO: string;
    
    @Column()
    TIPO: string;

    @Column()
    GRUPO: string;

    @Column('decimal', { precision: 6, scale: 2 })
    VALOR: number;

    @Column()
    DESCRICAO: string;
    
    @OneToMany(() => MOVIMENTACAO, movimentacao => movimentacao.IDPATRIMONIO)
    movimentacao: MOVIMENTACAO[];
}