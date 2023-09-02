import { Injectable } from "@nestjs/common/decorators";
import { FUNCIONARIO } from "./funcionario.entity";


@Injectable()
export class FuncionariosArmazenados {
    #funcionarios: FUNCIONARIO[] = [];

    AdicionarPatrimonio(funcionario: FUNCIONARIO){
        this.#funcionarios.push(funcionario);
    }

    get Funcionarios(){
        return this.#funcionarios
    }

    private buscaPorID(id: string){
        const possivelfuncionario = this.#funcionarios.find(
            Funcionariosalvo => Funcionariosalvo.ID === id
        );

        if (!possivelfuncionario){
            throw new Error('Funcionario não encontrado')
        }
        return possivelfuncionario
    }   

    async FuncionarioByID(id: string){
        const funcionario = this.buscaPorID(id);
        return funcionario;
    }

    async PatrimonioByNome(nome: string){
        const funcionario = this.#funcionarios.filter(
            Funcionariosalvo => Funcionariosalvo.NOME_COMPLETO.includes(nome)
        );

        if(!funcionario){
            throw new Error('Funcionario não encontrado');
        }

        return funcionario;
    }

    async atualizaFuncionario(id: string, dadosAtualizacao: Partial<FUNCIONARIO>){
        const funcionario = this.buscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if(chave=== 'id'){
                    return;
                }

                funcionario[chave] = valor;
            }
        )

        return funcionario;
    }

    async removeFuncionario(id: string){
        const funcionario = this.buscaPorID(id);
        this.#funcionarios = this.#funcionarios.filter(
            Funcionariosalvo => Funcionariosalvo.ID !== id
        )
        return funcionario;
    }    
}