// src/config/config.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import { CrearConfiguracionDto } from './dtos/crear-configuracion.dto';

@Controller('configuracion')
export class ConfigController {
  constructor(private readonly configuracionService: ConfiguracionService) {}

  @Post()
  crear(@Body() dto: CrearConfiguracionDto) {
    return this.configuracionService.crear(dto);
  }

  @Get()
  obtenerActual() {
    return this.configuracionService.obtenerActual();
  }
}