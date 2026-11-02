import { IsNumber, Max, Min, IsOptional } from 'class-validator';
import { RangoValido } from '../validator/rango-valido.validator';

export class EditarConfiguracionDto {
  @IsOptional()
  @IsNumber()
  @Min(-55)
  @Max(125)
  setpoint!: number;

  @IsOptional()
  @IsNumber()
  @RangoValido()
  tolerancia!: number;

}