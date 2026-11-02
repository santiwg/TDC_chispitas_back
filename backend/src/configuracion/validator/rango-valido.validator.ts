import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

//Rango que tiene el sensor DS18B20
export const TEMP_MIN = -55;
export const TEMP_MAX = 125;

@ValidatorConstraint({ name: 'rangoValido', async: false })
export class RangoValidoConstraint implements ValidatorConstraintInterface {
  validate(tolerancia: number, args: ValidationArguments) {
    const { setpoint } = args.object as { setpoint: number };

    if (typeof setpoint !== 'number' || typeof tolerancia !== 'number') {
      return true;
    }

    return setpoint - tolerancia >= TEMP_MIN && setpoint + tolerancia <= TEMP_MAX;
  }

  defaultMessage(args: ValidationArguments) {
    const { setpoint } = args.object as { setpoint: number };
    const tolerancia = args.value as number;
    return `El rango resultante (${setpoint - tolerancia} - ${setpoint + tolerancia} °C) debe estar entre ${TEMP_MIN} y ${TEMP_MAX} °C`;
  }
}

// Decorador para usar en el DTO
export function RangoValido(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: RangoValidoConstraint,
    });
  };
}