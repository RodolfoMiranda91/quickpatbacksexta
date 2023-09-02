import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { PATRIMONIO } from './patrimonio.entity';
import { CriaPatrimonioDTO } from './dto/criaPatrimonio.dto';
import { AlteraPatrimonioDTO } from './dto/atualizaPatrimonio.dto';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';

Injectable()

export class PatrimonioService {
  constructor(    
    @Inject('PATRIMONIO_REPOSITORY')
    private patrimonioRepository: Repository<PATRIMONIO>,
  ) {}  

  async listar(): Promise<PATRIMONIO[]> {
    return this.patrimonioRepository.find();
  } 

  async inserir(dados: CriaPatrimonioDTO): Promise<RetornoCadastroDTO>{       

    let patrimonio = new PATRIMONIO();
        patrimonio.ID = uuid();
        patrimonio.NOME = dados.NOME;
        patrimonio.MODELO = dados.MODELO;
        patrimonio.TIPO = dados.TIPO;
        patrimonio.GRUPO = dados.GRUPO;
        patrimonio.VALOR = dados.VALOR;
        patrimonio.DESCRICAO = dados.DESCRICAO;

    return this.patrimonioRepository.save(patrimonio)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: patrimonio.ID,
        message: "Patrimonio cadastrado!"
      };
    })

    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })    
  } 

  localizarID(ID: string): Promise<PATRIMONIO> {
    return this.patrimonioRepository.findOne({
      where: {
        ID,
      },
    });
  } 

  listaNomes(): Promise<any[]> {
    return this.patrimonioRepository.find({
      select:{
        ID:true,
        NOME:true,
        MODELO:true,
        TIPO:true,
        GRUPO:true,
        VALOR:true,
        DESCRICAO:true,
      }
    });
  } 

  async remover(id: string): Promise<RetornoObjDTO> {
    const patrimonio = await this.localizarID(id);
    return this.patrimonioRepository.remove(patrimonio)
    .then((result) => {
      return <RetornoObjDTO>{
        return: patrimonio,
        message: "Patrimonio excluido!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: patrimonio,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  } 

  async alterar(id: string, dados: AlteraPatrimonioDTO): Promise<RetornoCadastroDTO> {
    const patrimonio = await this.localizarID(id);

    Object.entries(dados).forEach(
      async([chave, valor]) => {
          if(chave=== 'ID'){
              return;
          }

          patrimonio[chave] = valor;
      }
    ) 

    return this.patrimonioRepository.save(patrimonio)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: patrimonio.ID,
        message: "Patrimonio alterada!"
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