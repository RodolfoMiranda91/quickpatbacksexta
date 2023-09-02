import { Inject, Injectable } from "@nestjs/common";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { Repository } from "typeorm";
import {v4 as uuid} from 'uuid';
import { AlteraFuncionarioDTO } from "./dto/atualizaFuncionario.dto";
import { CriaFuncionarioDTO } from "./dto/criaFuncionario";
import { FUNCIONARIO } from "./funcionario.entity";

Injectable()
export class FuncionarioService {
  #funcionarios: FUNCIONARIO[] = [];
  async validaEmailFuncionario(email:string){
    const possivelfuncionario = this.#funcionarios.find(
        funcionario => funcionario.EMAIL === email
    );
    return (possivelfuncionario !== undefined);
}

  constructor(    
    @Inject('FUNCIONARIO_REPOSITORY')
    private funcionarioRepository: Repository<FUNCIONARIO>,
  ) {}   

  async listar(): Promise<FUNCIONARIO[]> {
    return this.funcionarioRepository.find();
  }
  
  async inserir(dados: CriaFuncionarioDTO): Promise<RetornoCadastroDTO>{
    let funcionario = new FUNCIONARIO();
        funcionario.ID = uuid();
        funcionario.NOME_COMPLETO = dados.NOME_COMPLETO;
        funcionario.CARGO = dados.CARGO;
        funcionario.EMAIL = dados.EMAIL;
        funcionario.CONFIRMAEMAIL = dados.CONFIRMAEMAIL;
        funcionario.TELEFONEUM = dados.TELEFONEUM;
        funcionario.DEPARTAMENTO = dados.DEPARTAMENTO; 

    return this.funcionarioRepository.save(funcionario)

    .then((result) => {
      return <RetornoCadastroDTO>{
        id: funcionario.ID,
        message: "Funcionario cadastrado!"
      };
    })

    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })    
  } 

  localizarID(ID: string): Promise<FUNCIONARIO> {
    return this.funcionarioRepository.findOne({
      where: {
        ID,
      },
    });
  } 

  listaNomes(): Promise<any[]> {
    return this.funcionarioRepository.find({
      select:{
        NOME_COMPLETO:true,
        CARGO:true,
        EMAIL:true,
        CONFIRMAEMAIL:true,
        TELEFONEUM:true,
        DEPARTAMENTO:true,
      }
    });
  } 

  async remover(id: string): Promise<RetornoObjDTO> {
    const funcionario = await this.localizarID(id);
    return this.funcionarioRepository.remove(funcionario)
    .then((result) => {
      return <RetornoObjDTO>{
        return: funcionario,
        message: "Funcionario excluido!"
      };
    }) 

    .catch((error) => {
      return <RetornoObjDTO>{
        return: funcionario,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  } 

  async alterar(id: string, dados: AlteraFuncionarioDTO): Promise<RetornoCadastroDTO> {
    const funcionario = await this.localizarID(id); 

    Object.entries(dados).forEach(
      async([chave, valor]) => {
          if(chave=== 'ID'){
              return;
          }
          funcionario[chave] = valor;
      }
    ) 

    return this.funcionarioRepository.save(funcionario)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: funcionario.ID,
        message: "Funcionario alterada!"
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