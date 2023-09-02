import {  IsString, IsOptional, IsNumber } from "class-validator";



export class AlteraPatrimonioDTO{
    @IsString()
    @IsOptional()
    NOME: string;

    @IsString()
    @IsOptional()
    MODELO: string;

    @IsString()
    @IsOptional()
    TIPO: string;

    @IsString()
    @IsOptional()
    GRUPO: string;

    @IsOptional()
    @IsNumber()
    VALOR: number;

    @IsString()
    @IsOptional()
    DESCRICAO: string;
}