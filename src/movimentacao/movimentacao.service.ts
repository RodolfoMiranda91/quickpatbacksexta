import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import {v4 as uuid} from 'uuid';
import { MOVIMENTACAO } from './movimentacao.entity';
import { listaFunPatDTO, listaMovimentacaoDTO } from './dto/listaMovimentacao.dto';
import { CriaMovimentacaoDTO } from './dto/movimentacao.dto';
import { AlteraMovimentacaoDTO } from './dto/atualizaMovimentacao.dto';
import { FUNCIONARIO } from 'src/funcionario/funcionario.entity';
import { FuncionarioService } from 'src/funcionario/funcionario.service';
import { PATRIMONIO } from 'src/patrimonio/patrimonio.entity';
import { PatrimonioService } from 'src/patrimonio/patrimonio.service';

@Injectable()

export class MovimentacaoService {
  constructor(
    @Inject('MOVIMENTACAO_REPOSITORY')
    private movimentacaoRepository: Repository<MOVIMENTACAO>,

    @Inject('FUNCIONARIO_REPOSITORY')
    private funcionarioRepository: Repository<FUNCIONARIO>,  
    private readonly funcionarioService: FuncionarioService,

    @Inject('PATRIMONIO_REPOSITORY')
    private patrimonioRepository: Repository<PATRIMONIO>,  
    private readonly patrimonioService: PatrimonioService
  ) {} 

  async listar(): Promise<MOVIMENTACAO[]> {
    return this.movimentacaoRepository.find();
  }

  async listarMovimentacao(): Promise<listaFunPatDTO[]> {
    const resultado = await this.movimentacaoRepository
      .createQueryBuilder('MOVIMENTACAO') 
      .innerJoin('FUNCIONARIO', 'f', 'MOVIMENTACAO.IDFUNCIONARIO = f.ID')
      .innerJoin('PATRIMONIO', 'p', 'MOVIMENTACAO.IDPATRIMONIO = p.ID')
      .select(['f.NOME_COMPLETO', 'p.NOME'])
      .getRawMany();

     const listaRetorno = resultado.map(
        movimentacao => new listaFunPatDTO(
        movimentacao.FUNCIONARIO,
        movimentacao.PATRIMONIO
       )
     );
    return listaRetorno;
  }

  async inserir(dados: CriaMovimentacaoDTO): Promise<RetornoCadastroDTO>{
    
    let movimentacao = new MOVIMENTACAO();
        movimentacao.ID = uuid();
        movimentacao.IDFUNCIONARIO = await this.funcionarioService.localizarID(dados.IDFUNCIONARIO);
        movimentacao.IDPATRIMONIO = await this.patrimonioService.localizarID(dados.IDPATRIMONIO);

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

          if(chave=== 'IDFUNCIONARIO'){
            movimentacao['FUNCIONARIO'] = await this.funcionarioService.localizarID(valor);
            return;
           }

          if(chave=== 'IDPATRIMONIO'){
            movimentacao['PATRIMONIO'] = await this.patrimonioService.localizarID(valor);
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