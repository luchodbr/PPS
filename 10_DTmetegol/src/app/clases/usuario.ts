

export class Usuario
{
    id: string;
    nombre: string;
    dni: string;
    email: string;
    pass: string;
    rol: string;
    ganados: number;
    perdidos: number;

    public Usuario()
    {
        this.rol = "Usuario";
    }

    public static CrearUsuario(id: string, nombre:string, dni:string, email: string,
                                rol:string, ganados: number, perdidos: number) : Usuario
    {
        let usuario = new Usuario();
        usuario.id = id;
        usuario.nombre = nombre;
        usuario.dni = dni;
        usuario.email = email;
        usuario.rol = rol;
        usuario.ganados = ganados;
        usuario.perdidos = perdidos;

        return usuario;
    }   
}