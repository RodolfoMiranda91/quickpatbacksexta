import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/criausuario.dto";
import { AlteraUsuarioDTO } from "./dto/atualizaUsuario.dto";
import { Delete } from "@nestjs/common/decorators";
import { USUARIO } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";


@Controller('/usuarios')


export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {
    }

    @Get('listar')
    async listar(): Promise<USUARIO[]> {
        return this.usuarioService.listar();
    }

    @Post('')
    async criaProduto(@Body() dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO> {
        return this.usuarioService.inserir(dados)
    }

    @Put(':id')
    async alterarUsuario(@Body() dados: AlteraUsuarioDTO, @Param('id') id: string): Promise<RetornoCadastroDTO> {
        return this.usuarioService.alterar(id, dados)
    }

    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<USUARIO> {
        return this.usuarioService.localizarID(id);
    }

    @Get('')
    async listaNome(@Param('id') id: string): Promise<any> {
        return this.usuarioService.listaNomes();
    }

    @Delete(':id')
    async removeProduto(@Param('id') id: string): Promise<RetornoObjDTO> {
        return this.usuarioService.remover(id);
    }



}



