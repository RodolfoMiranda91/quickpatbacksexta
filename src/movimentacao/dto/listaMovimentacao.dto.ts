export class listaMovimentacaoDTO{
    constructor(
        readonly ID:string,
        readonly IDFUNCIONARIO: string,
        readonly IDPATRIMONIO: string
    ){}
}

export class listaFunPatDTO{
    constructor(
        readonly FUNCIONARIO: string,
        readonly PATRIMONIO: string
    ){}
}