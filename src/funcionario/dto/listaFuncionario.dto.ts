export class ListaFuncionarioDTO{
    constructor(
        readonly ID: string,
        readonly NOME_COMPLETO: string,
        readonly CARGO: string,
        readonly EMAIL: string,
        readonly CONFIRMAEMAIL: string,
        readonly TELEFONEUM: string,
        readonly DEPARTAMENTO: string
    ){}
}