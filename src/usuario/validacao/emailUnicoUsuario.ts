import { Injectable } from "@nestjs/common/decorators";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioService } from "../usuario.service";



@Injectable()
@ValidatorConstraint({async: true})
export class EmailUnicoUsuarioValidator implements ValidatorConstraintInterface{
    constructor (private UsuariosService: UsuarioService){}

    async validate(value: any, ValidationArguments?: ValidationArguments): Promise<boolean> {
        const validarEmailUsuario = await this.UsuariosService.validaEmailUsuario(value);
        return !validarEmailUsuario;
    }
}

export const EmailUnicoUsuario = (opcaoValidacao: ValidationOptions) =>{
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcaoValidacao,
            constraints: [],
            validator: EmailUnicoUsuarioValidator
        })
    }
}