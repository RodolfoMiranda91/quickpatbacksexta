import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class USUARIO {

    @PrimaryColumn()
    ID: string;

    @Column()
    NOME: string;

    @Column()
    SOBRENOME: string;

    @Column()
    EMAIL: string;

    @Column()
    CONFIRMAEMAIL: string;

    @Column()
    TELEFONEUM: string;

    @Column()
    TELEFONEDOIS: string;

    @Column()
    LOGIN: string;

    @Column()
    SENHA: string;

}