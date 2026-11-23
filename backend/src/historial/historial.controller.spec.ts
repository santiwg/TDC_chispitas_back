import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { HistorialController } from './historial.controller';
import { HistorialService } from './historial.service';

jest.mock('./historial.service', () => ({ HistorialService: jest.fn() }));

describe('HistorialController', () => {
  let app: INestApplication;
  const obtenerHistorial = jest.fn().mockResolvedValue({ historial: [] });
  const desde = '2026-11-22T21:43:00.000Z';
  const hasta = '2026-11-23T18:46:00.000Z';

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [HistorialController],
      providers: [
        { provide: HistorialService, useValue: { obtenerHistorial } },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    obtenerHistorial.mockClear();
  });

  it.each([
    { caso: 'ambos límites en UTC', query: { fechaDesde: desde, fechaHasta: hasta }, desde, hasta },
    {
      caso: 'ambos límites en hora argentina sin zona explícita',
      query: { fechaDesde: '2026-11-22T18:43', fechaHasta: '2026-11-23T15:46' },
      desde,
      hasta,
    },
    {
      caso: 'un límite con offset explícito',
      query: { fechaHasta: '2026-11-23T19:46:00+01:00' },
      hasta,
    },
    {
      caso: 'un límite argentino que cae al día siguiente en UTC',
      query: { fechaHasta: '2026-11-23T23:46' },
      hasta: '2026-11-24T02:46:00.000Z',
    },
    { caso: 'solo desde', query: { fechaDesde: desde }, desde },
    { caso: 'solo hasta', query: { fechaHasta: hasta }, hasta },
    { caso: 'sin límites', query: {} },
  ])('GET /historial con $caso', async ({ query, desde, hasta }) => {
    await request(app.getHttpServer()).get('/historial').query(query).expect(200);
    expect(obtenerHistorial).toHaveBeenCalledWith(
      desde ? new Date(desde) : undefined,
      hasta ? new Date(hasta) : undefined,
    );
  });

  it.each([
    { fechaDesde: '2026-02-30T13:00:00Z' },
    { fechaHasta: '2026-11-23T15:99' },
    { fechaHasta: '2026-11-23' },
  ])('GET /historial rechaza fechas inválidas (%o)', async (query) => {
    await request(app.getHttpServer()).get('/historial').query(query).expect(400);
    expect(obtenerHistorial).not.toHaveBeenCalled();
  });
});
