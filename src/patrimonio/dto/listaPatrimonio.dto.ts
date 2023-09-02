export class ListaPatrimonioDTO{
    constructor(
        readonly ID: string,
        readonly NOME: string,
        readonly MODELO: string,
        readonly TIPO: string,
        readonly GRUPO: string,
        readonly VALOR: number,
        readonly DESCRICAO: string
    ){}
}