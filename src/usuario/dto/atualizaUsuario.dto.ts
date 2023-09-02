import { IsNotEmpty, IsString, IsOptional, IsEmail } from "class-validator";
import { EmailUnicoUsuario } from "../validacao/emailUnicoUsuario";


export class AlteraUsuarioDTO {
    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    NOME: string;

    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    SOBRENOME: string;

    @IsEmail(undefined,{message: "Email invalido"})
    @EmailUnicoUsuario({message: "Já existe usuário com este email cadastrado"})
    @IsOptional()
    EMAIL: string;

    @IsEmail(undefined,{message: "Email invalido"})
    @EmailUnicoUsuario({message: "Já existe usuário com este email cadastrado"})
    @IsOptional()
    CONFIRMAEMAIL: string;

    @IsString({message: "Telefone inválido"})
    @IsOptional()
    TELEFONEUM: string;

    @IsString({message: "Telefone inválido"})
    @IsOptional()
    TELEFONEDOIS: string;

    @IsString()
    @IsOptional()
    LOGIN: string;

    @IsString()
    @IsOptional()
    SENHA: string;

}