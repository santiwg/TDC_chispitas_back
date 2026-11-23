import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DateTime } from 'luxon';
import { HistorialService } from './historial.service';
import { CrearHistorialDto } from './dtos/crear-historial.dto';
import { FiltrarHistorialDto } from './dtos/filtrar-historial.dto';
import { HistorialEntity } from './historial.entity';

const zonaHorariaArgentina = 'America/Argentina/Buenos_Aires';

@Controller('historial')
export class HistorialController {

    constructor(
        private readonly historialService: HistorialService
    ) {}

    @Post()
    async crearHistorial(@Body() historial: CrearHistorialDto): Promise<HistorialEntity> {
        return await this.historialService.crearHistorial(historial);
    }

    @Get()
    async obtenerHistorial(@Query() { fechaDesde, fechaHasta }: FiltrarHistorialDto) {
        return await this.historialService.obtenerHistorial(
            this.interpretarFecha(fechaDesde, 'fechaDesde'),
            this.interpretarFecha(fechaHasta, 'fechaHasta'),
        );
    }

    @Get('current-state')
    async obtenerUltimoHistorial() {
        return await this.historialService.obtenerUltimoHistorial();
    }

    private interpretarFecha(fecha: string | undefined, parametro: string): Date | undefined {
        if (fecha === undefined) return undefined;

        const instante = DateTime.fromISO(fecha, { zone: zonaHorariaArgentina });
        if (!instante.isValid) {
            throw new BadRequestException(`${parametro} debe ser una fecha y hora válida`);
        }

        return instante.toJSDate();
    }
}
