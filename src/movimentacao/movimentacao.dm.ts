import { Injectable } from "@nestjs/common";
import { MOVIMENTACAO } from "./movimentacao.entity";

@Injectable()
export class MovimentacoesArmazenadas{
    #movimentacoes: MOVIMENTACAO[] = [];

    AdicionarMovimentacao(movimentacao: MOVIMENTACAO){
        this.#movimentacoes.push(movimentacao);
    }

    get Movimentacoes(){        
        return this.#movimentacoes;
    }   

    private buscaPorID(id: string){
        const possivelMovimentacao = this.#movimentacoes.find(
            movimentacaSalvo => movimentacaSalvo.ID === id
        );

        if(!possivelMovimentacao){
            throw new Error('Movimentação não encontrada');
        }

        return possivelMovimentacao
    }

    async atualizaMovimentacao(id: string, dadosAtualizacao: Partial<MOVIMENTACAO>){
        const movimentacao = this.buscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if(chave=== 'id'){
                    return;
                }

                movimentacao[chave] = valor;
            }
        )

        return movimentacao;
    }

   async removeMovimentacao(id: string){
        const movimentacao = this.buscaPorID(id);
        this.#movimentacoes = this.#movimentacoes.filter(
            movimentacaSalvo => movimentacaSalvo.ID !== id
        )
        return movimentacao;
   }
}