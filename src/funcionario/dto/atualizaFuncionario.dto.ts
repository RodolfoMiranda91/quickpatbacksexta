import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";
import { EmailUnicoFuncionario } from "../validacao/emailUnicoFuncionario";


export class AlteraFuncionarioDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    @IsOptional()
    NOME_COMPLETO: string;

    @IsString()
    @IsNotEmpty({message: "Cargo não pode ser vazio"})
    @IsOptional()
    CARGO: string;

    @IsEmail(undefined,{message: "Email invalido"})
    @EmailUnicoFuncionario({message: "Já existe funcionário com este email cadastrado"})
    @IsOptional()
    EMAIL: string;

    @IsEmail(undefined,{message: "Email invalido"})
    @EmailUnicoFuncionario({message: "Já existe funcionário com este email cadastrado"})
    @IsOptional()
    CONFIRMAEMAIL: string;
    
    @IsString({message: "Telefone inválido"})
    @IsOptional()
    TELEFONEUM: string;

    @IsString()
    @IsNotEmpty({message: "Departamento não pode ser vazio"})
    @IsOptional()
    DEPARTAMENTO: string;
}