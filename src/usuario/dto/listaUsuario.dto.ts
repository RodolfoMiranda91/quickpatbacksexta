export class ListaUsuarioDTO {
    constructor(
        readonly ID: string,
        readonly NOME: string,
        readonly SOBRENOME: string,
        readonly EMAIL: string,
        readonly CONFIRMAEMAIL: string,
        readonly TELEFONEUM: string,
        readonly TELEFONEDOIS: string,
        readonly LOGIN: string,
        readonly SENHA: string
    ) { }
}