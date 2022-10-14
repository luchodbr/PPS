import { Equipo } from './equipo';
import { Imagen } from './imagen';

export enum EResultado
{
    GANADOR = 'ganador',
    PERDEDOR = 'perdedor'
}

export class Partido
{
    id: string;
    equipoA: Equipo;
    equipoB: Equipo;
    fecha: string;
    imagen: string;

    public static CrearPartido(id:string, equipoA: Equipo, equipoB: Equipo, fecha: string, imagen: string)
    {
        let partido = new Partido();

        partido.id = id;
        partido.equipoA = equipoA;
        partido.equipoB = equipoB;
        partido.fecha = fecha;
        partido.imagen = imagen;

        return partido;
    }
}
