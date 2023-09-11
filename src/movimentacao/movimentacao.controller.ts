import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { AlteraMovimentacaoDTO } from "./dto/atualizaMovimentacao.dto";
import { CriaMovimentacaoDTO } from "./dto/criaMovimentacao.dto";
import { MOVIMENTACAO } from "./movimentacao.entity";
import { MovimentacaoService } from "./movimentacao.service";


@Controller('/movimentacao')
export class MovimentacaoController{
    constructor(private readonly movimentacaoService: MovimentacaoService){
             
    }

    @Get('listar')
    async listar(): Promise<MOVIMENTACAO[]>{
        return this.movimentacaoService.listar();
    }
    
    @Post('')
    async cria(@Body() dados: CriaMovimentacaoDTO): Promise<RetornoCadastroDTO>{        
        return this.movimentacaoService.inserir(dados)        
    }

    @Put(':id')
    async alterar(@Body() dados: AlteraMovimentacaoDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
        return this.movimentacaoService.alterar(id,dados)        
    }
    
    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<MOVIMENTACAO>{
        return this.movimentacaoService.localizarID(id);
    }
    
    @Get('')
    async listaNome(@Param('id') id: string): Promise<any>{
        return this.movimentacaoService.listaNome();
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.movimentacaoService.remover(id);
    }    

}