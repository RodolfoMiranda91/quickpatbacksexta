import { Column, Entity, PrimaryColumn } from "typeorm";


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
}