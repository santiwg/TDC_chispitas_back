import { IsNumber, Max, Min } from 'class-validator';
import { RangoValido } from '../validator/rango-valido.validator';

export class CrearConfiguracionDto {
  //Rango que tiene el sensor DS18B20
  @IsNumber()
  @Min(-55)
  @Max(125)
  setpoint!: number;

  @IsNumber()
  @RangoValido()
  tolerancia!: number;

}