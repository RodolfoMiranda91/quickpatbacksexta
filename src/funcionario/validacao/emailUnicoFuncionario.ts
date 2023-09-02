import { Injectable } from "@nestjs/common/decorators";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { FuncionarioService } from "../funcionario.service";


@Injectable()
@ValidatorConstraint({async: true})
export class EmailUnicoFuncionarioValidator implements ValidatorConstraintInterface{
    constructor (private FuncionariosService: FuncionarioService){}

    async validate(value: any, ValidationArguments?: ValidationArguments): Promise<boolean> {
        const validarEmailFuncionario = await this.FuncionariosService.validaEmailFuncionario(value);
        return !validarEmailFuncionario;
    }
}

export const EmailUnicoFuncionario = (opcaoValidacao: ValidationOptions) =>{
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcaoValidacao,
            constraints: [],
            validator: EmailUnicoFuncionarioValidator
        })
    }
}