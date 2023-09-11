import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import {v4 as uuid} from 'uuid';
import { MOVIMENTACAO } from './movimentacao.entity';import { CriaMovimentacaoDTO } from './dto/criaMovimentacao.dto';
import { AlteraMovimentacaoDTO } from './dto/atualizaMovimentacao.dto';

@Injectable()

export class MovimentacaoService {
  constructor(
    @Inject('MOVIMENTACAO_REPOSITORY')
    private movimentacaoRepository: Repository<MOVIMENTACAO>,
  ) {} 

  async listar(): Promise<MOVIMENTACAO[]> {
    return this.movimentacaoRepository.find();
  }

  async inserir(dados: CriaMovimentacaoDTO): Promise<RetornoCadastroDTO>{
    
    let movimentacao = new MOVIMENTACAO();
        movimentacao.ID = uuid();
        movimentacao.FUNCIONARIO = dados.FUNCIONARIO;
        movimentacao.PATRIMONIO = dados.PATRIMONIO;

    return this.movimentacaoRepository.save(movimentacao)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: movimentacao.ID,
        message: "Movimentação cadastrada!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })
  }
  
  localizarID(ID: string): Promise<MOVIMENTACAO> {
    return this.movimentacaoRepository.findOne({
      where: {
        ID,
      },
    });
  } 

  listaNome(): Promise<any[]> {
    return this.movimentacaoRepository.find({
      select:{
        ID:true,
        FUNCIONARIO:true,
        PATRIMONIO:true,
      }
    });
  }

  async remover(id: string): Promise<RetornoObjDTO> {
    const movimentacao = await this.localizarID(id);

    return this.movimentacaoRepository.remove(movimentacao)
    .then((result) => {
      return <RetornoObjDTO>{
        return: movimentacao,
        message: "Movimentação excluido!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: movimentacao,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: AlteraMovimentacaoDTO): Promise<RetornoCadastroDTO> {
    const movimentacao = await this.localizarID(id);

    Object.entries(dados).forEach(
      async([chave, valor]) => {
          if(chave=== 'ID'){
              return;
          }

          movimentacao[chave] = valor;
      }
    ) 
    
    return this.movimentacaoRepository.save(movimentacao)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: movimentacao.ID,
        message: "Movimentação alterada!"
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