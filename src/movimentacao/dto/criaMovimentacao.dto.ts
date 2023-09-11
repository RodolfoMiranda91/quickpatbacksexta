import {   IsString } from "class-validator";


export class CriaMovimentacaoDTO{
    @IsString()
    FUNCIONARIO: string;

    @IsString()
    PATRIMONIO: string;
}