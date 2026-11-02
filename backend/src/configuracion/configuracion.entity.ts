import { Column, Entity, PrimaryColumn} from 'typeorm';

@Entity('configuracion')
export class ConfiguracionEntity {
  @PrimaryColumn()
  id!: number; 

  @Column('float')
  setpoint!: number;

  @Column('float')
  tolerancia!: number;

}