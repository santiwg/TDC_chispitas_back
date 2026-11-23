import { IsOptional, Matches } from 'class-validator';

const fechaHoraIso = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)?$/;
const mensajeFecha = '$property debe ser una fecha y hora ISO 8601';

export class FiltrarHistorialDto {
  @IsOptional()
  @Matches(fechaHoraIso, { message: mensajeFecha })
  fechaDesde?: string;

  @IsOptional()
  @Matches(fechaHoraIso, { message: mensajeFecha })
  fechaHasta?: string;
}
