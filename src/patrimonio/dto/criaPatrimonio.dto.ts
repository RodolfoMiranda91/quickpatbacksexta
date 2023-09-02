import { IsNumber, IsString} from "class-validator";

export class CriaPatrimonioDTO{
    @IsString()
    NOME: string;

    @IsString()
    MODELO: string;

    @IsString()
    TIPO: string;

    @IsString()
    GRUPO: string;
    
    @IsNumber()
    VALOR: number;

    @IsString()
    DESCRICAO: string;
}