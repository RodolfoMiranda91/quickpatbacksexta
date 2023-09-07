import { FUNCIONARIO } from "src/funcionario/funcionario.entity";
import { PATRIMONIO } from "src/patrimonio/patrimonio.entity";
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";


@Entity()
export class MOVIMENTACAO{
    @PrimaryColumn()
    ID: string;   

    @ManyToOne(() => FUNCIONARIO, funcionario => funcionario.movimentacao)
    @JoinColumn({ name: 'IDFUNCIONARIO', referencedColumnName:'ID'})
    IDFUNCIONARIO: FUNCIONARIO;

    @ManyToOne(() => PATRIMONIO, patrimonio => patrimonio.movimentacao)
    @JoinColumn({ name: 'IDPATRIMONIO', referencedColumnName:'ID'})
    IDPATRIMONIO: PATRIMONIO;    
}