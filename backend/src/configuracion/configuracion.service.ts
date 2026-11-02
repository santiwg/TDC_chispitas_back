import { Injectable, NotFoundException } from "@nestjs/common";
import { CrearConfiguracionDto } from "./dtos/crear-configuracion.dto";
import { ConfiguracionEntity } from "./configuracion.entity";

@Injectable()
export class ConfiguracionService {

    constructor(
        //@InjectRepository(ConfiguracionEntity)
        private readonly repository //:Repository<ConfiguracionEntity>,
    ) {}
    
    async crear(dto: CrearConfiguracionDto) {
        const nueva = this.repository.create(dto);
        const guardada = await this.repository.save(nueva);
        return guardada;
    }

    async obtenerActual() {
        const actual = await this.repository.findOne({where: {}, order: { id: 'DESC' }});
        if (!actual) {
        throw new NotFoundException('Todavía no hay una configuración cargada');
        }
        return actual;
    }

}
