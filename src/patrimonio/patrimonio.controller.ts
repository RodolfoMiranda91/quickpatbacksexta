import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CriaPatrimonioDTO } from "./dto/criaPatrimonio.dto";
import { AlteraPatrimonioDTO } from "./dto/atualizaPatrimonio.dto";
import { Delete } from "@nestjs/common/decorators";
import { PATRIMONIO } from "./patrimonio.entity";
import { PatrimonioService } from "./patrimonio.service";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";

@Controller('/patrimonios')
export class PatrimonioController{
    constructor(private readonly patrimonioService: PatrimonioService ){

    }   

    @Get('listar')
    async listar(): Promise<PATRIMONIO[]>{
        return this.patrimonioService.listar();
    }

    @Post('')
    async criaPatrimonio(@Body() dados: CriaPatrimonioDTO): Promise<RetornoCadastroDTO>{        
        return this.patrimonioService.inserir(dados)        
    }

    @Put(':id')
    async alterarPatrimonio(@Body() dados: AlteraPatrimonioDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
        return this.patrimonioService.alterar(id,dados)        
    }

    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<PATRIMONIO>{
        return this.patrimonioService.localizarID(id);
    }

    @Get('')
    async listaNome(@Param('id') id: string): Promise<any>{
        return this.patrimonioService.listaNomes();
    }

    @Delete(':id')
    async removeProduto(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.patrimonioService.remover(id);
    }

}



