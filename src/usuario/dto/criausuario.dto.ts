import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EmailUnicoUsuario } from "../validacao/emailUnicoUsuario";


export class CriaUsuarioDTO {
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

    @IsString()
    TELEFONEUM: string;

    @IsString()
    TELEFONEDOIS: string;

    @IsString()
    LOGIN: string;

    @IsString()
    SENHA: string;

}