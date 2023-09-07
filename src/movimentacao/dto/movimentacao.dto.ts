import {  IsNotEmpty, IsString } from "class-validator";


export class CriaMovimentacaoDTO{
    @IsString()
    @IsNotEmpty({message: "ID do Funcionário não pode ser vazio"})   
    IDFUNCIONARIO: string;

    @IsString()
    @IsNotEmpty({message: "ID do Patrimonio não pode ser vazio"})
    IDPATRIMONIO: string;
}