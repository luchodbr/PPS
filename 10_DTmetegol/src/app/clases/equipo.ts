export class Equipo
{
    id: string;
    usuario: string;
    goles: number;

    public static CrearEquipo(id: string, usuario: string, goles: number)
    {
        let equipo = new Equipo();

        equipo.id = id;
        equipo.usuario = usuario;
        equipo.goles = goles;

        return equipo;
    }

}

export enum TipoEquipo
{
    A = 'equipoA',
    B = 'equipoB'
}