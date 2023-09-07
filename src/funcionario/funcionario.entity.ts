import { MOVIMENTACAO } from "src/movimentacao/movimentacao.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";


@Entity()
export class FUNCIONARIO{
    @PrimaryColumn()
    ID: string;

    @Column()
    NOME_COMPLETO: string;

    @Column()
    CARGO: string;

    @Column()
    EMAIL: string;

    @Column()
    CONFIRMAEMAIL: string;
    
    @Column()
    TELEFONEUM: string;

    @Column()
    DEPARTAMENTO: string;

    @OneToMany(() => MOVIMENTACAO, movimentacao => movimentacao.IDFUNCIONARIO)
    movimentacao: MOVIMENTACAO[];
}
