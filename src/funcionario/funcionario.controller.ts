import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CriaFuncionarioDTO } from "./dto/criaFuncionario";
import { Delete } from "@nestjs/common/decorators";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { FUNCIONARIO } from "./funcionario.entity";
import { AlteraFuncionarioDTO } from "./dto/atualizaFuncionario.dto";
import { FuncionarioService } from "./funcionario.service";

@Controller('/funcionarios')
export class FuncionarioController{
    constructor(private readonly funcionarioService: FuncionarioService ){

    }   

    @Get('listar')
    async listar(): Promise<FUNCIONARIO[]>{
        return this.funcionarioService.listar();
    }

    @Post('')
    async criaFuncionario(@Body() dados: CriaFuncionarioDTO): Promise<RetornoCadastroDTO>{        
        return this.funcionarioService.inserir(dados)        
    }

    @Put(':id')
    async alterarFuncionario(@Body() dados: AlteraFuncionarioDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
        return this.funcionarioService.alterar(id,dados)        
    }

    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<FUNCIONARIO>{
        return this.funcionarioService.localizarID(id);
    }

    @Get('')
    async listaNome(@Param('id') id: string): Promise<any>{
        return this.funcionarioService.listaNomes();
    }

    @Delete(':id')
    async removeProduto(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.funcionarioService.remover(id);
    }

}
