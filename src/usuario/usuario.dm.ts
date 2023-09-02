import { Injectable } from "@nestjs/common/decorators";
import { USUARIO } from "./usuario.entity";


@Injectable()
export class UsuariosArmazenados {
    #usuarios: USUARIO[] = [];

    AdicionarUsuario(usuario: USUARIO) {
        this.#usuarios.push(usuario);
    }

    get Usuarios() {
        return this.#usuarios
    }

    private buscaPorID(id: string) {
        const possivelusuario = this.#usuarios.find(
            Usuariosalvo => Usuariosalvo.ID === id
        );

        if (!possivelusuario) {
            throw new Error('Usuario não encontrado')
        }
        return possivelusuario
    }

    async buscaUsuarioPorID(id: string) {
        const possivelUsuario = this.#usuarios.find(
            usuariosSalvo => usuariosSalvo.ID === id
        );

        if (!possivelUsuario) {
            throw new Error('Usuario não encontrado')
        }
        return possivelUsuario
    }

    async atualizaUsuario(id: string, dadosAtualizacao: Partial<USUARIO>) {
        const usuario = this.buscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if (chave === 'id') {
                    return;
                }

                usuario[chave] = valor;
            }
        )

        return usuario;
    }

    async removeUsuario(id: string) {
        const usuario = this.buscaPorID(id);

        this.#usuarios = this.#usuarios.filter(
            usuarioSalvo => usuarioSalvo.ID !== id
        )

        return usuario;
    }

}