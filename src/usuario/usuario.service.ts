import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { v4 as uuid } from 'uuid';
import { USUARIO } from './usuario.entity';
import { CriaUsuarioDTO } from './dto/criausuario.dto';
import { AlteraUsuarioDTO } from './dto/atualizaUsuario.dto';


Injectable()
export class UsuarioService {
  #usuarios: USUARIO[] = [];
  async validaEmailUsuario (email:string){
    const possivelusuario = this.#usuarios.find(
      usuario => usuario.EMAIL === email
    );
    return (possivelusuario !== undefined);
}
  
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<USUARIO>,
  ) { }

  async listar(): Promise<USUARIO[]> {
    return this.usuarioRepository.find();
  }


  async inserir(dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO> {

    let usuario = new USUARIO();
    usuario.ID = uuid();
    usuario.NOME = dados.NOME;
    usuario.SOBRENOME = dados.SOBRENOME;
    usuario.EMAIL = dados.EMAIL;
    usuario.CONFIRMAEMAIL = dados.CONFIRMAEMAIL;
    usuario.TELEFONEUM = dados.TELEFONEUM;
    usuario.TELEFONEDOIS = dados.TELEFONEDOIS;
    usuario.LOGIN = dados.LOGIN;
    usuario.SENHA = dados.SENHA;

    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoCadastroDTO>{
          id: usuario.ID,
          message: "Usuario cadastrado!"
        };
      })

      .catch((error) => {
        return <RetornoCadastroDTO>{
          id: "",
          message: "Houve um erro ao cadastrar." + error.message
        };
      })
  }

  localizarID(ID: string): Promise<USUARIO> {
    return this.usuarioRepository.findOne({
      where: {
        ID,
      },
    });
  }

  listaNomes(): Promise<any[]> {
    return this.usuarioRepository.find({
      select: {
        ID: true,
        NOME: true,
        SOBRENOME: true,
        EMAIL: true,
        CONFIRMAEMAIL: true,
        TELEFONEUM: true,
        TELEFONEDOIS: true,
        LOGIN: true,
        SENHA: true,
      }
    });
  }

  async remover(id: string): Promise<RetornoObjDTO> {
    const usuario = await this.localizarID(id);
    return this.usuarioRepository.remove(usuario)
      .then((result) => {
        return <RetornoObjDTO>{
          return: usuario,
          message: "Usuario excluido!"
        };
      })

      .catch((error) => {
        return <RetornoObjDTO>{
          return: usuario,
          message: "Houve um erro ao excluir." + error.message
        };
      });
  }

  async alterar(id: string, dados: AlteraUsuarioDTO): Promise<RetornoCadastroDTO> {
    const usuario = await this.localizarID(id);

    Object.entries(dados).forEach(
      async ([chave, valor]) => {
        if (chave === 'ID') {
          return;
        }
        usuario[chave] = valor;
      }
    )

    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoCadastroDTO>{
          id: usuario.ID,
          message: "Usuario alterado!"
        };
      })
      .catch((error) => {
        return <RetornoCadastroDTO>{
          id: "",
          message: "Houve um erro ao alterar." + error.message
        };
      });
  }
}