import { IsOptional, IsString } from "class-validator";

export class AlteraMovimentacaoDTO{   
    @IsString()
    @IsOptional()
    FUNCIONARIO: string;

    @IsString()
    @IsOptional()
    PATRIMONIO: string;
}

