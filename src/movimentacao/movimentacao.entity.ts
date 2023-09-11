import { Entity, PrimaryColumn, Column } from "typeorm";


@Entity()
export class MOVIMENTACAO{
    @PrimaryColumn()
    ID: string;   

    @Column()
    FUNCIONARIO: string;

    @Column()
    PATRIMONIO: string;
}