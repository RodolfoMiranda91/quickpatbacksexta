import { Injectable } from "@nestjs/common/decorators";
import { PATRIMONIO } from "./patrimonio.entity";


@Injectable()
export class PatrimoniosArmazenados {
    #patrimonios: PATRIMONIO[] = [];

    AdicionarPatrimonio(patrimonio: PATRIMONIO){
        this.#patrimonios.push(patrimonio);
    }

    get Patrimonios(){
        return this.#patrimonios
    }

    private buscaPorID(id: string){
        const possivelpatrimonio = this.#patrimonios.find(
            Patrimoniosalvo => Patrimoniosalvo.ID === id
        );

        if (!possivelpatrimonio){
            throw new Error('Patrimonio não encontrado')
        }
        return possivelpatrimonio
    }

    async PatrimonioByID(id: string){
        const patrimonio = this.buscaPorID(id);
        return patrimonio;
    }

    async PatrimonioByNome(nome: string){
        const patrimonio = this.#patrimonios.filter(
            Patrimoniosalvo => Patrimoniosalvo.NOME.includes(nome)
        );

        if(!patrimonio){
            throw new Error('Patrimonio não encontrado');
        }

        return patrimonio;
    }

    async atualizaPatrimonio(id: string, dadosAtualizacao: Partial<PATRIMONIO>){
        const patrimonio = this.buscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if(chave=== 'id'){
                    return;
                }

                patrimonio[chave] = valor;
            }
        )

        return patrimonio;
    }

    async removePatrimonio(id: string){
        const patrimonio = this.buscaPorID(id);
        this.#patrimonios = this.#patrimonios.filter(
            Patrimoniosalvo => Patrimoniosalvo.ID !== id
        )
        return patrimonio;
    }    
}